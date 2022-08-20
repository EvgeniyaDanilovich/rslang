import './main-page.scss';
// require('./img/7.svg');
// require('./img/6.svg');
// require('./img/igor.jpeg');
// require('./img/eugenia.jpeg');
// require('./img/darya.jpeg');

export const mainPageHtml = `
<div class="description">
    <p class="description-title">RS Lang - the effective application<br>for learning English!</p>
    <img src="img/7.svg" alt="command" class="description-image">
</div>
<div class="about-rslang">
    <div class="opportunities">
        <h2>RS Lang Features</h2>
        <ul class="case">
            <li>Did basic project settings</li>
            <li>Did basic project settings</li>
            <li>Did basic project settings</li>
        </ul>
    </div>
    <img src="img/6.svg" alt="pupil" class="about-rslang-image">
    <div class="advantages">
        <h2>Advantages of RS Lang</h2>
        <ul class="case">
            <li>Did basic project settings</li>
            <li>Did basic project settings</li>
            <li>Did basic project settings</li>
        </ul>
    </div>
</div>
<div class="about-us">
    <h2>About us</h2>
    <div class="about-developers">
        <div class="developer">
            <img class="developer-img" src="img/igor.jpeg" alt="Igor">
            <div class="developer-description">
                <p class="name">Igor Koviatsinets</p>
                <p class="developer-contribution">Front-end Developer</p>
                <p class="contribution">Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend</p>
                <a class="developer-link" href="https://github.com/koviatsinets">GitHub</a>
            </div>
        </div>
        <div class="developer">
            <img class="developer-img" src="img/eugenia.jpeg" alt="Eugenia">
            <div class="developer-description">
                <p class="name">Evgeniya Danilovich</p>
                <p class="developer-contribution">Front-end Developer</p>
                <p class="contribution">Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend</p>
                <a class="developer-link" href="https://github.com/EvgeniyaDanilovich">GitHub</a>
            </div>
        </div>
        <div class="developer">
            <img class="developer-img" src="img/darya.jpeg" alt="Darya">
            <div class="developer-description">
                <p class="name">Darya Kazharnovich</p>
                <p class="developer-contribution">Front-end Developer</p>
                <p class="contribution">Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend</p>
                <a class="developer-link" href="https://github.com/Darya-Kazharnovich">GitHub</a>
            </div>
        </div>
    </div>
</div>
`;
