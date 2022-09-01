import { getChunkWords, getWordWithAssetsById } from '../../api/words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { Word } from '../../models/types';
import { getLocalStorage, getRandomNum, keyboardControlLevel, renderPageContent } from '../../utils/common';
import { contentDifficult } from '../../utils/constants';
import { renderGameResult } from '../result-game-component/result-game-component';
import './sprint-page.scss';

let group = 0;
// const isFromBookGame = false;

const trueResultGame: Word[] = [];
const falseResultGame: Word[] = [];

const somePages: number[] = [];
// let allWordsForCurrentGame: Word[] = [];

let isCorrectTranslate = true;
let currentTranslate = isCorrectTranslate;

setInterval((): void => {
    isCorrectTranslate ? (isCorrectTranslate = false) : (isCorrectTranslate = true);
}, 3000);

export function initSprintPage(): void {
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
    document.addEventListener('keydown', keyboardControlLevel);
}

function selectLevel(EO: Event): void {
    group = Number((EO.target as HTMLElement).dataset.id);
    console.log(Number((EO.target as HTMLElement).dataset.id));
    renderSprintPage();
    setTimer();
    console.log(allWordsForCurrentGame);
}

// export function initSprintPageFromBook() {
//     isFromBookGame = true;
//     // getAllWords();
//     renderSprintPage();
//     setTimer();
// }

function setTimer() {
    const timerElement = document.querySelector('.timer') as HTMLElement;
    let timeMinute = 20;

    const timer = setInterval(function () {
        if (timeMinute < 0) {
            clearInterval(timer);
            renderGameResult(trueResultGame, falseResultGame);
        } else {
            const strTimer = `${Math.trunc(timeMinute)}`;
            timerElement.innerHTML = strTimer;
        }
        timeMinute--;
    }, 1000);
}

function getRandomPages(): void {
    for (let i = 0; i < 5; i++) {
        let randomPage = getRandomNum(0, 29);

        if (somePages.includes(randomPage)) {
            randomPage = getRandomNum(0, 29);
        }
        somePages.push(randomPage);
    }
}

getRandomPages();

// async function s() {
const dataWords1: Word[] = await getChunkWords(group, somePages[0]);
const dataWords2: Word[] = await getChunkWords(group, somePages[1]);
const dataWords3: Word[] = await getChunkWords(group, somePages[2]);
const dataWords4: Word[] = await getChunkWords(group, somePages[3]);
const dataWords5: Word[] = await getChunkWords(group, somePages[4]);
// }

const allWordsForCurrentGame: Word[] = dataWords1.concat(dataWords2, dataWords3, dataWords4, dataWords5);

// console.log(allWordsForCurrentGame);

// async function getAllWords() {
//     const dataWords1: Word[] = await getChunkWords(group, somePages[0]);
//     const dataWords2: Word[] = await getChunkWords(group, somePages[1]);
//     const dataWords3: Word[] = await getChunkWords(group, somePages[2]);
//     const dataWords4: Word[] = await getChunkWords(group, somePages[3]);
//     const dataWords5: Word[] = await getChunkWords(group, somePages[4]);

//     allWordsForCurrentGame = dataWords1.concat(dataWords2, dataWords3, dataWords4, dataWords5);

//     // if (!isFromBookGame) {
//     //     allWordsForCurrentGame = dataWords1.concat(dataWords2, dataWords3, dataWords4, dataWords5);
//     //     console.log('4');
//     // } else {
//     //     const group = +getLocalStorage(LocalStorageKeys.GROUP);
//     //     const page = +getLocalStorage(LocalStorageKeys.PAGE);
//     //     const response = await getChunkWords(group, page);
//     //     allWordsForCurrentGame = response;
//     //     console.log(response);
//     // }
// }

const cardWords = (id: string, englishWord: string, russianWord: string): string => `
    <div class="english-word" id="${id}">${englishWord}</div>
    <div class="russian-word">${russianWord}</div>
`;

