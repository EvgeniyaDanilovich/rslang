import './statistics-page.scss';
import { getNewToken, renderPageContent } from '../../utils/common';
import { getStatistic } from '../../api/user-statistic';

function statisticsPage(
    audiocallNewWords: number | string,
    audiocallAnswers: number | string,
    audiocallLongestSeries: number | string,
    sprintNewWords: number | string,
    sprintAnswers: number | string,
    sprintLongestSeries: number | string,
    AllNewWords: number | string,
    studiedWords: number | string,
    AllAnswers: number | string
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
            <div>New words: ${sprintNewWords}</div>
            <div>% of correct answers: ${sprintAnswers}%</div>
            <div>The longest series of correct answers: ${sprintLongestSeries}</div>
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

export async function renderStatisticsPage() {
    const stopper = `
    <h1 class="statistics-title">Please log in</h1>
    `;
    if (localStorage.getItem('id')) {
        const statistic = await getStatistic(`${localStorage.getItem('id')}`);

        if (statistic == 401) await getNewToken();
        if (statistic == 404) renderPageContent(statisticsPage(0, 0, 0, 0, 0, 0, 0, 0, 0));
        if (typeof statistic != 'number') {
            renderPageContent(
                statisticsPage(
                    0,
                    `${Math.round(
                        (statistic.optional.AudioCallCorrectAnswers / statistic.optional.AudioCallAllWords) * 100
                    )}`,
                    `${statistic.optional.longestSeriesAudioCall}`,
                    0,
                    `${Math.round(
                        (statistic.optional.SprintCorrectAnswers / statistic.optional.SprintAllWords) * 100
                    )}`,
                    `${statistic.optional.longestSeriesSprint}`,
                    0,
                    0,
                    `${
                        Math.round(
                            (statistic.optional.AudioCallCorrectAnswers / statistic.optional.AudioCallAllWords) * 100
                        ) +
                        Math.round(
                            (statistic.optional.SprintCorrectAnswers / statistic.optional.SprintAllWords) * 100
                        ) /
                            2
                    }`
                )
            );
        }
    } else {
        renderPageContent(stopper);
    }
}
