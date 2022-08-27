import { deleteUserWord, getAllUserWords } from '../../api/users-words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { UserWords } from '../../models/types';
import { getLocalStorage, playAudio, renderPageContent } from '../../utils/common';
import { renderWord } from '../words-component/words-component';

export async function use() {
    const userId = getLocalStorage(LocalStorageKeys.ID);

    const difficultWords = await getAllUserWords(userId);
    console.log(difficultWords);

    const renderWords = (currentWords: UserWords[]) =>
        `${currentWords
            .map(
                (word: UserWords) =>
                    `${renderWord(
                        word.optional.id,
                        word.optional.word,
                        word.optional.transcription,
                        word.optional.wordTranslate,
                        word.optional.image,
                        word.optional.audio,
                        word.optional.audioMeaning,
                        word.optional.audioExample,
                        word.optional.textMeaning,
                        word.optional.textMeaningTranslate,
                        word.optional.textExample,
                        word.optional.textExampleTranslate
                    )}`
            )
            .join()}`;

    const difficultPage = `
    <div class="word-wrapper">
    <h2>Difficult words</h2>
    ${renderWords(difficultWords)}
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
    wordWrapper.addEventListener('click', playAudio);
    wordWrapper.addEventListener('click', removeCard);
}
