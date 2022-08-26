import { getAllUserWords } from '../../api/users-words';
import { LocalStorageKeys } from '../../enums/local-storage-keys';
import { getLocalStorage } from '../../utils/common';

export function use() {
    const userId = Number(getLocalStorage(LocalStorageKeys.ID));

    const allWords = getAllUserWords(userId.toString());
    console.log(allWords);
}
