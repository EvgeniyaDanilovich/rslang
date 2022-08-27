import Navigo from 'navigo';
import { listenBookPage, renderBookPage } from '../components/book-page/book';
import { mainPageHtml } from '../components/main-page/main-page';
import { renderAudiocallPage } from '../components/audiocall-page/audiocall-page';
import { renderStatisticsPage } from '../components/statistics-page/statistics-page';
import { renderPageContent } from './common';

export const router = new Navigo('/', { hash: true });

router
    .on('/main', () => {
        renderPageContent(mainPageHtml);
    })
    .on('/book', () => {
        renderBookPage();
        listenBookPage();
    })
    .on('/audiocall', () => {
        renderAudiocallPage();
    })
    .on('/statistics', () => {
        renderStatisticsPage();
    })
    .on('/audiocall-with-params', () => {
        renderAudiocallPageWithParams();
    });
