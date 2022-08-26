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

export function getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}
