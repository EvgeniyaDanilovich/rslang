import './login-page.scss';
import { loginUser } from '../../api/sign-in';
import { User } from '../../models/types';
// import { Auth } from '../../models/types';
import { addToLocalStorage } from '../../utils/localstorage';
import { createUser } from '../../api/users';

function renderLoginPopUp(): void {
    const popUp = document.createElement('div');
    popUp.classList.add('pop-up-wrapper');
    popUp.innerHTML = `
            <h2>Log In</h2>
            <div class="inputs-container">
                <input type="text" class="email-input" placeholder="E-mail">
                <input type="text" class="password-input" placeholder="Password">
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

async function signIn(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('sign-in-btn')) {
        const inputName = document.querySelector('.name-input') as HTMLInputElement;
        const inputEmail = document.querySelector('.email-input') as HTMLInputElement;
        const inputPassword = document.querySelector('.password-input') as HTMLInputElement;
        //add to localstorage dataUser
        const dataUser = {} as User;
        if (document.querySelector('.name-input') && inputName.value !== null) {
            dataUser.name = inputName.value;
        } else {
            dataUser.name = '';
        }
        dataUser.email = inputEmail.value;
        dataUser.password = inputPassword.value;
        //create user
        if (document.querySelector('.name-input')) {
            const user = await createUser(dataUser);
            console.log(user);
            // addToLocalStorage('id', user.id);
            const logIn = await loginUser(dataUser);
            addToLocalStorage('token', logIn.token);
            addToLocalStorage('id', logIn.userId);
            addToLocalStorage('refreshToken', logIn.refreshToken);
        } else {
            const logIn = await loginUser(dataUser);
            addToLocalStorage('token', logIn.token);
            addToLocalStorage('id', logIn.userId);
            addToLocalStorage('refreshToken', logIn.refreshToken);
        }
    }
}

export function addEventListenerPopUp() {
    const loginButton = document.querySelector('.authorization-btn') as HTMLButtonElement;
    loginButton.addEventListener('click', renderLoginPopUp);
    document.addEventListener('click', closePopUp);
    document.addEventListener('click', renderRegisterPopUp);
    document.addEventListener('click', signIn);
}
