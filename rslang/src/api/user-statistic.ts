import { token } from '../index';
import { path } from '../utils/common';

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