function renderCardWords(word: Word, wordFalse: Word): string {
    currentTranslate = isCorrectTranslate;
    if (isCorrectTranslate) {
        return cardWords(word.id, word.word, word.wordTranslate);
    } else {
        return cardWords(word.id, word.word, wordFalse.wordTranslate);
    }
}

const sprintCard = (): string => `
        <div class="sprint-card">
    <div class="score">0</div>
    <div class="add-score">+ <span>10</span> points</div>
    <div class="stage">
        <div class="stage__point point-1" data-point="1"></div>
        <div class="stage__point point-2" data-point="2"></div>
        <div class="stage__point point-3" data-point="3"></div>
    </div>
    <div class="words-wrapper">
       ${renderCardWords(allWordsForCurrentGame[getRandomNum(0, 99)], allWordsForCurrentGame[getRandomNum(0, 99)])}
    </div>
    <div class="answer">
        <div class="answer__right btn ">Right</div>
        <div class="answer__wrong btn">Wrong</div>
    </div>
    </div> `;

function renderSprintPage(): void {
    const content = `
            <div class="sprint-wrapper">
               <div class="timer">60</div>
               <div class="card-wrapper">
                  ${sprintCard()}
               </div>
            </div>`;

    renderPageContent(content);
    listenEvents();
}

async function sortResult(resultStatus: boolean) {
    const word = document.querySelector('.english-word') as HTMLElement;
    const wordId = word.getAttribute('id');
    const wordData: Word = await getWordWithAssetsById(wordId);
    resultStatus ? trueResultGame.push(wordData) : falseResultGame.push(wordData);
}

function listenEvents(): void {
    let score = 0;
    let scoreAdd = 10;

    function changeWord(): void {
        const w = renderCardWords(
            allWordsForCurrentGame[getRandomNum(0, 99)],
            allWordsForCurrentGame[getRandomNum(0, 99)]
        );
        const wordsWrapper = document.querySelector('.words-wrapper') as HTMLElement;
        wordsWrapper.innerHTML = w;
    }

    function changeScore(): void {
        score += scoreAdd;
        const scoreText = document.querySelector('.score') as HTMLElement;
        scoreText.textContent = `${score}`;
    }

    let quantityRightAnswer = 0;

    function resetStage(): void {
        const pointsList = document.querySelectorAll('.stage__point') as NodeListOf<Element>;

        pointsList.forEach((point) => {
            point.classList.remove('active');
        });
        quantityRightAnswer = 0;
    }

    function updateStage(): void {
        quantityRightAnswer++;
        const point = document.querySelector(`.point-${quantityRightAnswer}`) as HTMLElement;
        point.classList.add('active');

        if (quantityRightAnswer % 3 === 0) {
            setTimeout(() => {
                scoreAdd += 10;
                const scoreAddText = document.querySelector('.add-score span') as HTMLElement;
                scoreAddText.textContent = `${scoreAdd}`;
                resetStage();
            }, 500);
        }
    }

    function resetScoreAdd(): void {
        scoreAdd = 10;
        const scoreAddText = document.querySelector('.add-score span') as HTMLElement;
        scoreAddText.textContent = `${scoreAdd}`;
    }

    function oneStepGame(result: boolean) {
        if (currentTranslate === result) {
            changeScore();
            updateStage();
            sortResult(true);
        } else {
            resetStage();
            resetScoreAdd();
            sortResult(false);
        }

        changeWord();
    }

    const rightBtn = document.querySelector('.answer__right') as HTMLElement;
    rightBtn.addEventListener('click', (): void => oneStepGame(true));

    document.addEventListener('keydown', (event: KeyboardEvent): void => {
        if (event.code === 'ArrowLeft') {
            oneStepGame(true);
        }
    });

    const wrongBtn = document.querySelector('.answer__wrong') as HTMLElement;
    wrongBtn.addEventListener('click', (): void => oneStepGame(false));

    document.addEventListener('keydown', (event: KeyboardEvent): void => {
        if (event.code === 'ArrowRight') {
            oneStepGame(false);
        }
    });
}
