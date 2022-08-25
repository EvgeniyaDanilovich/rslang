import { getRandomNum, renderPageContent } from '../../utils/common';
import { getAllAggregatedWords } from '../../api/users-aggregated-words';
import { path, contentDifficult, svgImage } from '../../utils/constants';
import { Word } from '../../models/types';
import './audiocall-page.scss';

//---------- сreate and show a window for choosing the level of difficulty ----------//

export const renderAudiocallPage = (): void => {
    let levelDifficult: number;
    let currentWordActive: Word;
    let countCard = 0;
    const arrTrueWord: Word[] = [];
    const arrFalseWord: Word[] = [];

    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));

    //---------- make a choice of difficulty level and run the first card ----------//

    function selectLevel(EO: Event): void {
        levelDifficult = Number((EO.target as HTMLElement).dataset.id);
        playCard();
    }

    //-------------------- create card --------------------//

    async function playCard(): Promise<void> {
        countCard++;
        if (countCard > 10) {
            showResult();
            return;
        }
        const words = getAllAggregatedWords('62fec0ef3a51c600162caa6c', levelDifficult, getRandomNum(0, 119), 5);
        let arrWords = await words;
        arrWords = arrWords[0].paginatedResults;
        const currentWord: Word = arrWords[getRandomNum(0, 4)];
        currentWordActive = currentWord;
        const contentGame = `
        <div class="game-content">
            <div class="audio-card">
                <div class="word-audio" data-word="${currentWord['wordTranslate']}">${svgImage}</div>
                <div class="block-words">
                    <div class="word-answer">${arrWords[0].wordTranslate}</div>
                    <div class="word-answer">${arrWords[1].wordTranslate}</div>
                    <div class="word-answer">${arrWords[2].wordTranslate}</div>
                    <div class="word-answer">${arrWords[3].wordTranslate}</div>
                    <div class="word-answer">${arrWords[4].wordTranslate}</div>
                </div>
                <button class="button-next">NEXT</button>
            </div>
        </div>
        `;
        renderPageContent(contentGame);
        playAudio();
        document.querySelectorAll('.word-answer').forEach((el) => el.addEventListener('click', comparsionWords));
        document.querySelector('.button-next')?.addEventListener('click', playCard);
        document.querySelector('.word-audio')?.addEventListener('click', () => playAudio());
    }

    //---------- play audio word ----------//

    function playAudio(audio?: string): void {
        const audioElement = new Audio();
        audioElement.src = `${path}/${currentWordActive.audio}`;
        audioElement.play();
    }

    //---------- compare the selected word with a known correct word, prepare the data for the result ----------//

    function comparsionWords(EO: Event): void {
        if (
            (EO.target as HTMLElement).innerText !== (document.querySelector('.word-audio') as HTMLElement).dataset.word
        ) {
            (EO.target as HTMLElement).style.cssText = 'background-color: red; color: white';
            arrFalseWord.push(currentWordActive);
        } else {
            (EO.target as HTMLElement).style.cssText = 'background-color: green; color: white';
            arrTrueWord.push(currentWordActive);
        }
        document.querySelectorAll('.word-answer').forEach((el) => el.removeEventListener('click', comparsionWords));
    }

    //-------------------- create and display result window --------------------//

    function showResult(): void {
        const resTrue = arrTrueWord.reduce((res, el) => {
            return (res += `<p class="result-true">${el.word} - ${el.wordTranslate}</p>`);
        }, '');
        const resFalse = arrFalseWord.reduce((res, el) => {
            return (res += `<p class="result-false">${el.word} - ${el.wordTranslate}</p>`);
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
    }
};
