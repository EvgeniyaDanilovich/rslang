import { User } from '../models/types';

export function addToLocalStorageUser(data: User) {
    const user = localStorage.getItem('user');
    if (user !== null) {
        localStorage.setItem('user', `${JSON.stringify(data)}`);
    } else {
        localStorage.clear();
        localStorage.setItem('user', `${JSON.stringify(data)}`);
    }
}

interface tokens {
    token: string;
    refreshToken: string;
}

export function addToLocalStorageToken(data: tokens) {
    const token = localStorage.getItem('token');
    if (token !== null) {
        localStorage.setItem('token', `${JSON.stringify(token)}`);
    } else {
        localStorage.clear();
        localStorage.setItem('token', `${JSON.stringify(token)}`);
    }
}
