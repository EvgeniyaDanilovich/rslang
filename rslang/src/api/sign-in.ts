import { path } from '../utils/constants';
import { User, Auth } from '../models/types';

export async function loginUser(user: User) {
    const rawResponse = await fetch(`${path}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = rawResponse.status;
    if (content == 200) {
        return rawResponse.json();
    } else {
        return content;
    }
}
