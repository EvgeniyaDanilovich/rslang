export interface Word {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}

export interface UserWord {
    difficulty: string;
    optional: object;
}

export interface UserWords {
    id: string;
    difficulty: string;
    optional: Word;
}

export interface Statistic {
    learnedWords: number;
    optional: object;
}

export interface Setting {
    wordsPerDay: number;
    optional: object;
}

export interface User {
    name?: string;
    email: string;
    password: string;
}

export interface Auth {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

export interface audiocallWord {
    word: Word;
    variants: Word[];
}
// <<<<<<< HEAD
