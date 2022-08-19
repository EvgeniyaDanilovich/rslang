import './style.scss';
import { router } from './utils/router';
import {
    getChunkWords,
    getWordWithAssetsById,
    loginUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getNewUserToken,
    getAllUserWords,
    createUserWord,
    getUserWord,
    updateUserWord,
    deleteUserWord,
    getAllAggregatedWords,
    getAggregatedWordById,
    getStatistic,
    upsertStatistic,
    getSettings,
    upsertSettings,
} from './api/api';

router.resolve();

getChunkWords(0, 1).then((el) => console.log(el));
// getWordWithAssetsById('5e9f5ee35eb9e72bc21af4bd').then((el) => console.log(el));
// loginUser({ email: 'johna@gmail.com', password: '12345678' }).then((el) => console.log(el));
// createUser({ name: 'johna', email: 'johna@gmail.com', password: '12345678' }).then((el) => console.log(el));
// getUser('62fed4763a51c600162caa77').then((el) => console.log(el));
// updateUser('62fed4763a51c600162caa77', { email: 'qqq@mail.com', password: '12345678' }).then((el) => console.log(el));
// deleteUser('62fed4763a51c600162caa77').then((el) => console.log(el));
// getNewUserToken('62ffdd6b36aec8001632593a').then(el => console.log(el));
// getAllUserWords('62ffdd6b36aec8001632593a').then(el => console.log(el));
// createUserWord('62ffdd6b36aec8001632593a', '5e9f5ee35eb9e72bc21af4ba', {
//     difficulty: 'weak',
//     optional: { testFieldString: 'test', testFieldBoolean: true },
// });
// getUserWord('62ffdd6b36aec8001632593a', '5e9f5ee35eb9e72bc21af4c6').then((el) => console.log(el));
// updateUserWord('62ffdd6b36aec8001632593a', '5e9f5ee35eb9e72bc21af4c6', {
//     difficulty: 'string',
//     optional: {},
// }).then((el) => console.log(el));
// deleteUserWord("62fed4763a51c600162caa77", "5e9f5ee35eb9e72bc21af4bd").then(el => console.log(el))
// getAggregatedWordById('62fed4763a51c600162caa77', '5e9f5ee35eb9e72bc21af4bf').then((el) => console.log(el));
// getStatistic("62fed4763a51c600162caa77").then(el => console.log(el))
//   upsertStatistic("62fed4763a51c600162caa77", { "learnedWords": 0, "optional": {} }).then(el => console.log(el))

// getSettings("62fed4763a51c600162caa77").then(el => console.log(el))
// будет работать только после вызова upsertSettings

//   upsertSettings("62fed4763a51c600162caa77", { "wordsPerDay": 1, "optional": {} }).then(el => console.log(el))
