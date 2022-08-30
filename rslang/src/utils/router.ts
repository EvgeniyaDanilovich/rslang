import Navigo from 'navigo';
import { allBookPage } from '../components/book-page/book';
import { mainPageHtml } from '../components/main-page/main-page';
import { renderAudiocallPage, renderAudiocallPageWithParams } from '../components/audiocall-page/audiocall-page';
import { renderStatisticsPage } from '../components/statistics-page/statistics-page';
import { renderPageContent } from './common';
import { use } from '../components/difficult-word-page/difficult-word-page';
import { renderFooter, deleteFooter } from '../components/footer/footer';

export const router = new Navigo('/', { hash: true });

router
    .on('/main', () => {
        renderPageContent(mainPageHtml);
        renderFooter();
    })
    .on('/book', () => {
        allBookPage();
        renderFooter();
    })
    .on('/audiocall', () => {
        renderAudiocallPage();
        deleteFooter();
    })
    .on('/difficult-words', () => {
        renderPageContent('Nothing');
        use();
        renderFooter();
    })
    .on('/statistics', () => {
        renderStatisticsPage();
        renderFooter();
    })
    .on('/audiocall-with-params', () => {
        renderAudiocallPageWithParams();
        deleteFooter();
    });
