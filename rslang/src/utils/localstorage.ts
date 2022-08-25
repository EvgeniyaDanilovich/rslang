export function addToLocalStorage(key: string, data: string) {
    localStorage.setItem(`${key}`, `${data}`);
}
