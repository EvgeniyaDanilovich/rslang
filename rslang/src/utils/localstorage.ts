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
