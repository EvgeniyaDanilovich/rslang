import { createUserWord } from '../../api/users-words';
import { getChunkWords, getWordWithAssetsById } from '../../api/words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { UserWord, Word } from '../../models/types';
import { renderPageContent } from '../../utils/common';
import { path, svgImage } from '../../utils/constants';

import './book.scss';

export async function allBookPage() {
    function setLocalStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    function getLocalStorage(key: string): string | null {
        return localStorage.getItem(key);
    }

    const isAuthorized = getLocalStorage(LocalStorageKeys.ID);

    let page = Number(getLocalStorage('page') ? getLocalStorage('page') : 0);
    let group = Number(getLocalStorage('group') ? getLocalStorage('group') : 0);

    const dataWords = await getChunkWords(group, page);

    function addStatusButtons() {
        if (isAuthorized) {
            return ` <div class="status">
        <div class="status-btn hard">Hard</div>
        <div class="status-btn like">Like</div>
    </div>`;
        }
    }

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

    const renderPagination = (): string => {
        const arr = [];
        for (let i = 0; i < 30; i++) {
            arr.push(`<div class="page" data-page="${i}">${i + 1}</div>`);
        }
        return arr.join(' ');
    };

    const renderBookPage = (): void => {
        const content = `
    <div class="game-nav">
    <div class="game audio-call"><a href="#/audiocall" data-navigo>Audio call</a></div>
    <div class="game sprint"><a href="#">Sprint</a></div>
</div>
<div class="sections">
    <div >Level:</div>
    <div class="section" id="level-1" data-level="0">1</div>
    <div class="section" id="level-2" data-level="1">2</div>
    <div class="section" id="level-3" data-level="2">3</div>
    <div class="section" id="level-4" data-level="3">4</div>
    <div class="section" id="level-5" data-level="4">5</div>
    <div class="section" id="level-6" data-level="5">6</div>
</div>
<div class="pagination">
  ${renderPagination()}
</div>
<div class="word-wrapper">
    ${renderWords(dataWords)}
</div>`;
        renderPageContent(content);
    };

    renderBookPage();

    async function updateWordsOnPage(wordWrapper: HTMLElement, group: number, page: number) {
        const dataWords: Word[] = await getChunkWords(group, page);
        wordWrapper.innerHTML = renderWords(dataWords);
    }

    const wordWrapper = document.querySelector('.word-wrapper') as HTMLElement;
    const sectionItems = document.querySelectorAll('.section') as NodeListOf<Element>;
    const pageItems = document.querySelectorAll('.page') as NodeListOf<Element>;

    sectionItems[group].classList.add('active');
    pageItems[page].classList.add('active');

    wordWrapper.addEventListener('click', async (event: Event) => {
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

        if (isAuthorized) {
            const currentCard = currentItem.closest('.card') as HTMLElement;
            const cardId = Number(currentCard.getAttribute('id'));
            console.log(cardId);
            if (currentItem.closest('.like')) {
                currentCard.classList.remove('selected-hard');
                currentCard.classList.add('selected-like');
            }
            if (currentItem.closest('.hard')) {
                currentCard.classList.remove('selected-like');
                currentCard.classList.add('selected-hard');

                const wordInfo: Word = await getWordWithAssetsById(cardId.toString());
                const word: UserWord = {
                    difficulty: 'hard',
                    optional: wordInfo,
                };
                console.log(cardId.toString());
                // createUserWord(isAuthorized, cardId.toString(), word);
            }
        }
    });

    const sections = document.querySelector('.sections') as HTMLElement;
    sections.addEventListener('click', (event: Event): void => {
        const currentItem = event.target as HTMLElement;

        if (currentItem.classList.contains('section')) {
            sectionItems.forEach((item) => {
                item.classList.remove('active');
            });
            currentItem.classList.add('active');

            group = Number(currentItem.dataset.level);
            updateWordsOnPage(wordWrapper, group, page);
            setLocalStorage('group', `${group}`);
        }
    });

    const pagination = document.querySelector('.pagination') as HTMLElement;

    pagination.addEventListener('click', (event: Event) => {
        const currentItem = event.target as HTMLElement;

        if (currentItem.classList.contains('page')) {
            pageItems.forEach((item) => {
                item.classList.remove('active');
            });
            currentItem.classList.add('active');

            page = Number(currentItem.dataset.page);
            updateWordsOnPage(wordWrapper, group, page);
            setLocalStorage('page', `${page}`);
        }
    });

    if (isAuthorized) {
        const subNavigate = document.querySelector('.game-nav') as HTMLElement;
        const difficultWordsLink = `<div class="difficult"><a href="#/difficult-words" data-navigo>Difficult words</a></div>`;
        subNavigate.innerHTML += difficultWordsLink;
    }

    // const hardBtn = document.querySelector('.hard') as HTMLElement;
    // const likeBtn = document.querySelector('.like') as HTMLElement;

    // hardBtn.addEventListener('click', () => {
    //     console.log('audioCallBtn');
    // });

    // sprintBtn.addEventListener('click', () => {
    //     console.log('sprintBtn');
    // });
}
