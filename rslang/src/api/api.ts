import { Word, UserWord, Statistic, Setting, User, Auth } from '../models/types';

const path = 'https://rslangforrsschool.herokuapp.com';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZkZDZiMzZhZWM4MDAxNjMyNTkzYSIsImlhdCI6MTY2MDkzNTY4OCwiZXhwIjoxNjYwOTUwMDg4fQ.CXP0nHQjdbJWijRbK_mDwA-Y7jJi2QlXxkfU8erlmBk';
const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZkZDZiMzZhZWM4MDAxNjMyNTkzYSIsInRva2VuSWQiOiJhMDNjYjY3Ny1iOGZjLTQ2YTItYTQ3YS04MTRiNDMwNWVjNDAiLCJpYXQiOjE2NjA5MzU2ODgsImV4cCI6MTY2MDk1MTg4OH0.x8PgsdZyJ-1i7DgDMWiyqqkfv5JCOWKxnuENck04gBM';
const id = '62ffdd6b36aec8001632593a';
// -------------------- Words -------------------- //

export async function getChunkWords(group: number, page: number) {
    const rawResponse = await fetch(`${path}/words?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function getWordWithAssetsById(wordId: string) {
    const rawResponse = await fetch(`${path}/words/${wordId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

// -------------------- SignIn -------------------- //

export async function loginUser(user: User) {
    const rawResponse = await fetch(`${path}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
}

// -------------------- Users -------------------- //

export async function createUser(user: User) {
    const rawResponse = await fetch(`${path}/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
}

export async function getUser(userId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function updateUser(userId: string, user: User) {
    const rawResponse = await fetch(`${path}/users/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
}

export async function deleteUser(userId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
        },
    });
    const content = rawResponse;
    return content;
}

export async function getNewUserToken(userId: string) {
    console.log(refreshToken);
    const rawResponse = await fetch(`${path}/users/${userId}/tokens`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    const content = await rawResponse.json();
    return content;
}

// -------------------- Users/Words -------------------- //

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

// -------------------- Users/AggregatedWords -------------------- //

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

// -------------------- Users/Statistic -------------------- //

export async function getStatistic(userId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/statistics`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function upsertStatistic(userId: string, param: object) {
    const rawResponse = await fetch(`${path}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
    });
    const content = await rawResponse.json();
    return content;
}

// -------------------- Users/Statistic -------------------- //

export async function getSettings(userId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/settings`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function upsertSettings(userId: string, param: object) {
    const rawResponse = await fetch(`${path}/users/${userId}/settings`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
    });
    const content = await rawResponse.json();
    return content;
}
