import { Word } from '../../models/types';
import { renderPageContent } from '../../utils/common';
import { path, svgImage, svgRestart } from '../../utils/constants';
import './result-game-component.scss';

export function renderGameResult(arrTrueWords: Word[], arrFalseWords: Word[]) {
    const resTrue = arrTrueWords.reduce((res, el) => {
        const rowWord = `
        <div class="result-true row-word" id="${el.id}">
        <div class="sound">
             <audio id="audio-${el.id}">    
                 <source src="${path}/${el.audio}" type="audio/mpeg">
             </audio>
             ${svgImage}
        </div>
         ${el.word} <span class="word-translate"> - ${el.wordTranslate}</span></div>
        `;

        return (res += rowWord);
    }, '');

    const resFalse = arrFalseWords.reduce((res, el) => {
        const rowWord = `
        <div class="result-false row-word" id="${el.id}">
        <div class="sound">
             <audio id="audio-${el.id}">    
                 <source src="${path}/${el.audio}" type="audio/mpeg">
             </audio>
             ${svgImage}
        </div>
         ${el.word} <span class="word-translate"> - ${el.wordTranslate}</span></div>
        `;

        return (res += rowWord);
    }, '');

    const contentResult = `
    <div class="game-content">
        <div class="top-panel">
            <div class="button-restart">${svgRestart}</div>
        </div>
        <div class="audio-result">
            <p class="header">Mistakes: <span class="count-color-false">${arrFalseWords.length}</span></p>
            <div class="result-false-words">
                ${resFalse}
            </div>
            <p class="header">I know: <span class="count-color-true">${arrTrueWords.length}</span></p>
            <div class="result-true-words">
                ${resTrue}
            </div>
        </div>
        <div class="bottom-panel"></div>
    </div>
    `;

    renderPageContent(contentResult);

    const resultCard = document.querySelector('.audio-result');
    resultCard.addEventListener('click', (event: Event) => {
        const currentItem = event.target as HTMLElement;
        const rowWord = currentItem.closest('.row-word') as HTMLElement;
        const currentId: string = rowWord.id;
        const audio = document.querySelector(`#audio-${currentId}`) as HTMLAudioElement;

        if (currentItem.closest('.sound')) {
            audio.play();
        }
    });

    const reset = document.querySelector('.button-restart') as HTMLElement;
    reset.addEventListener('click', () => {
        document.location.reload();
    });
}
