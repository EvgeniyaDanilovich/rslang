import './login-page.scss';
import { loginUser } from '../../api/sign-in';
import { Auth, User } from '../../models/types';
import { addToLocalStorage } from '../../utils/common';
import { createUser } from '../../api/users';

function renderLoginPopUp(): void {
    const popUp = document.createElement('div');
    popUp.classList.add('pop-up-wrapper');
    popUp.innerHTML = `
            <h2>Log In</h2>
            <div class="inputs-container">
                <input type="text" class="email-input" placeholder="E-mail">
                <input type="text" minlength="8" class="password-input" placeholder="Password">
            </div>
            <div class="log-button">
                <button class="sign-in-btn">Sign In</button>
                <button class="register-btn">Register</button>
            </div>
    `;
    const main = document.querySelector('.footer-container');
    if (main !== null) main.insertAdjacentElement('afterend', popUp);
    document.body.style.overflow = 'hidden';
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    if (main !== null) main.insertAdjacentElement('afterend', overlay);
}

function closePopUp(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
        const popUp = document.querySelector('.pop-up-wrapper');
        const overlay = document.querySelector('.overlay');
        if (popUp !== null) popUp.remove();
        if (overlay !== null) overlay.remove();
        document.body.style.overflow = 'visible';
    }
}

function renderRegisterPopUp(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('register-btn')) {
        const inputsContainer = document.querySelector('.inputs-container');
        const inputForName = document.createElement('input');
        inputForName.placeholder = 'Name';
        inputForName.classList.add('name-input');
        if (inputsContainer !== null) inputsContainer.insertAdjacentElement('afterbegin', inputForName);
        const registerButton = document.querySelector('.register-btn');
        if (registerButton !== null) registerButton.remove();
    }
}

function addToLocalStorageKeys(data: Auth) {
    addToLocalStorage('token', data.token);
    addToLocalStorage('id', data.userId);
    addToLocalStorage('refreshToken', data.refreshToken);
}

function signInResult(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('.sign-in-btn')) {
        const idInLocalStorage = localStorage.getItem('id');
        if (idInLocalStorage !== null) {
            const popUpWrapper = document.querySelector('.pop-up-wrapper');
            if (popUpWrapper !== null)
                popUpWrapper.innerHTML = `
            <h2>Hi!</h2>
            <h3>Have a good learning experience!</h3>
            `;
        }
    }
}

function renderLogOut(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('.authorization-btn') && localStorage.getItem('id') !== null) {
        const popUpWrapper = document.querySelector('.pop-up-wrapper');
        if (popUpWrapper !== null) {
            popUpWrapper.innerHTML = `<button class="log-out-button">Log Out</button>`;
        }
    }
}

function LogOut(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('.log-out-button')) {
        localStorage.clear();
        const popUpWrapper = document.querySelector('.pop-up-wrapper');
        if (popUpWrapper !== null) {
            popUpWrapper.innerHTML = `
                <h2>Bye!</h2>
                <h3>Сome back to us!</h3>
                `;
        }
    }
}

function warning() {
    const warning = `<div class="warning">Please fill in all the required fields</div>`;
    const warningHTML = document.querySelector('.warning') as HTMLElement;
    if (warningHTML !== null) warningHTML.remove();
    (document.querySelector('.sign-in-btn') as HTMLElement).insertAdjacentHTML('beforebegin', warning);
}

async function signIn(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('.sign-in-btn')) {
        const inputName = document.querySelector('.name-input') as HTMLInputElement;
        const inputEmail = document.querySelector('.email-input') as HTMLInputElement;
        const inputPassword = document.querySelector('.password-input') as HTMLInputElement;
        const dataUser = {} as User;
        if (document.querySelector('.name-input') && inputName.value !== null) {
            dataUser.name = inputName.value;
        } else {
            dataUser.name = '';
        }
        dataUser.email = inputEmail.value;
        dataUser.password = inputPassword.value;
        const patternLogin = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (document.querySelector('.name-input')) {
            if (
                inputEmail.value === '' ||
                inputPassword.value === '' ||
                inputName.value === '' ||
                inputPassword.value.length < 8 ||
                patternLogin.test(inputEmail.value) === false
            ) {
                warning();
            } else {
                const user = await createUser(dataUser);
                const logIn = await loginUser(dataUser);
                addToLocalStorageKeys(logIn);
            }
        } else {
            if (
                inputEmail.value === '' ||
                inputPassword.value === '' ||
                inputPassword.value.length < 8 ||
                patternLogin.test(inputEmail.value) === false
            ) {
                warning();
            } else {
                const logIn = await loginUser(dataUser);
                console.log(logIn);
                addToLocalStorageKeys(logIn);
            }
        }
        signInResult(event);
    }
}

export function addEventListenerPopUp() {
    document.addEventListener('click', renderLogOut);
    document.addEventListener('click', LogOut);
    const loginButton = document.querySelector('.authorization-btn') as HTMLButtonElement;
    loginButton.addEventListener('click', renderLoginPopUp);
    document.addEventListener('click', closePopUp);
    document.addEventListener('click', renderRegisterPopUp);
    document.addEventListener('click', signIn);
}
