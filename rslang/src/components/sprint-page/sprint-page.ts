import { getChunkWords, getWordWithAssetsById } from '../../api/words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { Word } from '../../models/types';
import {
    getLocalStorage,
    getNewToken,
    getRandomNum,
    keyboardControlLevel,
    renderPageContent,
} from '../../utils/common';
import { contentDifficult } from '../../utils/constants';
import { renderGameResult } from '../result-game-component/result-game-component';
import './sprint-page.scss';
import { getStatistic, upsertStatistic } from '../../api/user-statistic';

let group = 0;
let isGameFromBook = false;

let trueResultGame: Word[] = [];
let falseResultGame: Word[] = [];

let somePages: number[] = [];
let allWordsForCurrentGame: Word[] = [];

let isCorrectTranslate = true;
let currentTranslate = isCorrectTranslate;

let longestSeries = 0;
let previousLongestSeries = 0;

setInterval((): void => {
    isCorrectTranslate ? (isCorrectTranslate = false) : (isCorrectTranslate = true);
}, 3000);

export function initSprintPage(): void {
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
    document.addEventListener('keydown', keyboardControlLevel);
}

async function selectLevel(EO: Event): Promise<void> {
    trueResultGame = [];
    falseResultGame = [];
    somePages = [];
    allWordsForCurrentGame = [];
    isGameFromBook = false;

    group = Number((EO.target as HTMLElement).dataset.id);
    getRandomPages();
    await getWords();
    renderSprintPage();
    await setTimer();
}

export async function initSprintPageFromBook() {
    trueResultGame = [];
    falseResultGame = [];
    somePages = [];
    allWordsForCurrentGame = [];
    isGameFromBook = true;

    await getWordsFromBook();
    renderSprintPage();
    await setTimer();
}

export async function updateStatistic() {
    if (localStorage.getItem('id')) {
        const statistic = await getStatistic(`${localStorage.getItem('id')}`);
        if (statistic == 404) {
            const optional = {
                learnedWords: 0,
                optional: {
                    longestSeriesSprint: `${previousLongestSeries}`,
                    SprintAllWords: `${trueResultGame.length + falseResultGame.length}`,
                    SprintCorrectAnswers: `${trueResultGame.length}`,
                    longestSeriesAudioCall: `${0}`,
                    AudioCallAllWords: `${0}`,
                    AudioCallCorrectAnswers: `${0}`,
                },
            };
            await upsertStatistic(`${localStorage.getItem('id')}`, optional);
        } else if (statistic == 401) {
            await getNewToken();
        } else {
            let longestSeriesSprint = statistic.optional.longestSeriesSprint;
            if (longestSeriesSprint < previousLongestSeries) longestSeriesSprint = previousLongestSeries;
            const SprintAllWords = statistic.optional.SprintAllWords;
            const SprintCorrectAnswers = statistic.optional.SprintCorrectAnswers;
            const optional = {
                learnedWords: 0,
                optional: {
                    longestSeriesSprint: `${longestSeriesSprint}`,
                    SprintAllWords: `${Number(SprintAllWords) + trueResultGame.length + falseResultGame.length}`,
                    SprintCorrectAnswers: `${Number(SprintCorrectAnswers) + trueResultGame.length}`,
                    longestSeriesAudioCall: `${statistic.optional.longestSeriesAudioCall}`,
                    AudioCallAllWords: `${statistic.optional.AudioCallAllWords}`,
                    AudioCallCorrectAnswers: `${statistic.optional.AudioCallCorrectAnswers}`,
                },
            };
            await upsertStatistic(`${localStorage.getItem('id')}`, optional);
            longestSeries = 0;
        }
    }
}

async function setTimer() {
    const timerElement = document.querySelector('.timer') as HTMLElement;
    let timeMinute = 60;
    const timer = setInterval(async function () {
        if (document.location.hash === '#/sprint-book' || document.location.hash === '#/sprint') {
            if (timeMinute < 0) {
                clearInterval(timer);
                renderGameResult(trueResultGame, falseResultGame);
            } else {
                const strTimer = `${Math.trunc(timeMinute)}`;
                timerElement.innerHTML = strTimer;
            }
            timeMinute--;
        } else {
            clearInterval(timer);
        }
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

async function getWords() {
    for (const page of somePages) {
        const dataWords: Word[] = await getChunkWords(group, page);
        allWordsForCurrentGame.push(...dataWords);
    }
}

let page: number;

async function getWordsFromBook() {
    allWordsForCurrentGame = [];
    const group = +getLocalStorage(LocalStorageKeys.GROUP);
    page = +getLocalStorage(LocalStorageKeys.PAGE);
    const dataWords: Word[] = await getChunkWords(group, page);
    allWordsForCurrentGame.push(...dataWords);

    if (page > 0) {
        page--;
        const dataWords: Word[] = await getChunkWords(group, page);
        allWordsForCurrentGame.push(...dataWords);
    }
}

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

let currentIndex = -1;

function getRandomTrueWord(): number {
    const indexesWord20: number[] = [7, 6, 8, 2, 15, 19, 1, 3, 17, 13, 11, 4, 0, 18, 16, 9, 5, 10, 12, 14];
    const indexesWord40 = [
        7,
        6,
        8,
        2,
        15,
        19,
        1,
        3,
        17,
        13,
        11,
        4,
        0,
        18,
        16,
        9,
        5,
        10,
        12,
        14,
        22,
        20,
        28,
        31,
        26,
        32,
        34,
        21,
        39,
        24,
        36,
        27,
        35,
        30,
        38,
        33,
        25,
        23,
        37,
        29,
    ];

    if (isGameFromBook) {
        currentIndex++;
        if (page > 0) {
            if (currentIndex === 40) renderGameResult(trueResultGame, falseResultGame);
            return indexesWord40[currentIndex];
        } else {
            if (currentIndex === 20) renderGameResult(trueResultGame, falseResultGame);
            return indexesWord20[currentIndex];
        }
    } else {
        const maxQuantityWords = 99;
        return getRandomNum(0, maxQuantityWords);
    }
}

function getRandomFalseWord() {
    let maxQuantityWords: number;
    if (isGameFromBook) {
        if (page > 0) {
            maxQuantityWords = 39;
            return getRandomNum(0, maxQuantityWords);
        } else {
            maxQuantityWords = 19;
            return getRandomNum(0, maxQuantityWords);
        }
    } else {
        maxQuantityWords = 99;
        return getRandomNum(0, maxQuantityWords);
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
       ${renderCardWords(allWordsForCurrentGame[getRandomTrueWord()], allWordsForCurrentGame[getRandomFalseWord()])}
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
    if (resultStatus) {
        trueResultGame.push(wordData);
        longestSeries = longestSeries + 1;
        if (longestSeries > previousLongestSeries) previousLongestSeries = longestSeries;
    } else {
        falseResultGame.push(wordData);
        longestSeries = 0;
    }
}

function listenEvents(): void {
    let score = 0;
    let scoreAdd = 10;

    function changeWord(): void {
        const w = renderCardWords(
            allWordsForCurrentGame[getRandomTrueWord()],
            allWordsForCurrentGame[getRandomFalseWord()]
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
