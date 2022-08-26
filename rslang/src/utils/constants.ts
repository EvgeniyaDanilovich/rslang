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

// const svgImage = `
//     <?xml version="1.0" encoding="UTF-8" standalone="no"?>
//     <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="60" height="60" viewBox="0 0 75 75">
//     <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
//     style="stroke:#111;stroke-width:5;stroke-linejoin:round;fill:#111;"
//     />
//     <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#111;stroke-width:5;stroke-linecap:round"/>
//     </svg>
// `;

const svgImage = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <style>
                        .cls-1 {
                            fill: #101820;
                        }
                    </style>
                </defs>
                <title />
                <g data-name="Layer 33" id="Layer_33">
                    <path class="cls-1"
                        d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z" />
                    <path class="cls-1"
                        d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z" />
                    <path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z" />
                    <path class="cls-1"
                        d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z" />
                </g>
            </svg>
`;
