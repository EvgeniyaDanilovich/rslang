import { renderPageContent } from '../../utils/ui';
import { getRandomNum } from '../../utils/getRandomNum';
import { getAllAggregatedWords } from '../../api/users-aggregated-words';
import { path } from '../../index';
import { Word } from '../../models/types';
import './audiocall-page.scss';

//---------- сreate and show a window for choosing the level of difficulty ----------//

export const renderAudiocallPage = (): void => {
    let levelDifficult: number;
    let currentWordActive: Word;
    let countCard = 0;
    const arrTrueWord: Word[] = [];
    const arrFalseWord: Word[] = [];

    const contentDifficult = `
        <div class="audio-content">
            <div class="difficult-window">
                <p class="select-level">Select the Level:</p>
                <div class="container-level">
                    <button class="button-level" data-id="1">1</button>
                    <button class="button-level" data-id="2">2</button>
                    <button class="button-level" data-id="3">3</button>
                    <button class="button-level" data-id="4">4</button>
                    <button class="button-level" data-id="5">5</button>
                    <button class="button-level" data-id="6">6</button>
                </div>
            </div>
        </div>
    `;
    renderPageContent(contentDifficult);
    document.querySelectorAll('.button-level').forEach((el) => el.addEventListener('click', selectLevel));

    //---------- make a choice of difficulty level and run the first card ----------//

    function selectLevel(EO: Event) {
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
        const currentWord = arrWords[getRandomNum(0, 4)];
        currentWordActive = currentWord;
        console.log(currentWord);
        const contentGame = `
        <div class="audio-content">
            <div class="audio-card">
                <div class="word-audio" data-word="${currentWord['word']}">(audio: ${currentWord['word']})</div>
                <div class="block-words">
                    <div class="word-answer">${arrWords[0].word}</div>
                    <div class="word-answer">${arrWords[1].word}</div>
                    <div class="word-answer">${arrWords[2].word}</div>
                    <div class="word-answer">${arrWords[3].word}</div>
                    <div class="word-answer">${arrWords[4].word}</div>
                </div>
                <button class="button-next">NEXT</button>
            </div>
        </div>
        `;
        renderPageContent(contentGame);
        playAudio();
        document.querySelectorAll('.word-answer').forEach((el) => el.addEventListener('click', comparsionWords));
        document.querySelector('.button-next')?.addEventListener('click', playCard);
    }

    //---------- play audio word ----------//
    
    function playAudio() {
        const audioElement = new Audio();
        audioElement.src = `${path}/${currentWordActive.audio}`;
        console.log(audioElement);
        audioElement.play();
    }

    //---------- compare the selected word with a known correct word, prepare the data for the result ----------//

    function comparsionWords(EO: Event) {
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

    function showResult() {
        const resTrue = arrTrueWord.reduce((res, el) => {
            return (res += `<p class="result-true">${el.word}</p>`);
        }, '');
        const resFalse = arrFalseWord.reduce((res, el) => {
            return (res += `<p class="result-false">${el.word}</p>`);
        }, '');
        const contentResult = `
        <div class="audio-content">
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
