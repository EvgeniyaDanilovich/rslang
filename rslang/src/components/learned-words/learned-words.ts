import { Word, UserWord } from '../../models/types';
import { createUserWord, getUserWord, updateUserWord } from '../../api/users-words';
// import { modeGame } from '../../components/audiocall-page/audiocall-page';

export async function addLearnedWords(words: Word[]): Promise<void> {
    const userId = localStorage.getItem('id');
    for (const el of words) {
        const wordId = el.id;
        const res = await getUserWord(userId, wordId);

        if (res === 404) {
            console.log('Слово еще не было создано, создаем');
            const opt: UserWord = {
                difficulty: 'progress',
                optional: { countTrueAnswer: 1 },
            };
            createUserWord(userId, wordId, opt);
        } else if (!(res === 404) && !('countTrueAnswer' in res.optional) && res.difficulty === 'hard') {
            console.log('Слово создано как hard, но при создании счетчик не присвоили, присваиваем счетчик = 1');
            const opt: UserWord = {
                difficulty: 'hard',
                optional: { countTrueAnswer: 1 },
            };
            updateUserWord(userId, wordId, opt);
        } else if (!(res === 404) && 'countTrueAnswer' in res.optional && res.difficulty === 'hard') {
            console.log('Слово создано как hard, есть счетчик');
            let currentCount = Number(res.optional.countTrueAnswer);
            currentCount++;
            if (currentCount >= 5) {
                console.log("Изучено! счетчик достиг 5, меняем слову 'hard' на 'learned'");
                const opt: UserWord = {
                    difficulty: 'learned',
                    optional: { countTrueAnswer: currentCount },
                };
                updateUserWord(userId, wordId, opt);
            } else {
                console.log('Счетчик еще не достиг 5, увеличиваем значение счетчика на 1');
                const opt: UserWord = {
                    difficulty: 'hard',
                    optional: { countTrueAnswer: currentCount },
                };
                updateUserWord(userId, wordId, opt);
            }
        } else if (!(res === 404) && 'countTrueAnswer' in res.optional && res.difficulty === 'progress') {
            console.log('Состояние слова уже progress, а значит уже есть счетчик:');
            let currentCount = Number(res.optional.countTrueAnswer);
            currentCount++;
            if (currentCount >= 3) {
                console.log('изучено! Счетчик достиг 3, меняем слову "progress" на "learned"');
                const opt: UserWord = {
                    difficulty: 'learned',
                    optional: { countTrueAnswer: currentCount },
                };
                updateUserWord(userId, wordId, opt);
            } else {
                console.log('Счетчик еще не достиг 3, увеличиваем значение счетчика на 1');
                const opt: UserWord = {
                    difficulty: 'progress',
                    optional: { countTrueAnswer: currentCount },
                };
                updateUserWord(userId, wordId, opt);
            }
        }
    }
}

export async function removeLearnedWords(words: Word[]): Promise<void> {
    const userId = localStorage.getItem('id');
    for (const el of words) {
        const wordId = el.id;
        const res = await getUserWord(userId, wordId);
        const opt: UserWord = {
            difficulty: 'progress',
            optional: { countTrueAnswer: 1 },
        };
        if (res === 404) {
            console.log('слово еще не было создано, создаем');
            createUserWord(userId, wordId, opt);
        } else if (!(res === 404) && res.difficulty === 'learned') {
            console.log('слово является изученным, значит обнуляем ему счетчик и статус');
            updateUserWord(userId, wordId, opt);
        }
    }
}

export async function addLearnedWordByButton(userId: string, wordId: string): Promise<void> {
    console.log('добавляем в изученные с кнопки');
    const res = await getUserWord(userId, wordId);
    const opt: UserWord = {
        difficulty: 'learned',
        optional: { countTrueAnswer: 3 },
    };
    if (res === 404) {
        console.log('слово еще не было создано, создаем как изученное');
        createUserWord(userId, wordId, opt);
    } else {
        console.log('слово было создано, обновляем значение как изученное');
        updateUserWord(userId, wordId, opt);
    }
}
