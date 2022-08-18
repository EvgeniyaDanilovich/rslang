import Navigo from 'navigo';

export const router = new Navigo('/', { hash: true });

router
    .on('/main', () => {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `<div class="p-main">Page main</div>`;

        const divMain = document.querySelector('.p-main') as HTMLElement;
        divMain.addEventListener('click', () => {
            alert('main');
        });
        console.log('main');
    })
    .on('/book', () => {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `<div class="p-book">Page book</div>`;

        const divBook = document.querySelector('.p-book') as HTMLElement;
        divBook.addEventListener('click', () => {
            alert('book');
        });
        console.log('dictionary');
    });
