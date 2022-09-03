import './main-page.scss';
require('../../img/1.svg');
require('../../img/2.svg');
require('../../img/3.svg');
require('../../img/4.svg');
require('../../img/5.svg');
require('../../img/6.svg');
require('../../img/7.svg');
require('../../img/8.svg');
require('../../img/9.svg');
require('../../img/10.svg');
require('../../img/igor.jpeg');
require('../../img/eugenia.jpg');
require('../../img/darya.jpg');
require('../../img/textbook.jpg');
require('../../img/audiocall.jpg');
require('../../img/sprint.jpg');
require('../../img/statistic.jpg');

export const mainPageHtml = `
<div class="welcome">
    <div class="welcome-container">
        <div class="welcome-header">
            <div class="welcome-line-left"></div>
            <p class="welcome-title">WELCOME TO RS-LANG!</p>
            <div class="welcome-line-right"></div>
        </div>
        <p class="welcome-subtitle">
            RS Lang is an application for learning foreign words, including an electronic textbook with a database of words to learn, mini-games for repeating them, a statistics page for tracking individual progress. Use the fast and efficient way to learn
            here are the best techniques that will help you learn a language. Start learning English with RS Lang now!
        </p>
    </div>
</div>
<div class="advantages">
    <div class="advantages-container">
        <div class="advantages-header">ADVANTAGES:</div>
        <div class="advantages-block">
            <div class="advantages-card">
                <div class="advantages-card-img"><span class="material-symbols-outlined">stadia_controller</span></div>
                <div class="advantages-card-text">It's fun. Play and learn words. It is very exciting!</div>
            </div>
            <div class="advantages-card">
                <div class="advantages-card-img"><span class="material-symbols-outlined">credit_card_off</span></div>
                <div class="advantages-card-text">It's free. We strive to make language learning accessible</div>
            </div>
            <div class="advantages-card">
                <div class="advantages-card-img"><span class="material-symbols-outlined">schedule</span></div>
                <div class="advantages-card-text">It's comfortable. Just 15 minutes a day is enough to learn new words</div>
            </div>
            <div class="advantages-card">
                <div class="advantages-card-img"><span class="material-symbols-outlined">insights</span></div>
                <div class="advantages-card-text">It's informative. Statistics are kept on the study of words</div>
            </div>
            <div class="advantages-card">
                <div class="advantages-card-img"><span class="material-symbols-outlined">menu_book</span></div>
                <div class="advantages-card-text">It's quality. Provides complete information with examples</div>
            </div>
            <div class="advantages-card">
                <div class="advantages-card-img"><span class="material-symbols-outlined">family_restroom</span></div>
                <div class="advantages-card-text">It's easy. Even a child will understand</div>
            </div>
        </div>
    </div>
</div>
<div class="info">
    <div class="info-container">
        <p class="info-subtitle">
        We have ready-made sets of words with different levels of difficulty. To start practicing the set of words you are interested in, choose a game and start learning. After the game, the words will be in your dictionary. The dictionary has statistics on learning words. Also on the site there are statistics for a short period and for the entire time of training.
        </p>
    </div>
</div>
<div class="opportunities">
   <div class="opportunities-container">
        <div class="opportunities-header">OPPORTUNITIES:</div>
        <div class="opportunities-block">
            <div class="opportunities-card">
                <img class="opportunities-img" src="img/textbook.jpg" alt="">
                <div class="opportunities-card-text">
                    <p class="bold">TEXTBOOK</p>
                    <p>The electronic textbook consists of six sections. Each section has 30 pages of 20 words. The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.</p>
                </div>
            </div>
            <div class="opportunities-card">
                <div class="opportunities-card-text">
                    <p class="bold">AUDIOCALL</p>
                    <p>Audiocall is a workout that improves listening comprehension. You listen to a word and choose an answer from the suggested words. You can also choose the difficulty level.</p>
                </div>
                <img class="opportunities-img" src="img/audiocall.jpg" alt="">
            </div>
            <div class="opportunities-card">
                <img class="opportunities-img" src="img/sprint.jpg" alt="">
                <div class="opportunities-card-text">
                    <p class="bold">SPRINT</p>
                    <p>The electronic textbook consists of six sections. Each section has 30 pages of 20 words. The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.</p>
                </div>
            </div>
            <div class="opportunities-card">
                <div class="opportunities-card-text">
                    <p class="bold">STATISTIC</p>
                    <p>Audiocall is a workout that improves listening comprehension. You listen to a word and choose an answer from the suggested words. You can also choose the difficulty level.</p>
                </div>
                <img class="opportunities-img" src="img/statistic.jpg" alt="">
            </div>
        </div>
   </div>
</div>
<div class="about-us">
    <div class="about-us-container">
        <div class="about-us-header">
            <div class="about-us-line-left"></div>
            <p class="about-us-title">ABOUT OUR TEAM:</p>
            <div class="about-us-line-right"></div>
        </div>
        <div class="about-us-team">
            <div class="about-us-card">
                <img class="about-us-img" src="img/igor.jpeg" alt="">
                <div class="about-us-card-text">
                    <p class="about-us-name">Igor</p>
                    <p>Developed the AudioCall game, participated in the development of the application design, participated in the setup of sending data to the server and receiving data from the server, described the interfaces.</p>
                </div>
            </div>
            <div class="about-us-card">
                <img class="about-us-img" src="img/eugenia.jpg" alt="">
                <div class="about-us-card-text">
                    <p class="about-us-name">Eugenia</p>
                    <p>Developed a Sprint game, configured routing, developed textbook pages and word cards, developed a difficult words page, participated in the development of the application design, set up a github for the work of the team.</p>
                </div>
            </div>
            <div class="about-us-card">
                <img class="about-us-img" src="img/darya.jpg" alt="">
                <div class="about-us-card-text">
                    <p class="about-us-name">Darya</p>
                    <p>Created authorization and registration pages, set up a backend, created a statistics page and the main page, participated in setting up sending data to the server and receiving data from the server, participated in the development of the application design</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;
