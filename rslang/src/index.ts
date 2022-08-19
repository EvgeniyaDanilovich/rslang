import './style.scss';
import { router } from './utils/router';

import { getChunkWords, getWordWithAssetsById } from './api/words';
import { createUser, getUser, updateUser, deleteUser, getNewUserToken } from './api/users';
import { loginUser } from './api/sign-in';
import { getAllUserWords, createUserWord, getUserWord, updateUserWord, deleteUserWord } from './api/users-words';
import { getAllAggregatedWords, getAggregatedWordById } from './api/users-aggregated-words';
import { getStatistic, upsertStatistic } from './api/user-statistic';
import { getSettings, upsertSettings } from './api/user-settings';

router.resolve();

// для проверки:
const path = 'https://rslangforrsschool.herokuapp.com';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZkZDZiMzZhZWM4MDAxNjMyNTkzYSIsImlhdCI6MTY2MDkzNTY4OCwiZXhwIjoxNjYwOTUwMDg4fQ.CXP0nHQjdbJWijRbK_mDwA-Y7jJi2QlXxkfU8erlmBk';
const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZkZDZiMzZhZWM4MDAxNjMyNTkzYSIsInRva2VuSWQiOiJhMDNjYjY3Ny1iOGZjLTQ2YTItYTQ3YS04MTRiNDMwNWVjNDAiLCJpYXQiOjE2NjA5MzU2ODgsImV4cCI6MTY2MDk1MTg4OH0.x8PgsdZyJ-1i7DgDMWiyqqkfv5JCOWKxnuENck04gBM';

export { path, token, refreshToken };
