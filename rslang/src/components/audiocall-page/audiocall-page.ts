import { getRandomNum, renderPageContent } from '../../utils/common';
import { path, contentDifficult, svgImage } from '../../utils/constants';
import { Word, audiocallWord } from '../../models/types';
import './audiocall-page.scss';
import { getChunkWords } from '../../api/words';
import { WordsDifficultyLevel } from '../../enums/levels';

let levelDifficult: number;
let trueWord: Word;
let countCard = 0;
const arrWords: audiocallWord[] = [];
const arrTrueWord: Word[] = [];
const arrFalseWord: Word[] = [];

//---------- сreate and show a window for choosing the level of difficulty ----------//

export function renderAudiocallPageFromMenu(): void {
    countCard = 0;
    arrWords.length = 0;
    arrTrueWord.length = 0;
    arrFalseWord.length = 0;
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
}

//---------- render page with parameters page and group in textbook ----------//

export async function renderAudiocallPageFromTextbook(): Promise<void> {
    countCard = 0;
    arrWords.length = 0;
    arrTrueWord.length = 0;
    arrFalseWord.length = 0;
    const group = Number(localStorage.getItem('group'));
    const page = Number(localStorage.getItem('page'));
    await generateArrCards(group, page);
    playCard();
}

//---------- make a choice of difficulty level and run the first card ----------//

async function selectLevel(EO: Event): Promise<void> {
    levelDifficult = Number((EO.target as HTMLElement).dataset.id);
    await generateArrCards();
    playCard();
}

//-------------------- generate array cards --------------------//

async function generateArrCards(group?: number, page?: number): Promise<void> {
    const firsWordPosition = 0;
    const lastWordPosition = 19;
    const wordsCashTrue: Word[] = [];
    let words: Word[];
    if (group !== undefined && page !== undefined) {
        words = await getChunkWords(group, page);
    } else {
        words = await getChunkWords(levelDifficult, getRandomNum(firsWordPosition, lastWordPosition));
    }
    while (wordsCashTrue.length < 10) {
        trueWord = words[getRandomNum(firsWordPosition, lastWordPosition)];
        if (!wordsCashTrue.includes(trueWord)) {
            wordsCashTrue.push(trueWord);
            let wordsCashVariants: Word[] = [];

            while (wordsCashVariants.length < 4) {
                const variant = words[getRandomNum(firsWordPosition, lastWordPosition)];
                if (!wordsCashVariants.includes(variant) && variant !== trueWord) {
                    wordsCashVariants.push(variant);
                }
            }
            wordsCashVariants.push(trueWord);
            wordsCashVariants = wordsCashVariants.sort(() => Math.random() - 0.5);

            const objWord: audiocallWord = {
                word: trueWord,
                variants: wordsCashVariants,
            };
            arrWords.push(objWord);
        }
    }
}

// --------------------- Launch card in game -------------------- //

async function playCard(): Promise<void> {
    if (countCard > 0 && (document.querySelector('.button-next') as HTMLElement).innerText === "I don't know!") {
        arrFalseWord.push(arrWords[countCard - 1].word);
    }
    countCard++;
    if (countCard > 10) {
        showResult();
        return;
    }

    const contentGame = `
    <div class="game-content">
        <div class="audio-card">
            <div class="description-block">
                <div class="current-image-block"></div>
                <div class="card-description">
                    <div class="word-audio" data-word="${arrWords[countCard - 1].word.wordTranslate}">${svgImage}</div>
                </div>
                </div>
            <div class="block-words">
                <div class="word-answer">${arrWords[countCard - 1].variants[0].wordTranslate}</div>
                <div class="word-answer">${arrWords[countCard - 1].variants[1].wordTranslate}</div>
                <div class="word-answer">${arrWords[countCard - 1].variants[2].wordTranslate}</div>
                <div class="word-answer">${arrWords[countCard - 1].variants[3].wordTranslate}</div>
                <div class="word-answer">${arrWords[countCard - 1].variants[4].wordTranslate}</div>
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

//---------- compare the selected word with a known correct word, prepare the data for the result ----------//

function comparsionWords(EO: Event): void {
    if ((EO.target as HTMLElement).innerText !== (document.querySelector('.word-audio') as HTMLElement).dataset.word) {
        (EO.target as HTMLElement).style.cssText = 'background-color: red; color: white';
        arrFalseWord.push(arrWords[countCard - 1].word);
    } else {
        (EO.target as HTMLElement).style.cssText = 'background-color: green; color: white';
        arrTrueWord.push(arrWords[countCard - 1].word);
    }
    (document.querySelector('.button-next') as HTMLElement).innerText = 'NEXT';
    document.querySelectorAll('.word-answer').forEach((el) => el.removeEventListener('click', comparsionWords));
    showDescription();
}

//-------------------- show word descriptoion --------------------//

function showDescription(): void {
    const image = document.createElement('img');
    image.setAttribute('src', `${path}/${arrWords[countCard - 1].word.image}`);
    image.setAttribute('class', 'current-image');
    const text = document.createElement('p');
    text.innerText = `${arrWords[countCard - 1].word.word}`;
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
    const arrSvgImage = document.querySelectorAll('#svg');
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
        audioElement.src = `${path}/${arrWords[countCard - 1].word.audio}`;
    }
    audioElement.play();
}
