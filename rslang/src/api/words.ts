import { path } from '../utils/constants';

export async function getChunkWords(group: number, page: number) {
    const rawResponse = await fetch(`${path}/words?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const content = rawResponse.status;
    if (content == 200) {
        return rawResponse.json();
    } else {
        return content;
    }
}

export async function getWordWithAssetsById(wordId: string) {
    const rawResponse = await fetch(`${path}/words/${wordId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const content = rawResponse.status;
    if (content == 200) {
        return rawResponse.json();
    } else {
        return content;
    }
}
