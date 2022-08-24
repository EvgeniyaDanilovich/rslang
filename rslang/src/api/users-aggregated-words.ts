import { token } from '../index';
import { path } from '../utils/common';

export async function getAllAggregatedWords(userId: string, group: number, page: number, wordsPerPage: number) {
    const rawResponse = await fetch(
        `${path}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    );
    const content = await rawResponse.json();
    return content;
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
