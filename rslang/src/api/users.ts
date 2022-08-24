import { token, refreshToken } from '../index';
import { path } from '../utils/constants';
import { User } from '../models/types';

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
