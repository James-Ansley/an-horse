const horse = document.createElement("pre");
horse.innerHTML = `\
            .''
  ._,-､___,' (\`\\
 //(        ( \`'
'/ )\\ )､__, )
' <' \`\\ ._/\`\\
   \`   \\     \\\
`
horse.id = "horse";
horse.style.cssText = `
    font-size: 1rem;
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
    text-align: left;
    pointer-events: none;
    user-select: none;
`;

document.body.appendChild(horse);

const speed = 0.5;
const maxRotation = 3;

const horseWidth = horse.clientWidth;
const horseHeight = horse.clientHeight;

let x = Math.floor(Math.random() * (document.body.clientWidth - horseWidth));
let y = Math.floor(Math.random() * (document.body.clientHeight - horseHeight));
let dirX = Math.floor(Math.random() * 2) * 2 - 1;
let dirY = Math.floor(Math.random() * 2) * 2 - 1;

let rotation = 0;
let dirRot = 1;

function animate() {
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    if (y + horseHeight >= screenHeight) {
        dirY = -1
    } else if (y < 0) {
        dirY = 1
    }

    if (x + horseWidth > screenWidth) {
        dirX = -1
    } else if (x < 0) {
        dirX = 1
    }

    let rotationDelta = Math.random() * 0.2;
    if (rotation > maxRotation) {
        dirRot = -1;
    } else if (rotation < -maxRotation) {
        dirRot = 1;
    }
    rotation += rotationDelta * dirRot;

    if (dirX < 0) {
        horse.style.transform = `scaleX(-1) rotate(${rotation}deg)`;
    } else {
        horse.style.transform = `rotate(${rotation}deg)`;
    }

    let xWobble = Math.random() - 0.5;
    let yWobble = Math.random() - 0.5;

    x += dirX * speed + xWobble;
    y += dirY * speed + yWobble;
    horse.style.left = x + "px";
    horse.style.top = y + "px";

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
