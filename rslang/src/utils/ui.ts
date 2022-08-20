export function renderPageContent(pageHTML: string) {
    const content = document.querySelector('.main-container') as HTMLElement;
    content.innerHTML = `${pageHTML}`;
}
