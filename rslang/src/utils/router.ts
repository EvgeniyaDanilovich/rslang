import Navigo from 'navigo';
import { renderBookPage } from '../components/book-page/book';
import { mainPageHtml } from '../components/main-page/main-page';
import { renderAudiocallPage } from '../components/audiocall-page/audiocall-page';
import { renderPageContent } from './ui';

export const router = new Navigo('/', { hash: true });

router
    .on('/main', () => {
        renderPageContent(mainPageHtml);
    })
    .on('/book', () => {
        renderBookPage();
    })
    .on('/audiocall', () => {
        renderAudiocallPage();
    });
