import { path, token } from '../index';

export async function getAllAggregatedWords() {
    // не разобрался что должно здесь быть
}

export async function getAggregatedWordById(userId: string, wordId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/aggregatedWords/${wordId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}
