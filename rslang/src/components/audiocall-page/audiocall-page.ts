import { getNewToken, getRandomNum, renderPageContent } from '../../utils/common';
import { path, contentDifficult, svgImage, svgRestart } from '../../utils/constants';
import { Word, audiocallWord } from '../../models/types';
import './audiocall-page.scss';
import { getChunkWords } from '../../api/words';
import { WordsDifficultyLevel } from '../../enums/levels';
import { getStatistic, upsertStatistic } from '../../api/user-statistic';

let levelDifficult: number;
let trueWord: Word;
let countCard = 0;
let modeGame: boolean;
const arrWords: audiocallWord[] = [];
const arrTrueWord: Word[] = [];
const arrFalseWord: Word[] = [];

//---------- сreate and show a window for choosing the level of difficulty ----------//

export function renderAudiocallPageFromMenu(): void {
    modeGame = true;
    countCard = 0;
    arrWords.length = 0;
    arrTrueWord.length = 0;
    arrFalseWord.length = 0;
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));
    document.addEventListener('keydown', keyboardControlLevel);
}

//---------- use keyboard for control game ----------//

function keyboardControlLevel(EO: KeyboardEvent): void {
    const containerLevel = document.querySelector('.container-level');
    if (EO.code === 'Digit1') {
        (containerLevel.children[1] as HTMLElement).click();
    }
    if (EO.code === 'Digit2') {
        (containerLevel.children[1] as HTMLElement).click();
    }
    if (EO.code === 'Digit3') {
        (containerLevel.children[2] as HTMLElement).click();
    }
    if (EO.code === 'Digit4') {
        (containerLevel.children[3] as HTMLElement).click();
    }
    if (EO.code === 'Digit5') {
        (containerLevel.children[4] as HTMLElement).click();
    }
}

//---------- use keyboard for control game ----------//

function keyboardControlCard(EO: KeyboardEvent): void {
    const block = document.querySelector('.block-words');
    if (EO.code === 'Space' || EO.code === 'Enter' || EO.code === 'ArrowRight') {
        playCard();
    }
    if (EO.code === 'Digit1') {
        (block.children[0] as HTMLElement).click();
    }
    if (EO.code === 'Digit2') {
        (block.children[1] as HTMLElement).click();
    }
    if (EO.code === 'Digit3') {
        (block.children[2] as HTMLElement).click();
    }
    if (EO.code === 'Digit4') {
        (block.children[3] as HTMLElement).click();
    }
    if (EO.code === 'Digit5') {
        (block.children[4] as HTMLElement).click();
    }
}

//---------- render page with parameters page and group in textbook ----------//

export async function renderAudiocallPageFromTextbook(): Promise<void> {
    modeGame = false;
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
    document.removeEventListener('keydown', keyboardControlLevel);
    document.addEventListener('keydown', keyboardControlCard);
    if (countCard > 0 && (document.querySelector('.button-next') as HTMLElement).innerText === "I don't know!") {
        arrFalseWord.push(arrWords[countCard - 1].word);
    }
    countCard++;
    if (countCard > 10) {
        await showResult();
        return;
    }
    const contentGame = `
    <div class="game-content">
        <div class="top-panel">
            <div class="button-empty"></div>
            <div class="progress-bar">
                <div class="progress-line"></div>
            </div>
            <div class="button-restart">${svgRestart}</div>
        </div>
        <div class="audio-card">
            <div class="description-block">
                <div class="current-image-block"></div>
                <div class="card-description">
                    <div class="word-audio" data-word="${arrWords[countCard - 1].word.wordTranslate}">${svgImage}</div>
                </div>
                </div>
            <div class="block-words">
                <div class="word-answer" data-word="${arrWords[countCard - 1].variants[0].wordTranslate}">1. ${
        arrWords[countCard - 1].variants[0].wordTranslate
    }</div>
                <div class="word-answer" data-word="${arrWords[countCard - 1].variants[1].wordTranslate}">2. ${
        arrWords[countCard - 1].variants[1].wordTranslate
    }</div>
                <div class="word-answer" data-word="${arrWords[countCard - 1].variants[2].wordTranslate}">3. ${
        arrWords[countCard - 1].variants[2].wordTranslate
    }</div>
                <div class="word-answer" data-word="${arrWords[countCard - 1].variants[3].wordTranslate}">4. ${
        arrWords[countCard - 1].variants[3].wordTranslate
    }</div>
                <div class="word-answer" data-word="${arrWords[countCard - 1].variants[4].wordTranslate}">5. ${
        arrWords[countCard - 1].variants[4].wordTranslate
    }</div>
            </div>
            <button class="button-next">I don't know!</button>
        </div>
        <div class="bottom-panel"></div>
    </div>
    `;
    renderPageContent(contentGame);

    playAudio();
    document.querySelectorAll('.word-answer').forEach((el) => el.addEventListener('click', comparsionWords));
    document.querySelector('.button-next')?.addEventListener('click', playCard);
    document.querySelector('.word-audio')?.addEventListener('click', () => playAudio());
    document.querySelector('.button-restart')?.addEventListener('click', () => {
        return modeGame === true ? renderAudiocallPageFromMenu() : renderAudiocallPageFromTextbook();
    });
    (document.querySelector('.progress-line') as HTMLElement).style.width = `${((countCard - 1) / 10) * 100}%`;
}

