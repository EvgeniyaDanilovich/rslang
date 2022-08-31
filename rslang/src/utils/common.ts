import { getNewUserToken } from '../api/users';

export function getRandomNum(min: number, max: number): number {
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

export function getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}

export async function playAudio(event: Event) {
    const currentItem = event.target as HTMLElement;
    const card = currentItem.closest('.card') as HTMLElement;
    const currentId: string = card.id;
    const audio = document.querySelector(`#audio-${currentId}`) as HTMLAudioElement;
    const audio2 = document.querySelector(`#audio2-${currentId}`) as HTMLAudioElement;
    const audio3 = document.querySelector(`#audio3-${currentId}`) as HTMLAudioElement;

    const time1: number = audio.duration * 1000;
    const time2: number = audio2.duration * 1000;
    const time3: number = time1 + time2;

    if (currentItem.closest('.sound')) {
        audio.play();
        setTimeout(() => {
            audio2.play();
        }, time1);
        setTimeout(() => {
            audio3.play();
        }, time3);
    }
}

export function keyboardControlLevel(EO: KeyboardEvent): void {
    const containerLevel = document.querySelector('.container-level');
    if (EO.code === 'Digit1' || EO.code === 'Numpad1') {
        (containerLevel.children[0] as HTMLElement).click();
    }
    if (EO.code === 'Digit2' || EO.code === 'Numpad2') {
        (containerLevel.children[1] as HTMLElement).click();
    }
    if (EO.code === 'Digit3' || EO.code === 'Numpad3') {
        (containerLevel.children[2] as HTMLElement).click();
    }
    if (EO.code === 'Digit4' || EO.code === 'Numpad4') {
        (containerLevel.children[3] as HTMLElement).click();
    }
    if (EO.code === 'Digit5' || EO.code === 'Numpad5') {
        (containerLevel.children[4] as HTMLElement).click();
    }
    if (EO.code === 'Digit6' || EO.code === 'Numpad6') {
        (containerLevel.children[5] as HTMLElement).click();
    }
}
