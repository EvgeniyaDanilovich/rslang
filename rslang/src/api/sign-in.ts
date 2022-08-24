import { path } from '../utils/common';
import { User } from '../models/types';

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
