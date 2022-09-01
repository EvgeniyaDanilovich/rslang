import Navigo from 'navigo';
import { allBookPage } from '../components/book-page/book';
import { mainPageHtml } from '../components/main-page/main-page';
import {
    renderAudiocallPageFromMenu,
    renderAudiocallPageFromTextbook,
} from '../components/audiocall-page/audiocall-page';
import { renderStatisticsPage } from '../components/statistics-page/statistics-page';
import { renderPageContent } from './common';
import { use } from '../components/difficult-word-page/difficult-word-page';
import { renderFooter, deleteFooter } from '../components/footer/footer';
import { initSprintPage, initSprintPageFromBook } from '../components/sprint-page/sprint-page';

export const router = new Navigo('/', { hash: true });

router
    .on('', () => {
        renderPageContent(mainPageHtml);
        renderFooter();
    })
    .on('/main', () => {
        renderPageContent(mainPageHtml);
        renderFooter();
    })
    .on('/book', () => {
        allBookPage();
        renderFooter();
    })
    .on('/audiocall-from-menu', () => {
        renderAudiocallPageFromMenu();
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
    .on('/audiocall-from-textbook', () => {
        renderAudiocallPageFromTextbook();
        deleteFooter();
    })
    .on('/sprint', () => {
        initSprintPage();
        deleteFooter();
    })
    .on('/sprint-book', () => {
        initSprintPageFromBook();
        deleteFooter();
    });
