import './statistics-page.scss';
import { renderPageContent } from '../../utils/common';

function statisticsPage(
    audiocallNewWords: number,
    audiocallAnswers: number,
    audiocallLongestSeries: number,
    statisticNewWords: number,
    statisticAnswers: number,
    statisticLongestSeries: number,
    AllNewWords: number,
    studiedWords: number,
    AllAnswers: number
) {
    const statisticsPage = `
    <h1 class="statistics-title">Daily statistics</h1>
    <div class="statistic-container">
        <div class="statistic-items">
            <h2 class="game-title">Audiocall game</h2>
            <div>New words: ${audiocallNewWords}</div>
            <div>% of correct answers: ${audiocallAnswers}%</div>
            <div>The longest series of correct answers: ${audiocallLongestSeries}</div>
        </div>
        <div class="statistic-items">
            <h2 class="game-title">Sprint game</h2>
            <div>New words: ${statisticNewWords}</div>
            <div>% of correct answers: ${statisticAnswers}%</div>
            <div>The longest series of correct answers: ${statisticLongestSeries}</div>
        </div>
        <div class="statistic-items">
            <h2 class="game-title">Words</h2>
            <div>New words: ${AllNewWords}</div>
            <div>Studied words: ${studiedWords}</div>
            <div>% of correct answers: ${AllAnswers}%</div>
        </div>
    </div>
`;
    return statisticsPage;
}

export function renderStatisticsPage() {
    const stopper = `
    <h1 class="statistics-title">Please log in</h1>
    `;
    if (localStorage.getItem('id')) {
        renderPageContent(statisticsPage(1, 2, 3, 4, 5, 6, 7, 8, 9));
    } else {
        renderPageContent(stopper);
    }
}