//---------- compare the selected word with a known correct word, prepare the data for the result ----------//
let longestSeries = 0;
let previousLongestSeries = 0;
function comparsionWords(EO: Event) {
    if (
        (EO.target as HTMLElement).dataset.word !== (document.querySelector('.word-audio') as HTMLElement).dataset.word
    ) {
        (EO.target as HTMLElement).style.cssText = 'background-color: red; color: white';
        arrFalseWord.push(arrWords[countCard - 1].word);
        longestSeries = 0;
    } else {
        (EO.target as HTMLElement).style.cssText = 'background-color: green; color: white';
        arrTrueWord.push(arrWords[countCard - 1].word);
        longestSeries = longestSeries + 1;
        if (longestSeries > previousLongestSeries) previousLongestSeries = longestSeries;
        console.log(longestSeries);
        console.log(previousLongestSeries);
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

async function showResult() {
    document.removeEventListener('keydown', keyboardControlCard);
    const resTrue = arrTrueWord.reduce((res, el) => {
        return (res += `<p class="result-true">${svgImage} ${el.word} - <span class="word-translate">${el.wordTranslate}</span></p>`);
    }, '');
    const resFalse = arrFalseWord.reduce((res, el) => {
        return (res += `<p class="result-false">${svgImage} ${el.word} - <span class="word-translate">${el.wordTranslate}</span></p>`);
    }, '');
    const contentResult = `
    <div class="game-content">
        <div class="top-panel">
            <div class="button-restart">${svgRestart}</div>
        </div>
        <div class="audio-result">
            <p class="header">Mistakes: <span class="count-color-false">${arrFalseWord.length}</span></p>
            <div class="result-false-words">
                ${resFalse}
            </div>
            <p class="header">I know: <span class="count-color-true">${arrTrueWord.length}</span></p>
            <div class="result-true-words">
                ${resTrue}
            </div>
        </div>
        <div class="bottom-panel"></div>
    </div>
    `;
    renderPageContent(contentResult);
    const arrSvgImage = document.querySelectorAll('#svg');
    const sumArr = arrFalseWord.concat(arrTrueWord);

    for (let i = 0; i < sumArr.length; i++) {
        arrSvgImage[i].addEventListener('click', () => playAudio(sumArr[i].audio));
    }
    document.querySelector('.button-restart')?.addEventListener('click', () => {
        return modeGame === true ? renderAudiocallPageFromMenu() : renderAudiocallPageFromTextbook();
    });
    (document.querySelector('.top-panel') as HTMLElement).style.justifyContent = 'flex-end';

    //---------add to statistic

    const statistic = await getStatistic(`${localStorage.getItem('id')}`);
    console.log(statistic);
    if (statistic == 404) {
        const optional = {
            learnedWords: 0,
            optional: {
                longestSeriesAudioCall: `${previousLongestSeries}`,
                AudioCallAllWords: `${arrTrueWord.length + arrFalseWord.length}`,
                AudioCallCorrectAnswers: `${arrTrueWord.length}`,
            },
        };
        await upsertStatistic(`${localStorage.getItem('id')}`, optional);
    } else if (statistic == 401) {
        await getNewToken();
    } else {
        let longestSeriesAudioCall = statistic.optional.longestSeriesAudioCall;
        if (longestSeriesAudioCall < previousLongestSeries) longestSeriesAudioCall = previousLongestSeries;
        console.log(previousLongestSeries);
        const AudioCallAllWords = statistic.optional.AudioCallAllWords;
        console.log(AudioCallAllWords);
        const AudioCallCorrectAnswers = statistic.optional.AudioCallCorrectAnswers;
        const optional = {
            learnedWords: 0,
            optional: {
                longestSeriesAudioCall: `${longestSeriesAudioCall}`,
                AudioCallAllWords: `${Number(AudioCallAllWords) + arrTrueWord.length + arrFalseWord.length}`,
                AudioCallCorrectAnswers: `${Number(AudioCallCorrectAnswers) + arrTrueWord.length}`,
            },
        };
        await upsertStatistic(`${localStorage.getItem('id')}`, optional);
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
