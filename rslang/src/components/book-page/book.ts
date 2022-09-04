import { createUserWord, getUserWord, updateUserWord } from '../../api/users-words';
import { getChunkWords, getWordWithAssetsById } from '../../api/words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { UserWord, Word } from '../../models/types';
import { addToLocalStorage, getLocalStorage, playAudioBook, renderPageContent } from '../../utils/common';
import { renderWord } from '../words-component/words-component';
import { renderAudiocallPageFromTextbook } from '../audiocall-page/audiocall-page';
import { addLearnedWordByButton } from '../../components/learned-words/learned-words';

import './book.scss';

export async function allBookPage() {
    const isAuthorized = getLocalStorage(LocalStorageKeys.ID);

    let page = Number(getLocalStorage('page') ? getLocalStorage('page') : 0);
    if (page === 0) addToLocalStorage('page', '0');
    let group = Number(getLocalStorage('group') ? getLocalStorage('group') : 0);
    if (group === 0) addToLocalStorage('group', '0');

    const dataWords = await getChunkWords(group, page);

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
            .join('')}`;

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
    <div class="game-audiocall"><a href="#/audiocall-from-textbook" data-navigo>Audio call</a></div>
    <div class="game"><a href="#/sprint-book" data-navigo>Sprint</a></div>
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
        document.querySelector('.audiocall')?.addEventListener('click', renderAudiocallPageFromTextbook);
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

    async function initCardStatus(event: Event) {
        const currentItem = event.target as HTMLElement;
        if (isAuthorized) {
            const currentCard = currentItem.closest('.card') as HTMLElement;
            const cardId: string = currentCard.getAttribute('id');

            if (currentItem.closest('.like')) {
                currentCard.classList.remove('selected-hard');
                currentCard.classList.add('selected-like');
                addLearnedWordByButton(isAuthorized, cardId);
            }
            if (currentItem.closest('.hard')) {
                currentCard.classList.remove('selected-like');
                currentCard.classList.add('selected-hard');

                const wordInfo: Word = await getWordWithAssetsById(cardId);
                const word: UserWord = {
                    difficulty: 'hard',
                    optional: wordInfo,
                };

                createUserWord(isAuthorized, cardId, word);
            }
        }
    }

    wordWrapper.addEventListener('click', playAudioBook);
    wordWrapper.addEventListener('click', initCardStatus);

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
            addToLocalStorage('group', `${group}`);
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
            addToLocalStorage('page', `${page}`);
        }
    });

    if (isAuthorized) {
        const subNavigate = document.querySelector('.game-nav') as HTMLElement;
        const difficultWordsLink = `<div class="difficult"><a href="#/difficult-words" data-navigo>Difficult words</a></div>`;
        subNavigate.innerHTML += difficultWordsLink;
    }
}
