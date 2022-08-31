export { path, contentDifficult, svgImage, svgRestart };

const path = 'https://rslangforrsschool.herokuapp.com';

const contentDifficult = `
<div class="game-content">
    <div class="top-panel"></div>
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
    <div class="bottom-panel"></div>
</div>
`;

const svgImage = `
<svg id="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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

const svgRestart = `
    <svg class="svg-icon" style="width: 40px; height: 40px;vertical-align: middle;fill: #ffffff;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M181.731 569.606l63.275-8.713A331.732 331.732 0 0 1 242.255 501l-63.809-2.835a395.86 395.86 0 0 0 3.285 71.441z" fill="#ffffff" /><path d="M569.205 906.945c52.791 0 104.019-10.346 152.263-30.752 46.581-19.703 88.409-47.902 124.321-83.814 35.912-35.912 64.111-77.74 83.814-124.322 20.405-48.244 30.752-99.471 30.752-152.263 0-52.791-10.346-104.019-30.752-152.263-19.703-46.581-47.902-88.409-83.814-124.321-35.912-35.912-77.74-64.111-124.321-83.814-48.244-20.405-99.472-30.752-152.263-30.752-101.406 0-197.547 38.644-270.712 108.813-72.938 69.952-115.572 163.96-120.047 264.706L242.255 501c7.783-175.224 151.397-312.483 326.95-312.483 180.462 0 327.278 146.817 327.278 327.278S749.667 843.074 569.205 843.074c-69.625 0-136.091-21.563-192.21-62.357L339.44 832.38c67.106 48.781 146.558 74.565 229.765 74.565z" fill="" /><path d="M222.367 629.329c8.173 0 16.346-3.118 22.581-9.354l117.233-117.232c12.472-12.471 12.472-32.692 0-45.164-12.471-12.472-32.692-12.472-45.163 0L199.786 574.811c-12.472 12.472-12.472 32.693 0 45.164 6.236 6.236 14.409 9.354 22.581 9.354z" fill="#ffffff" /><path d="M215.632 631.398c8.174 0 16.345-3.117 22.581-9.354 12.472-12.471 12.472-32.692 0-45.164L120.981 459.648c-12.47-12.471-32.691-12.471-45.163 0-12.472 12.472-12.472 32.692 0 45.164l117.233 117.232c6.234 6.235 14.409 9.354 22.581 9.354z" fill="#ffffff" /></svg>
`;
