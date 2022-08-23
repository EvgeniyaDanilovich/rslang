import { dataWords, path } from '../../api/words';
import { Word } from '../../models/types';
import { renderPageContent } from '../../utils/ui';
import './book.scss';

const renderWord = (
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
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <style>
                        .cls-1 {
                            fill: #101820;
                        }
                    </style>
                </defs>
                <title />
                <g data-name="Layer 33" id="Layer_33">
                    <path class="cls-1"
                        d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z" />
                    <path class="cls-1"
                        d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z" />
                    <path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z" />
                    <path class="cls-1"
                        d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z" />
                </g>
            </svg>
        </div>
        <div class="translation">${wordTranslate}</div>
    </div>
    <div class="explain">${textMeaning}</div>
    <div class="explain-translation">${textMeaningTranslate}</div>
    <div class="example">${textExample}</div>
    <div class="example-translation">${textExampleTranslate}</div>
</div>
</div>`;

const renderWords = (currentWords: Word[]) =>
    `${currentWords
        .map(
            (word: Word) =>
                `${renderWord(
                    word.id,
                    word.word,
                    word.transcription,
                    word.wordTranslate,
                    word.image,
                    word.audio,
                    word.audioMeaning,
                    word.audioExample,
                    word.textMeaning,
                    word.textMeaningTranslate,
                    word.textExample,
                    word.textExampleTranslate
                )}`
        )
        .join()}`;

export const renderBookPage = (): void => {
    const content = `
    <div class="game-nav">
    <div class="game"><a href="#">Audio call</a></div>
    <div class="game"><a href="#">Sprint</a></div>
</div>
<div class="sections">
    <div class="section"><a href="#">1</a></div>
    <div class="section"><a href="#">2</a></div>
    <div class="section"><a href="#">3</a></div>
    <div class="section"><a href="#">4</a></div>
    <div class="section"><a href="#">5</a></div>
    <div class="section"><a href="#">6</a></div>
</div>
<div class="pagination">
    <div class="page"><a href="#">1</a></div>
    <div class="page"><a href="#">2</a></div>
    <div class="page"><a href="#">3</a></div>
    <div class="page"><a href="#">4</a></div>
    <div class="page"><a href="#">5</a></div>
    <div class="page"><a href="#">6</a></div>
</div>
<div class="word-wrapper">
    ${renderWords(dataWords)}
</div>`;

    renderPageContent(content);
};

export function listenBookPage(): void {
    const card = document.querySelector('.word-wrapper') as HTMLElement;

    card.addEventListener('click', (event: Event) => {
        const currentItem = event.target as HTMLElement;
        const card = currentItem.closest('.card') as HTMLElement;
        const currentId: string = card.id;
        const audio = document.querySelector(`#audio-${currentId}`) as HTMLAudioElement;
        const audio2 = document.querySelector(`#audio2-${currentId}`) as HTMLAudioElement;
        const audio3 = document.querySelector(`#audio3-${currentId}`) as HTMLAudioElement;

        const time1: number = audio.duration * 1000;
        const time2: number = audio2.duration * 1000;
        const time3: number = time1 + time2;

        if (currentItem.closest('.sound')) {
            audio.play();
            setTimeout(() => {
                audio2.play();
            }, time1);
            setTimeout(() => {
                audio3.play();
            }, time3);
        }
    });
}
