import { token } from '../index';
import { path } from '../utils/constants';

export interface GetAggregatedWords {
    userId: string;
    group?: number;
    page?: number;
    wordsPerPage?: number;
    filter?: Record<string, unknown>;
}

export function parseQuery(query: GetAggregatedWords): string {
    let parsedQuery = `${query.userId}/aggregatedWords`;
    if (query.group || query.page || query.wordsPerPage || query.filter) {
        parsedQuery += '?';
        if (query.group) parsedQuery += `group=${query.group}&`;
        if (query.page) parsedQuery += `page=${query.page}&`;
        if (query.wordsPerPage) parsedQuery += `wordsPerPage=${query.wordsPerPage}&`;
        if (query.filter) parsedQuery += `filter=${encodeURIComponent(JSON.stringify(query.filter))}&`;
    }
    return parsedQuery;
}

export async function getAllAggregatedWords(parsedQuery: string) {
    const rawResponse = await fetch(`${path}/users/${parsedQuery}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
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

export async function getAggregatedWordById(userId: string, wordId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/aggregatedWords/${wordId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
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
