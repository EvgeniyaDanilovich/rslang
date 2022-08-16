import './style.scss';
import { switchToStateFromURLHash } from './components/app/routing';

window.location.hash = 'main';
window.onhashchange = switchToStateFromURLHash;
switchToStateFromURLHash();

console.log('Hello');
