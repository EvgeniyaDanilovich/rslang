import './style.scss';
import { router } from './utils/router';
import { loginUser } from './api/sign-in'; //после проверки удалить

// require('./img/rs_school_js.svg');

// для проверки:

const path = 'https://rslangforrsschool.herokuapp.com';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmVjMGVmM2E1MWM2MDAxNjJjYWE2YyIsImlhdCI6MTY2MTI3NjczNSwiZXhwIjoxNjYxMjkxMTM1fQ.k7vOTaZ-TkqD8NxIOGg5uNhfOLhq_ScQwTOfBmRQReY';
const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZkZDZiMzZhZWM4MDAxNjMyNTkzYSIsInRva2VuSWQiOiJhMDNjYjY3Ny1iOGZjLTQ2YTItYTQ3YS04MTRiNDMwNWVjNDAiLCJpYXQiOjE2NjA5MzU2ODgsImV4cCI6MTY2MDk1MTg4OH0.x8PgsdZyJ-1i7DgDMWiyqqkfv5JCOWKxnuENck04gBM';

export { path, token, refreshToken };

// loginUser({ email: 'bob@mail.com', password: '12345678' }).then((el) => console.log(el));

router.resolve();
