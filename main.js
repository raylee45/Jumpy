//EventListeners:
document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const scoreValue = document.querySelector('#score')
    const scoreBoard = document.querySelector('.score-container')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 500

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
        let newScore = Number(scoreValue.textContent) + 10
        scoreValue.textContent = newScore
        e.preventDefault()
        if (newScore === 200) scoreBoard.textContent = "Winner!"
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 45
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 32) {
            e.preventDefault()
        }
    })
    
    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }

        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacle.offsetLeft <= -60) {
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
                delete obstacle
                delete topObstacle
            }

            else if (
                obstacleLeft > 200 && obstacleLeft < 273 && birdLeft === 220 && // if obstacle is not in the last 200px of its travel.. AND middle of the grid almost (< 280px).. AND birdLeft is at position 220px.. then we have gameOver
                (birdBottom < obstacleBottom + 145 || birdBottom > obstacleBottom + gap - 204)|| 
                //birdbottom < obstaclebottom --> for game over when bird hits bottom obstacle.
                //birdbottom > obstaclebottom + gap --> for game over when bird hits top obstacle.
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
        if (isGameOver && scoreValue.textContent < 200) scoreBoard.textContent = "Loser!"
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})