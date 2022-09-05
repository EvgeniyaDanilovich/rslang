import './statistics-page.scss';
import { getNewToken, renderPageContent } from '../../utils/common';
import { getStatistic } from '../../api/user-statistic';
import { GetAggregatedWords } from '../../models/types';
import { getAllAggregatedWords, parseQuery } from '../../api/users-aggregated-words';

// const learnedWordQuery: GetAggregatedWords = {
//     userId: localStorage.getItem('id'),
//     filter: { $and: [{ 'userWord.difficulty': 'learned' }] },
// };
// console.log(learnedWordQuery);
// const studiedWords = await getAllAggregatedWords(parseQuery(learnedWordQuery));
// console.log(studiedWords);

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

async function getLernedWord() {
    const learnedWordQuery: GetAggregatedWords = {
        userId: localStorage.getItem('id'),
        filter: { $and: [{ 'userWord.difficulty': 'learned' }] },
    };
    const studiedWords = await getAllAggregatedWords(parseQuery(learnedWordQuery));
    console.log(studiedWords);
    let countLearnedWords;
    if (typeof studiedWords != 'number') {
        countLearnedWords = studiedWords[0].paginatedResults.length;
    } else {
        countLearnedWords = 0;
    }
    console.log(countLearnedWords);
    return countLearnedWords;
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
            let AudioCallCorrectAnswers: string | number = 0;
            let SprintCorrectAnswers: string | number = 0;
            let CorrectAnswers: string | number = 0;
            if (statistic.optional.AudioCallCorrectAnswers != 0) {
                AudioCallCorrectAnswers = `${Math.round(
                    (statistic.optional.AudioCallCorrectAnswers / statistic.optional.AudioCallAllWords) * 100
                )}`;
            } else {
                AudioCallCorrectAnswers = 0;
            }
            if (statistic.optional.SprintCorrectAnswers != 0) {
                SprintCorrectAnswers = `${Math.round(
                    (statistic.optional.SprintCorrectAnswers / statistic.optional.SprintAllWords) * 100
                )}`;
            } else {
                SprintCorrectAnswers = 0;
            }
            if (AudioCallCorrectAnswers == 0 && SprintCorrectAnswers == 0) {
                CorrectAnswers = 0;
            } else if (AudioCallCorrectAnswers == 0 && SprintCorrectAnswers != 0) {
                CorrectAnswers = SprintCorrectAnswers;
            } else if (AudioCallCorrectAnswers != 0 && SprintCorrectAnswers == 0) {
                CorrectAnswers = AudioCallCorrectAnswers;
            } else if (AudioCallCorrectAnswers != 0 && SprintCorrectAnswers != 0) {
                CorrectAnswers = (Number(AudioCallCorrectAnswers) + Number(SprintCorrectAnswers)) / 2;
            }
            renderPageContent(
                statisticsPage(
                    0,
                    AudioCallCorrectAnswers,
                    `${statistic.optional.longestSeriesAudioCall}`,
                    0,
                    SprintCorrectAnswers,
                    `${statistic.optional.longestSeriesSprint}`,
                    0,
                    await getLernedWord(),
                    CorrectAnswers
                )
            );
        }
    } else {
        renderPageContent(stopper);
    }
}
