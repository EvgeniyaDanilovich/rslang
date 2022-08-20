export function renderPageContent(pageHTML: string) {
    const content = document.querySelector('.content') as HTMLElement;
    content.innerHTML = `${pageHTML}`;
}
