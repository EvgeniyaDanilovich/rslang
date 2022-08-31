import './style.scss';
import { router } from './utils/router';
import { addEventListenerPopUp } from '../src/components/login-page/login-page';
import { getLocalStorage } from './utils/common';
import { LocalStorageKeys } from './enums/local-storage-keys';

require('./img/rs_school_js.svg');

// для проверки:

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');
export { token, refreshToken };

router.resolve();

// рендер поп-апа

// import { addEventListenerPopUp } from '../src/components/login-page/login-page';
addEventListenerPopUp();
