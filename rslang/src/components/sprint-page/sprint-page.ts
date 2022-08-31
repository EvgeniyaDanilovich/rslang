import { getChunkWords } from '../../api/words';
import { Word } from '../../models/types';
import { getRandomNum, keyboardControlLevel, renderPageContent } from '../../utils/common';
import { contentDifficult } from '../../utils/constants';
import './sprint-page.scss';

let group = 0;

export function initSprintPage(): void {
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
    document.addEventListener('keydown', keyboardControlLevel);
}

let timeMinute = 60;

function setTimer() {
    const timerElement = document.querySelector('.timer') as HTMLElement;

    const timer = setInterval(function () {
        if (timeMinute <= 0) {
            clearInterval(timer);
            alert('Время закончилось');
        } else {
            const strTimer = `${Math.trunc(timeMinute)}`;
            timerElement.innerHTML = strTimer;
        }
        --timeMinute;
    }, 1000);
}

function selectLevel(EO: Event): void {
    group = Number((EO.target as HTMLElement).dataset.id);
    renderSprintPage();
    setTimer();
}

const somePages: number[] = [];

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

const dataWords1: Word[] = await getChunkWords(group, somePages[0]);
const dataWords2: Word[] = await getChunkWords(group, somePages[1]);
const dataWords3: Word[] = await getChunkWords(group, somePages[2]);
const dataWords4: Word[] = await getChunkWords(group, somePages[3]);
const dataWords5: Word[] = await getChunkWords(group, somePages[4]);

const allWords: Word[] = dataWords1.concat(dataWords2, dataWords3, dataWords4, dataWords5);

let score = 0;
let scoreAdd = 10;

let isCorrectTranslate = true;
let currentTranslate = isCorrectTranslate;
setInterval((): void => {
    isCorrectTranslate ? (isCorrectTranslate = false) : (isCorrectTranslate = true);
}, 3000);

const cardWords = (englishWord: string, russianWord: string): string => `
    <div class="english-word">${englishWord}</div>
    <div class="russian-word">${russianWord}</div>
`;

function renderCardWords(word: Word, wordFalse: Word): string {
    currentTranslate = isCorrectTranslate;
    if (isCorrectTranslate) {
        return cardWords(word.word, word.wordTranslate);
    } else {
        return cardWords(word.word, wordFalse.wordTranslate);
    }
}

const sprintCard = (): string => `
        <div class="sprint-card">
    <div class="score">${score}</div>
    <div class="add-score">+ <span>${scoreAdd}</span> points</div>
    <div class="stage">
        <div class="stage__point point-1" data-point="1"></div>
        <div class="stage__point point-2" data-point="2"></div>
        <div class="stage__point point-3" data-point="3"></div>
    </div>
    <div class="words-wrapper">
       ${renderCardWords(allWords[getRandomNum(0, 99)], allWords[getRandomNum(0, 99)])}
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

function listenEvents(): void {
    function changeWord(): void {
        const w = renderCardWords(allWords[getRandomNum(0, 99)], allWords[getRandomNum(0, 99)]);
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
        } else {
            resetStage();
            resetScoreAdd();
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
