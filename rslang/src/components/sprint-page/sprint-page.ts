import { getChunkWords } from '../../api/words';
import { Word } from '../../models/types';
import { getRandomNum, renderPageContent } from '../../utils/common';
import { contentDifficult } from '../../utils/constants';
import './sprint-page.scss';

let group = 0;
// const currentChunkWords: Word[] = [];

export function initSprintPage() {
    // renderPageContent(contentDifficult);
    // document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
    renderSprintPage();
}

function selectLevel(EO: Event): void {
    group = Number((EO.target as HTMLElement).dataset.id);
    renderSprintPage();
}

const somePages: number[] = [];

async function getRandomPages() {
    for (let i = 0; i < 5; i++) {
        let randomPage = getRandomNum(0, 29);

        if (somePages.includes(randomPage)) {
            randomPage = getRandomNum(0, 29);
        }
        somePages.push(randomPage);
    }
    // for (const page of somePages) {
    //     const dataWords: Word[] = await getChunkWords(group, page);
    //     for (const word of dataWords) {
    //         currentChunkWords.push(word);
    //     }
    // }
    // return currentChunkWords;
}
// getWords().then((arr: Word[]) => {
//     const cardNum = 0;
//     renderSprintCard(arr[cardNum]);
// });
getRandomPages();

const dataWords1: Word[] = await getChunkWords(group, somePages[0]);
const dataWords2: Word[] = await getChunkWords(group, somePages[1]);
const dataWords3: Word[] = await getChunkWords(group, somePages[2]);
const dataWords4: Word[] = await getChunkWords(group, somePages[3]);
const dataWords5: Word[] = await getChunkWords(group, somePages[4]);

const allWords: Word[] = dataWords1.concat(dataWords2, dataWords3, dataWords4, dataWords5);

const score = 0;
const scoreAdd = 10;

const renderWords = (englishWord: string, russianWord: string) => `
    <div class="english-word">${englishWord}</div>
    <div class="russian-word">${russianWord}</div>
`;

const sprintCard = (englishWord: string, russianWord: string) => `
        <div class="sprint-card">
    <div class="score">${score}</div>
    <div class="add-score">+ <span>${scoreAdd}</span> points</div>
    <div class="stage">
        <div class="stage__point active"></div>
        <div class="stage__point"></div>
        <div class="stage__point"></div>
    </div>
       ${renderWords(englishWord, russianWord)}
    <div class="answer">
        <div class="answer__right btn ">Right</div>
        <div class="answer__wrong btn">Wrong</div>
    </div>
    </div> `;

let isCorrectTranslate = true;
setInterval(() => {
    isCorrectTranslate ? (isCorrectTranslate = false) : (isCorrectTranslate = true);
}, 3000);

function renderSprintCard(word: Word, wordFalse: Word) {
    if (isCorrectTranslate) {
        return sprintCard(word.word, word.wordTranslate);
    } else {
        return sprintCard(word.word, wordFalse.wordTranslate);
    }
}

const randomWordsNum = getRandomNum(0, 99);

function renderSprintPage() {
    const content = `
            <div class="sprint-wrapper">
               <div class="timer"></div>
               <div class="card-wrapper">
                  ${renderSprintCard(allWords[randomWordsNum], allWords[randomWordsNum])}
               </div>
            </div>`;

    renderPageContent(content);
}

const rightBtn = document.querySelector('.answer__right');
