export function switchToStateFromURLHash() {
    (document.querySelector('#login') as HTMLElement).addEventListener('click', switchToLogin);
    (document.querySelector('#book') as HTMLElement).addEventListener('click', switchToBook);
    (document.querySelector('#audiocall') as HTMLElement).addEventListener('click', switchToAudiocall);
    (document.querySelector('#sprint') as HTMLElement).addEventListener('click', switchToSprint);
    (document.querySelector('#statistic') as HTMLElement).addEventListener('click', switchToStatistic);
    (document.querySelector('#main') as HTMLElement).addEventListener('click', switchToMain);

    let SPAState = { pagename: '' };
    const contentBlock = document.querySelector('.content') as HTMLElement;
    const URLHash = window.location.hash;
    const stateStr = URLHash.substring(1);
    if (stateStr != '') {
        const parts = stateStr.split('_');
        SPAState = { pagename: parts[0] };
    } else SPAState = { pagename: 'main' };
    switch (SPAState.pagename) {
        case 'main':
            contentBlock.innerHTML = `<div class="main">Main</div>`;
            break;
        case 'login':
            contentBlock.innerHTML = `<div class="login">Login</div>`;
            break;
        case 'book':
            contentBlock.innerHTML = `<div class="book">Book</div>`;
            break;
        case 'audiocall':
            contentBlock.innerHTML = `<div class="audiocall">Audiocall</div>`;
            break;
        case 'sprint':
            contentBlock.innerHTML = `<div class="sprint">Sprint</div>`;
            break;
        case 'statistic':
            contentBlock.innerHTML = `<div class="statistic">Statistic</div>`;
            break;
    }
}

function switchToState(newState: { pagename: string }) {
    const stateStr = newState.pagename;
    location.hash = stateStr;
}

function switchToMain() {
    switchToState({ pagename: 'main' });
}

function switchToLogin() {
    switchToState({ pagename: 'login' });
}

function switchToBook() {
    switchToState({ pagename: 'book' });
}

function switchToAudiocall() {
    switchToState({ pagename: 'audiocall' });
}

function switchToSprint() {
    switchToState({ pagename: 'sprint' });
}

function switchToStatistic() {
    switchToState({ pagename: 'statistic' });
}
