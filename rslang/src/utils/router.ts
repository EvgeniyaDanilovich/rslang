import Navigo from 'navigo';
// import { mainPageHtml } from '../components/main-page/main-page';
import { renderPageContent } from './ui';

export const router = new Navigo('/', { hash: true });

router
    .on('/main', () => {
        // renderPageContent(mainPageHtml);
    })
    .on('/book', () => {
        // renderPageContent(bookHtml);
        // bookHtml переменную притянем из соотв. компонента
    });
