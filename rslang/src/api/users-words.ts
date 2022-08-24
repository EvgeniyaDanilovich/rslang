import { token } from '../index';
import { path } from '../utils/common';
import { UserWord } from '../models/types';

export async function getAllUserWords(userId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/words/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function createUserWord(userId: string, wordId: string, word: UserWord) {
    const rawResponse = await fetch(`${path}/users/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    });
    const content = await rawResponse.json();
    return content;
}

export async function getUserWord(userId: string, wordId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function updateUserWord(userId: string, wordId: string, param: object) {
    const rawResponse = await fetch(`${path}/users/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: JSON.stringify(param),
    });
    const content = await rawResponse.json();
    return content;
}

export async function deleteUserWord(userId: string, wordId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
        },
    });
    const content = rawResponse;
    return content;
}
