export { path, contentDifficult, svgImage };

const path = 'https://rslangforrsschool.herokuapp.com';

const contentDifficult = `
<div class="game-content">
    <div class="difficult-window">
        <p class="select-level">Select the Level:</p>
        <div class="container-level">
            <button class="button-level" data-id="0">1</button>
            <button class="button-level" data-id="1">2</button>
            <button class="button-level" data-id="2">3</button>
            <button class="button-level" data-id="3">4</button>
            <button class="button-level" data-id="4">5</button>
            <button class="button-level" data-id="5">6</button>
        </div>
    </div>
</div>
`;

const svgImage = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="60" height="60" viewBox="0 0 75 75">
    <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
    style="stroke:#111;stroke-width:5;stroke-linejoin:round;fill:#111;"
    />
    <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#111;stroke-width:5;stroke-linecap:round"/>
    </svg>
`;