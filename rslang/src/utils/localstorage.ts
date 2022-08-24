export function addToLocalStorage(key: string, data: string) {
    const keys = localStorage.getItem(`${key}`);
    if (keys !== null) {
        localStorage.setItem(`${key}`, `${data}`);
    } else {
        localStorage.clear();
        localStorage.setItem(`${key}`, `${data}`);
    }
}
