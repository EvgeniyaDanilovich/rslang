import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { getLocalStorage } from '../../utils/common';
import { path, svgImage } from '../../utils/constants';

import './words-component.scss';

const isAuthorized = getLocalStorage(LocalStorageKeys.ID);

function addStatusButtons() {
    if (isAuthorized) {
        if (!(document.location.hash === '#/difficult-words')) {
            return ` <div class="status">
                   <div class="status-btn hard">Hard</div>
                   <div class="status-btn like">Learned</div>
               </div>`;
        } else {
            return ` <div class="status">
                  <div class="status-btn delete">Delete</div>
              </div>`;
        }
    }

    return '';
}

export const renderWord = (
    id: string,
    word: string,
    transcription: string,
    wordTranslate: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textMeaningTranslate: string,
    textExample: string,
    textExampleTranslate: string
) =>
    `<div class="card" id="${id}">
<div class="card__img"><img src="${path}/${image}" alt=""></div>
<div class="card__info">
<div class="card-header">
    <div class="word">${word}</div>
    <div class="transcription">${transcription}</div>
    <div class="sound">
    <audio id="audio-${id}">    
        <source src="${path}/${audio}" type="audio/mpeg">
    </audio>
    <audio id="audio2-${id}">    
        <source src="${path}/${audioMeaning}" type="audio/mpeg">
    </audio>
    <audio id="audio3-${id}">    
        <source src="${path}/${audioExample}" type="audio/mpeg">
    </audio>
    ${svgImage}
    </div>
    <div class="translation">${wordTranslate}</div>
</div>
<div class="explain">${textMeaning}</div>
<div class="explain-translation">${textMeaningTranslate}</div>
<div class="example">${textExample}</div>
<div class="example-translation">${textExampleTranslate}</div>
${addStatusButtons()}
</div>
</div>`;
