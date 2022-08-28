import { getNewUserToken } from '../api/users';

export function getRandomNum(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

export function renderPageContent(pageHTML: string) {
    const content = document.querySelector('.main-container') as HTMLElement;
    content.innerHTML = `${pageHTML}`;
}
export function addToLocalStorage(key: string, data: string) {
    localStorage.setItem(`${key}`, `${data}`);
}
export async function getNewToken() {
    const id = localStorage.getItem('id');
    if (id) {
        const newTokens = await getNewUserToken(id);
        addToLocalStorage('token', newTokens.token);
        addToLocalStorage('refreshToken', newTokens.refreshToken);
    }
}
