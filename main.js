console.log("Project 1");

//select:
const sky = document.getElementsByClassName('sky');

//EventListeners:
document.addEventListener('DOMContentLoaded', () => {
    const bird = documentquerySelector('.bird');
    const gameDisplay = document.querySelector('game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220; // adds space between bird and the sky from left side
    let birdBottom = 100; // adds space between bird and bottom of sky.

    function startGame() {
        bird.style.bottom = birdBottom + 'px'
    }
})