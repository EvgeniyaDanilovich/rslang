import { token } from '../index';
import { path } from '../utils/constants';

interface UserStatistic {
    learnedWords: number;
    optional?: {
        longestSeriesAudioCall?: number;
        longestSeriesSprint?: number;
        AudioCallAllWords?: number;
        SprintAllWords?: number;
        AudioCallCorrectAnswers?: number;
        SprintCorrectAnswers?: number;
    };
}

export async function getStatistic(userId: string) {
    const rawResponse = await fetch(`${path}/users/${userId}/statistics`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    const content = rawResponse.status;
    if (content == 200) {
        return rawResponse.json();
    } else {
        return content;
    }
}

export async function upsertStatistic(userId: string, param: object) {
    const rawResponse = await fetch(`${path}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
    });
    const content = rawResponse.status;
    if (content == 200) {
        return rawResponse.json();
    } else {
        return content;
    }
}
