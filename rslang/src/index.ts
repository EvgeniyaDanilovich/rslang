import './style.scss';
import { router } from './utils/router';
import { loginUser } from './api/sign-in'; //после проверки удалить

require('./img/rs_school_js.svg');

// для проверки:

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');
export { token, refreshToken };

// loginUser({ email: 'bob@mail.com', password: '12345678' }).then((el) => console.log(el));

router.resolve();

// рендер поп-апа

import { addEventListenerPopUp } from '../src/components/login-page/login-page';
addEventListenerPopUp();
