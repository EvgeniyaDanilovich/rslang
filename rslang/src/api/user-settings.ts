import { token } from '../index';
import { path } from '../utils/constants';

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
