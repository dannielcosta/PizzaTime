class Game {
    constructor(){

        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameOverScreen = document.getElementById("game-over");
        this.gameVictoryScreen = document.getElementById("game-victory");
        this.timeRemaining = document.getElementById("timeRemaining");
        this.statsScreen = document.getElementById("stats");
        this.instructionsScreen = document.getElementById("instructions");
        

        this.player = new Player(
            this.gameScreen,
            0 ,
            500 ,
            120 ,
            170 ,
            "./docs/images/running-test.gif");


        this.height = 600;
        this.width = 900;

        // Timer

        this.timerIntervall = null;
        this.timer = 30;

        // Obstacles, Points and extra Time
        this.obstacles = [];
        this.points = [];
        this.extraPoints = [];
        this.extraTimer = [];

        // Score
        this.score = 0;
        this.highScore = localStorage.getItem("highScore");

        // Lives
        this.lives = 3;

        // Variable to Check if the Game is Over;
        this.gameIsOver = false;

        // Variable to Check If I'm in the Process of Crating an Object
        this.isPushingObstacle = false;
        this.isPushingPoint = false;
        this.isPushingExtraPoint = false;
        this.isPushingExtraTimer = false;
        
        // Sounds for the game
        this.soundtrack = null;
        this.victoryAudio = document.getElementById("victory-audio");
        this.gameOverAudio = document.getElementById("game-over-audio");
        
    }
    //--------------------------------------------------GAME START----------------------------------------------------------->

    start(){
    //Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width=`${this.width}px`;
    //Hides the start screen.
        this.startScreen.style.display = "none";
        this.instructionsScreen.style.display= "none";
    //Shows the game screen.
        this.gameScreen.style.display = "block";
        this.statsScreen.style.display = "block";
    //Starts the game loop. 
        this.gameLoop();

    this.timerIntervall = setInterval(() => {
        this.timer -= 1;
        document.getElementById("timeRemaining").innerText = `${this.timer}`;

        if (this.timer <= 10){
            document.getElementById('timeRemaining').style.color = 'red';
        } else {
            document.getElementById('timeRemaining').style.color = 'white';
        }
        if (this.timer <= 0) {
            clearInterval();
            this.endGameVictory();
        }
    }, 1000);
    
    this.soundtrack = document.getElementById("soundtrack");
    this.soundtrack.play();
    this.soundtrack.loop = true;

    }
    
   
//--------------------------------------------------LOOP N UPDATE----------------------------------------------------------->

    gameLoop(){
        if(this.gameIsOver) {
            return;
        }
        this.update();
        
        window.requestAnimationFrame(()=> this.gameLoop());
        
    }

    update(){
        /* Socre, Lives Scoreboard */
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        /*  Every Frame of the Game, I want to check if the player is moving */
        this.player.move();

//--------------------------------------------------OBSTACLES----------------------------------------------------------->
            // It determines the speed according to the score. More score, more speed.
        for (let i=0;i<this.obstacles.length; i++){
            const obstacle=this.obstacles[i];
            if (this.score >= 80) {                             // Hard
                obstacle.move(10); // speed in px
            } else if (this.score < 80 && this.score > 25) {    // Medium
                obstacle.move(6); // speed in px
            } else {                                            // Easy - start
                obstacle.move(4); // speed in px
            }

            if(this.player.didCollide(obstacle)){
                obstacle.element.remove();

                this.obstacles.splice(i,1);

                this.lives--;

            } else if(obstacle.left <= 0){
                

                // Remove the Obstacle HTML Element from the HTML
                obstacle.element.remove();

                // Remove the Obstacle from the Game Class'obstacles array
                this.obstacles.splice ( i , 1 )
            }
        }
        if (this.lives === 0){
            this.endGame();
        }
        else if(!this.obstacles.length && !this.isPushingObstacle){
                this.isPushingObstacle = true;
                setTimeout(()=>{
                    this.obstacles.push(new Obstacle(this.gameScreen));
                    this.isPushingObstacle = false;
                },1000);
                setTimeout(()=>{
                    this.obstacles.push(new Obstacle(this.gameScreen));
                    this.isPushingObstacle = false;
                },2500);
            }
            
//--------------------------------------------------POINTS----------------------------------------------------------->
        for (let i=0;i<this.points.length; i++){
            const point=this.points[i];
            point.move();

            if(this.player.didCollide(point)){
                point.element.remove();

                this.points.splice(i,1);

                this.score ++;

            } else if(point.left <= 0){
                
                

                // Remove the Obstacle HTML Element from the HTML
                point.element.remove();

                // Remove the Obstacle from the Game Class'obstacles array
                this.points.splice ( i , 1 )
            }
        
        }
        
        if (!this.points.length && !this.isPushingPoint) {
            this.isPushingPoint = true;
            setTimeout(()=>{
                this.points.push(new Point(this.gameScreen));
                this.isPushingPoint = false;
            }, 1000)
        }
//--------------------------------------------------EXTRA POINTS----------------------------------------------------------->
        for (let i=0;i<this.extraPoints.length; i++){
            const extraPoint=this.extraPoints[i];
            extraPoint.move();

            if(this.player.didCollide(extraPoint)){
                extraPoint.element.remove();

                this.extraPoints.splice(i,1);

                this.score += 5;

            } else if(extraPoint.left <= 0){
                
                extraPoint.element.remove();

                this.extraPoints.splice ( i , 1 )
            }
        
        }
        
        if (!this.extraPoints.length && !this.isPushingExtraPoint) {
            this.isPushingExtraPoint = true;
            setTimeout(()=>{
                this.extraPoints.push(new ExtraPoint(this.gameScreen));
                this.isPushingExtraPoint = false;
            }, 2000)
        }
//--------------------------------------------------EXTRA TIMER----------------------------------------------------------->
        for (let i = 0; i < this.extraTimer.length; i++) {
            const extraTime = this.extraTimer[i];
            extraTime.move();
        
            if (this.player.didCollide(extraTime)) { // Corrected variable name
                extraTime.element.remove();
        
                this.extraTimer.splice(i, 1);
        
                this.timer += 10;
            } else if (extraTime.left <= 0) {
                // Remove the ExtraTimer HTML Element from the HTML
                extraTime.element.remove();
        
                // Remove the ExtraTimer from the Game Class' extraTimer array
                this.extraTimer.splice(i, 1);
            }
        }
        
        if (!this.extraTimer.length && !this.isPushingExtraTimer) {
            this.isPushingExtraTimer = true;
            setTimeout(() => {
                this.extraTimer.push(new ExtraTimer(this.gameScreen));
                this.isPushingExtraTimer = false;
            }, 10000);
        }
    score.innerHTML = this.score;     // score and lives
    lives.innerHTML = this.lives;
    
    }

    //--------------------------------------------------END GAME----------------------------------------------------------->

    //--------------------------------------------------GAME OVER----------------------------------------------------------->
    endGame(){
        
        clearInterval(this.timerIntervall);

        // Change the gameIsOver status. If it's true, remember that this is going to break the animation loop.
        this.gameIsOver = true;

        // Remove Player
        this.player.element.remove();

        // Remove all Obstacles
        this.obstacles.forEach((obstacle,index)=>{

            // Remove the obstacle from JS
            this.obstacles.splice(index,1);

            // Remove the obstacle from HTML;
            obstacle.element.remove();
        })

        // Remove all points

        this.points.forEach((point,index)=>{
            this.points.splice(index,1);
            point.element.remove();
        })

        this.statsScreen.style.display = "none";
        this.gameScreen.style.display = "none";
        this.gameOverScreen.style.display = "block";

        this.soundtrack.pause();
        this.gameOverAudio.play();

    }
//--------------------------------------------------END GAME----------------------------------------------------------->

//--------------------------------------------------VICTORY----------------------------------------------------------->
    endGameVictory() {
        // Change the gameIsOver status. If it's ture, remember that this is going to break the animation loop.
        this.gameIsOver = true;

        clearInterval(this.timerIntervall);

        // Remove Player
        this.player.element.remove();

        // Remove all Obstacles
        this.obstacles.forEach((obstacle,index)=>{

            // Remove the obstacle from JS
            this.obstacles.splice(index,1);

            // Remove the obstacle from HTML;
            obstacle.element.remove();
        })

        // Remove all points

        this.points.forEach((point,index)=>{
            this.points.splice(index,1);
            point.element.remove();
        })

        this.statsScreen.style.display = "none";
        this.gameScreen.style.display = "none";
        this.gameVictoryScreen.style.display = "block";

        this.soundtrack.pause();
        this.victoryAudio.play();

        if (this.score > this.highScore) {
            localStorage.setItem("highScore",this.score);
        }
        this.highScore = localStorage.getItem("highScore");
       

        let finalScore = document.createElement("h2");
        finalScore.innerHTML = `Your score: ${this.score}`;
        this.gameVictoryScreen.appendChild(finalScore);

        let highScoreDisplay = document.createElement("h2");
        highScoreDisplay.innerHTML = `HighScore: ${this.highScore}`;
        this.gameVictoryScreen.appendChild(highScoreDisplay);
    }
   
}