export function renderFooter() {
    const footerContainer = document.querySelector('.footer-container') as HTMLElement;
    if (!footerContainer) {
        const main = document.querySelector('.main-container') as HTMLElement;
        const footer = document.createElement('footer');
        footer.classList.add('footer-container');
        footer.innerHTML = `
            <div class="githabs">
                <a class="developer-link" href="https://github.com/koviatsinets">Igor Koviatsinets</a>
                <a class="developer-link" href="https://github.com/EvgeniyaDanilovich">Evgeniya Danilovich</a>
                <a class="developer-link" href="https://github.com/Darya-Kazharnovich">Darya Kazharnovich</a>
            </div>
            <span>2022</span>
            <div class="rs-link">
                <a href="https://rs.school/js/"><img src="img/rs_school_js.svg" alt="RSSchool logo"
                        class="rs-school"></a>
            </div>
    `;
        main.after(footer);
    }
}

export function deleteFooter() {
    const footerContainer = document.querySelector('.footer-container') as HTMLElement;
    if (footerContainer) {
        footerContainer.remove();
    }
}
