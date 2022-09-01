import { deleteUserWord, getAllUserWords } from '../../api/users-words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { FilterWord, GetAggregatedWords, UserWords } from '../../models/types';
import { getLocalStorage, getNewToken, playAudioBook, renderPageContent } from '../../utils/common';
import { renderWord } from '../words-component/words-component';
import { getAllAggregatedWords, parseQuery } from '../../api/users-aggregated-words';

export async function use() {
    const userId = getLocalStorage(LocalStorageKeys.ID);

    const difficultWordQuery: GetAggregatedWords = {
        userId: userId,
        filter: { $and: [{ 'userWord.difficulty': 'hard' }] },
    };

    const difficultWords = await getAllAggregatedWords(parseQuery(difficultWordQuery));

    if (typeof difficultWords == 'number') {
        getNewToken();
    }

    const renderWords = (currentWords: FilterWord[]) =>
        `${currentWords
            .map(
                (word: FilterWord) =>
                    `${renderWord(
                        word._id,
                        word.userWord.optional.word,
                        word.userWord.optional.transcription,
                        word.userWord.optional.wordTranslate,
                        word.userWord.optional.image,
                        word.userWord.optional.audio,
                        word.userWord.optional.audioMeaning,
                        word.userWord.optional.audioExample,
                        word.userWord.optional.textMeaning,
                        word.userWord.optional.textMeaningTranslate,
                        word.userWord.optional.textExample,
                        word.userWord.optional.textExampleTranslate
                    )}`
            )
            .join('')}`;

    const difficultPage = `
    <div class="word-wrapper">
    <h2>Difficult words</h2>
    ${renderWords(difficultWords[0].paginatedResults)}
</div> `;

    renderPageContent(difficultPage);

    async function removeCard(event: Event) {
        const currentItem = event.target as HTMLElement;

        if (currentItem.closest('.delete')) {
            const currentCard = currentItem.closest('.card') as HTMLElement;
            const cardId: string = currentCard.getAttribute('id');
            const userId = getLocalStorage(LocalStorageKeys.ID);
            deleteUserWord(userId, cardId);
            currentCard.remove();
        }
    }

    const wordWrapper = document.querySelector('.word-wrapper');
    wordWrapper.addEventListener('click', playAudioBook);
    wordWrapper.addEventListener('click', removeCard);
}
