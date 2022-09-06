import { createUserWord } from '../../api/users-words';
import { getChunkWords } from '../../api/words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { GetAggregatedWords, UserWord, Word } from '../../models/types';
import { addToLocalStorage, getLocalStorage, playAudioBook, renderPageContent } from '../../utils/common';
import { renderWord } from '../words-component/words-component';
import { renderAudiocallPageFromTextbook } from '../audiocall-page/audiocall-page';
import { addLearnedWordByButton } from '../../components/learned-words/learned-words';

import './book.scss';
import { getAllAggregatedWords, parseQuery } from '../../api/users-aggregated-words';
import { updateCurrentIndex } from '../sprint-page/sprint-page';

require('../../img/hard.svg');
require('../../img/sprint.svg');
require('../../img/audiocall.svg');

export async function allBookPage() {
    const userId = getLocalStorage(LocalStorageKeys.ID);

    let page = Number(getLocalStorage('page') ? getLocalStorage('page') : 0);
    if (page === 0) addToLocalStorage('page', '0');
    let group = Number(getLocalStorage('group') ? getLocalStorage('group') : 0);
    if (group === 0) addToLocalStorage('group', '0');

    const dataWords: Word[] = await getChunkWords(group, page);

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

    const renderBookPage = async (): Promise<void> => {
        const content = `
    <div class="game-nav">
    <h2 class="title">Textbook</h2>
    <div class="game game-audiocall"><a href="#/audiocall-from-textbook" data-navigo>Audio call</a></div>
    <div class=" game game-sprint"><a href="#/sprint-book" data-navigo>Sprint</a></div>
</div>
<div class="sections container">
    <div class="level">Level:</div>
    <div class="section" id="level-1" data-level="0">
<svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.0979 1.8541C23.6966 0.0114822 26.3034 0.0114799 26.9021 1.8541L31.2864 15.3475C31.5541 16.1716 32.3221 16.7295 33.1885 16.7295H47.3763C49.3138 16.7295 50.1193 19.2087 48.5519 20.3475L37.0737 28.6869C36.3727 29.1962 36.0794 30.0989 36.3472 30.923L40.7314 44.4164C41.3302 46.259 39.2212 47.7913 37.6538 46.6525L26.1756 38.3131C25.4746 37.8038 24.5254 37.8038 23.8244 38.3131L12.3462 46.6525C10.7788 47.7913 8.66985 46.259 9.26855 44.4164L13.6528 30.923C13.9206 30.0989 13.6273 29.1962 12.9263 28.6869L1.4481 20.3475C-0.119326 19.2087 0.686224 16.7295 2.62367 16.7295H16.8115C17.6779 16.7295 18.4459 16.1716 18.7136 15.3475L23.0979 1.8541Z" stroke="#FF9E71" stroke-width="2" fill="#fff"/>
</svg> <span>1</span>
</div>
    <div class="section" id="level-2" data-level="1">
<svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.0489 2.16312C24.3483 1.24181 25.6517 1.24181 25.9511 2.16312L30.3353 15.6565C30.737 16.8926 31.8888 17.7295 33.1885 17.7295H47.3763C48.3451 17.7295 48.7478 18.9691 47.9641 19.5385L36.4859 27.8779C35.4345 28.6418 34.9945 29.9959 35.3961 31.232L39.7804 44.7254C40.0797 45.6467 39.0253 46.4129 38.2415 45.8435L26.7634 37.5041C25.7119 36.7401 24.2881 36.7401 23.2366 37.5041L11.7585 45.8435C10.9747 46.4129 9.92026 45.6467 10.2196 44.7254L14.6039 31.232C15.0055 29.9959 14.5655 28.6418 13.5141 27.8779L2.03589 19.5385C1.25217 18.9691 1.65495 17.7295 2.62367 17.7295H16.8115C18.1112 17.7295 19.263 16.8926 19.6647 15.6565L24.0489 2.16312Z" stroke="#61BB99" stroke-width="2" fill="#fff"/>
</svg>  <span>2</span>
</div>
    <div class="section" id="level-3" data-level="2">
<svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.0489 2.16312C24.3483 1.24181 25.6517 1.24181 25.9511 2.16312L30.3353 15.6565C30.737 16.8926 31.8888 17.7295 33.1885 17.7295H47.3763C48.3451 17.7295 48.7478 18.9691 47.9641 19.5385L36.4859 27.8779C35.4345 28.6418 34.9945 29.9959 35.3961 31.232L39.7804 44.7254C40.0797 45.6467 39.0253 46.4129 38.2415 45.8435L26.7634 37.5041C25.7119 36.7401 24.2881 36.7401 23.2366 37.5041L11.7585 45.8435C10.9747 46.4129 9.92026 45.6467 10.2196 44.7254L14.6039 31.232C15.0055 29.9959 14.5655 28.6418 13.5141 27.8779L2.03589 19.5385C1.25217 18.9691 1.65495 17.7295 2.62367 17.7295H16.8115C18.1112 17.7295 19.263 16.8926 19.6647 15.6565L24.0489 2.16312Z" stroke="#A361BB" stroke-width="2" fill="#fff"/>
</svg>  <span>3</span>
</div>
    <div class="section" id="level-4" data-level="3">
<svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.0489 2.16312C24.3483 1.24181 25.6517 1.24181 25.9511 2.16312L30.3353 15.6565C30.737 16.8926 31.8888 17.7295 33.1885 17.7295H47.3763C48.3451 17.7295 48.7478 18.9691 47.9641 19.5385L36.4859 27.8779C35.4345 28.6418 34.9945 29.9959 35.3961 31.232L39.7804 44.7254C40.0797 45.6467 39.0253 46.4129 38.2415 45.8435L26.7634 37.5041C25.7119 36.7401 24.2881 36.7401 23.2366 37.5041L11.7585 45.8435C10.9747 46.4129 9.92026 45.6467 10.2196 44.7254L14.6039 31.232C15.0055 29.9959 14.5655 28.6418 13.5141 27.8779L2.03589 19.5385C1.25217 18.9691 1.65495 17.7295 2.62367 17.7295H16.8115C18.1112 17.7295 19.263 16.8926 19.6647 15.6565L24.0489 2.16312Z" stroke="#6166bb" stroke-width="2" fill="#fff"/>
</svg>  <span>4</span>
</div>
    <div class="section" id="level-5" data-level="4">
<svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.0489 2.16312C24.3483 1.24181 25.6517 1.24181 25.9511 2.16312L30.3353 15.6565C30.737 16.8926 31.8888 17.7295 33.1885 17.7295H47.3763C48.3451 17.7295 48.7478 18.9691 47.9641 19.5385L36.4859 27.8779C35.4345 28.6418 34.9945 29.9959 35.3961 31.232L39.7804 44.7254C40.0797 45.6467 39.0253 46.4129 38.2415 45.8435L26.7634 37.5041C25.7119 36.7401 24.2881 36.7401 23.2366 37.5041L11.7585 45.8435C10.9747 46.4129 9.92026 45.6467 10.2196 44.7254L14.6039 31.232C15.0055 29.9959 14.5655 28.6418 13.5141 27.8779L2.03589 19.5385C1.25217 18.9691 1.65495 17.7295 2.62367 17.7295H16.8115C18.1112 17.7295 19.263 16.8926 19.6647 15.6565L24.0489 2.16312Z" stroke="#BBA261" stroke-width="2" fill="#fff"/>
</svg>  <span>5</span>
</div>
    <div class="section" id="level-6" data-level="5">
<svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.0489 2.16312C24.3483 1.24181 25.6517 1.24181 25.9511 2.16312L30.3353 15.6565C30.737 16.8926 31.8888 17.7295 33.1885 17.7295H47.3763C48.3451 17.7295 48.7478 18.9691 47.9641 19.5385L36.4859 27.8779C35.4345 28.6418 34.9945 29.9959 35.3961 31.232L39.7804 44.7254C40.0797 45.6467 39.0253 46.4129 38.2415 45.8435L26.7634 37.5041C25.7119 36.7401 24.2881 36.7401 23.2366 37.5041L11.7585 45.8435C10.9747 46.4129 9.92026 45.6467 10.2196 44.7254L14.6039 31.232C15.0055 29.9959 14.5655 28.6418 13.5141 27.8779L2.03589 19.5385C1.25217 18.9691 1.65495 17.7295 2.62367 17.7295H16.8115C18.1112 17.7295 19.263 16.8926 19.6647 15.6565L24.0489 2.16312Z" stroke="#BB6161" stroke-width="2" fill="#fff"/>
</svg>  <span>6</span>
</div>
</div>
<div class="pagination container">
  ${renderPagination()}
</div>
<div class="word-wrapper container">
    ${renderWords(dataWords)}
</div>`;

        renderPageContent(content);
        document.querySelector('.audiocall')?.addEventListener('click', renderAudiocallPageFromTextbook);
        document.querySelector('.game-sprint')?.addEventListener('click', () => {
            updateCurrentIndex();
        });
        getCardStatus().then(() => {
            updateCardStatus();
        });
    };

    renderBookPage();

    const idOfHardCards: string[] = [];
    const idOfLearnedCards: string[] = [];

    async function getCardStatus() {
        if (userId) {
            const difficultWordQuery: GetAggregatedWords = {
                userId: userId,
                filter: { $and: [{ 'userWord.difficulty': 'hard' }] },
            };

            const learnedWordQuery: GetAggregatedWords = {
                userId: userId,
                filter: { $and: [{ 'userWord.difficulty': 'learned' }] },
            };

            const difficultWords = await getAllAggregatedWords(parseQuery(difficultWordQuery));
            const learnedWords = await getAllAggregatedWords(parseQuery(learnedWordQuery));

            const difficultWordsArr = difficultWords[0].paginatedResults;
            for (const difficultWord of difficultWordsArr) {
                for (const word of dataWords) {
                    if (difficultWord._id === word.id) {
                        idOfHardCards.push(word.id);
                    }
                }
            }

            const learnedWordsArr = learnedWords[0].paginatedResults;
            for (const learnedWord of learnedWordsArr) {
                for (const word of dataWords) {
                    if (learnedWord._id === word.id) {
                        idOfLearnedCards.push(word.id);
                    }
                }
            }
        }
    }

    function updateCardStatus() {
        const allCards = document.querySelectorAll('.card') as NodeListOf<Element>;
        allCards.forEach((card) => {
            card.classList.remove('selected-hard');
            card.classList.remove('selected-like');
        });

        idOfHardCards.map((id) => {
            const card = document.getElementById(`${id}`) as HTMLElement;
            card.classList.add('selected-hard');
        });

        idOfLearnedCards.map((id) => {
            const card = document.getElementById(`${id}`) as HTMLElement;
            card.classList.add('selected-like');
        });
    }

    async function updateWordsOnPage(wordWrapper: HTMLElement, group: number, page: number) {
        const dataWords: Word[] = await getChunkWords(group, page);
        wordWrapper.innerHTML = renderWords(dataWords);
    }

    const wordWrapper = document.querySelector('.word-wrapper') as HTMLElement;
    const sectionItems = document.querySelectorAll('.section') as NodeListOf<Element>;
    const pageItems = document.querySelectorAll('.page') as NodeListOf<Element>;

    sectionItems[group].classList.add('active');
    pageItems[page].classList.add('active');

    function initCardStatus(event: Event) {
        const currentItem = event.target as HTMLElement;
        if (userId) {
            const currentCard = currentItem.closest('.card') as HTMLElement;
            const cardId: string = currentCard.getAttribute('id');

            if (currentItem.closest('.like')) {
                currentCard.classList.remove('selected-hard');
                currentCard.classList.add('selected-like');
                addLearnedWordByButton(userId, cardId);
            }
            if (currentItem.closest('.hard')) {
                currentCard.classList.remove('selected-like');
                currentCard.classList.add('selected-hard');

                const word: UserWord = {
                    difficulty: 'hard',
                    optional: {},
                };

                createUserWord(userId, cardId, word);
            }
        }
    }

    wordWrapper.addEventListener('click', playAudioBook);
    wordWrapper.addEventListener('click', initCardStatus);

    const sections = document.querySelector('.sections') as HTMLElement;
    sections.addEventListener(
        'click',
        async (event: Event): Promise<void> => {
            const currentItem = event.target as HTMLElement;

            if (currentItem.closest('.section')) {
                const star = currentItem.closest('.section') as HTMLElement;
                sectionItems.forEach((item) => {
                    item.classList.remove('active');
                });
                star.classList.add('active');
                console.log('svg');
                group = Number(star.dataset.level);
                await updateWordsOnPage(wordWrapper, group, page);
                addToLocalStorage('group', `${group}`);
            }
        }
    );

    const pagination = document.querySelector('.pagination') as HTMLElement;

    pagination.addEventListener('click', async (event: Event) => {
        const currentItem = event.target as HTMLElement;

        if (currentItem.classList.contains('page')) {
            pageItems.forEach((item) => {
                item.classList.remove('active');
            });
            currentItem.classList.add('active');

            page = Number(currentItem.dataset.page);
            await updateWordsOnPage(wordWrapper, group, page);
            addToLocalStorage('page', `${page}`);

            // getCardStatus().then(() => {
            //     updateCardStatus();
            // });
        }
    });

    if (userId) {
        const subNavigate = document.querySelector('.game-nav') as HTMLElement;
        const difficultWordsLink = `<div class="difficult"><a href="#/difficult-words" data-navigo>Difficult words</a></div>`;
        subNavigate.innerHTML += difficultWordsLink;
    }
}
