import { getRandomNum, renderPageContent } from '../../utils/common';
import { getAllAggregatedWords } from '../../api/users-aggregated-words';
import { path, contentDifficult, svgImage } from '../../utils/constants';
import { Word } from '../../models/types';
import './audiocall-page.scss';
import { getChunkWords } from '../../api/words';

let levelDifficult: number;
let currentWordActive: Word;
let countCard = 0;
let arrWords: Word[] = [];
const arrTrueWord: Word[] = [];
const arrFalseWord: Word[] = [];

//---------- сreate and show a window for choosing the level of difficulty ----------//

export function renderAudiocallPage() {
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
}

//---------- render page with parameters page and group in textbook ----------//

export function renderAudiocallPageWithParams() {
    const group: number | null = Number(localStorage.getItem('group'));
    const page: number | null = Number(localStorage.getItem('page'));
    playCardFromTextbook(0, 0);
}

//---------- make a choice of difficulty level and run the first card ----------//

function selectLevel(EO: Event): void {
    levelDifficult = Number((EO.target as HTMLElement).dataset.id);
    playCard();
}

//-------------------- create card --------------------//

async function playCard(): Promise<void> {
    if (countCard > 0 && (document.querySelector('.button-next') as HTMLElement).innerText === "I don't know!") {
        arrFalseWord.push(currentWordActive);
    }
    countCard++;
    if (countCard > 10) {
        showResult();
        return;
    }
    const words = getAllAggregatedWords('62fec0ef3a51c600162caa6c', levelDifficult, getRandomNum(0, 119), 5);
    const arrResponseWords = await words;
    arrWords = arrResponseWords[0].paginatedResults;
    const currentWord: Word = arrWords[getRandomNum(0, 4)];
    currentWordActive = currentWord;
    const contentGame = `
    <div class="game-content">
        <div class="audio-card">
            <div class="description-block">
                <div class="current-image-block"></div>
                <div class="card-description">
                    <div class="word-audio" data-word="${currentWord['wordTranslate']}">${svgImage}</div>
                </div>
                </div>
            <div class="block-words">
                <div class="word-answer">${arrWords[0].wordTranslate}</div>
                <div class="word-answer">${arrWords[1].wordTranslate}</div>
                <div class="word-answer">${arrWords[2].wordTranslate}</div>
                <div class="word-answer">${arrWords[3].wordTranslate}</div>
                <div class="word-answer">${arrWords[4].wordTranslate}</div>
            </div>
            <button class="button-next">I don't know!</button>
        </div>
    </div>
    `;
    renderPageContent(contentGame);
    playAudio();
    document.querySelectorAll('.word-answer').forEach((el) => el.addEventListener('click', comparsionWords));
    document.querySelector('.button-next')?.addEventListener('click', playCard);
    document.querySelector('.word-audio')?.addEventListener('click', () => playAudio());
}

//-------------------- create card --------------------//

async function playCardFromTextbook(group: number, page: number): Promise<void> {
    if (countCard > 0 && (document.querySelector('.button-next') as HTMLElement).innerText === "I don't know!") {
        arrFalseWord.push(currentWordActive);
    }
    const wordsPartOne = await getChunkWords(group, page);
    const wordsPartTwo = await getChunkWords(group, page - 1);
    const wordsPartThree = await getChunkWords(group, page - 2);
    const words = wordsPartOne.concat(wordsPartTwo).concat(wordsPartThree.slice(0, 10));
    const length = words.length / 5;
    let n = 0;
    let m = 5;
    renderCard();

    function renderCard() {
        countCard++;
        if (countCard > length) {
            showResult();
            return;
        }
        const arrWords = words.slice(n, m);
        const currentWord: Word = arrWords[getRandomNum(0, 4)];
        currentWordActive = currentWord;
        const contentGame = `
            <div class="game-content">
                <div class="audio-card">
                    <div class="description-block">
                        <div class="current-image-block"></div>
                        <div class="card-description">
                            <div class="word-audio" data-word="${currentWord['wordTranslate']}">${svgImage}</div>
                        </div>
                        </div>
                    <div class="block-words">
                        <div class="word-answer">${arrWords[0].wordTranslate}</div>
                        <div class="word-answer">${arrWords[1].wordTranslate}</div>
                        <div class="word-answer">${arrWords[2].wordTranslate}</div>
                        <div class="word-answer">${arrWords[3].wordTranslate}</div>
                        <div class="word-answer">${arrWords[4].wordTranslate}</div>
                    </div>
                    <button class="button-next">I don't know!</button>
                </div>
            </div>
            `;
        renderPageContent(contentGame);
        playAudio();
        document.querySelectorAll('.word-answer').forEach((el) => el.addEventListener('click', comparsionWords));
        document.querySelector('.button-next')?.addEventListener('click', renderCard);
        document.querySelector('.word-audio')?.addEventListener('click', () => playAudio());
        n = n + 5;
        m = m + 5;
    }
}

//---------- compare the selected word with a known correct word, prepare the data for the result ----------//

function comparsionWords(EO: Event): void {
    if ((EO.target as HTMLElement).innerText !== (document.querySelector('.word-audio') as HTMLElement).dataset.word) {
        (EO.target as HTMLElement).style.cssText = 'background-color: red; color: white';
        arrFalseWord.push(currentWordActive);
    } else {
        (EO.target as HTMLElement).style.cssText = 'background-color: green; color: white';
        arrTrueWord.push(currentWordActive);
    }
    (document.querySelector('.button-next') as HTMLElement).innerText = 'NEXT';
    document.querySelectorAll('.word-answer').forEach((el) => el.removeEventListener('click', comparsionWords));
    showDescription();
}

//-------------------- show word descriptoion --------------------//

function showDescription() {
    const image = document.createElement('img');
    image.setAttribute('src', `${path}/${currentWordActive.image}`);
    image.setAttribute('class', 'current-image');
    const text = document.createElement('p');
    text.innerText = `${currentWordActive.word}`;
    text.setAttribute('class', 'current-text');
    const blockImage = document.querySelector('.current-image-block');
    const block = document.querySelector('.card-description');
    block?.appendChild(text);
    blockImage?.append(image);
    block?.classList.add('small');
}

//-------------------- create and display result window --------------------//

function showResult(): void {
    const resTrue = arrTrueWord.reduce((res, el) => {
        return (res += `<p class="result-true">${svgImage} ${el.word} - ${el.wordTranslate}</p>`);
    }, '');
    const resFalse = arrFalseWord.reduce((res, el) => {
        return (res += `<p class="result-false">${svgImage} ${el.word} - ${el.wordTranslate}</p>`);
    }, '');
    const contentResult = `
    <div class="game-content">
        <div class="audio-result">
            <p class="header">Wrong answers:</p>
            <div class="result-false-words">
                ${resFalse}
            </div>
            <p class="header">Сorrect answers:</p>
            <div class="result-true-words">
                ${resTrue}
            </div>
        </div>
    </div>
    `;
    renderPageContent(contentResult);
    const arrSvgImage = document.querySelectorAll('.svg-image');
    const sumArr = arrFalseWord.concat(arrTrueWord);

    for (let i = 0; i < sumArr.length; i++) {
        arrSvgImage[i].addEventListener('click', () => playAudio(sumArr[i].audio));
    }
}

//---------- play audio word ----------//

function playAudio(audioValue?: string): void {
    const audioElement = new Audio();
    if (audioValue) {
        audioElement.src = `${path}/${audioValue}`;
    } else {
        audioElement.src = `${path}/${currentWordActive.audio}`;
    }
    audioElement.play();
}
