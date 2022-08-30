import Navigo from 'navigo';
import { allBookPage } from '../components/book-page/book';
import { mainPageHtml } from '../components/main-page/main-page';
import { renderAudiocallPage, renderAudiocallPageWithParams } from '../components/audiocall-page/audiocall-page';
import { renderStatisticsPage } from '../components/statistics-page/statistics-page';
import { renderPageContent } from './common';
import { use } from '../components/difficult-word-page/difficult-word-page';
import { initSprintPage } from '../components/sprint-page/sprint-page';

export const router = new Navigo('/', { hash: true });

router
    .on('/main', () => {
        renderPageContent(mainPageHtml);
    })
    .on('/book', () => {
        allBookPage();
    })
    .on('/audiocall', () => {
        renderAudiocallPage();
    })
    .on('/difficult-words', () => {
        renderPageContent('Nothing');
        use();
    })
    .on('/statistics', () => {
        renderStatisticsPage();
    })
    .on('/audiocall-with-params', () => {
        renderAudiocallPageWithParams();
    })
    .on('/sprint', () => {
        initSprintPage();
    });
