class Player {
    constructor(gameScreen, left, top, width, height, imgSrc){
        // gameScreen HTML element
        this.gameScreen = gameScreen;

        // Position values
        this.left = left;
        this.top = top;

        // Player Dimension Values
        this.width = width;
        this.height = height;

        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";


        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);

        this.directionX = 0;
        this.directionY = 0;

        // jump and gravity values
        this.gravity = 0.6;          // the force that pulls the player down
        this.jumpStrength = 4;       // force of the jump
        this.isJumping = false;      // checks jump()
        this.jumpStartTime = 0;      // the moment that the jump started
    }
//--------------------------------------------------MOVE AND JUMP----------------------------------------------------------->
    move() {
        this.left += this.directionX;       // horizontal position
        this.top += this.directionY;        // vertical position
        // Handle the right side of the screen;
        if(this.left + this.width > this.gameScreen.offsetWidth){ // offsetWidth is width + padding + borders
            this.left = this.gameScreen.offsetWidth - this.width;
        }
        //Handle the left side of the screen;
        else if(this.left <= 0) {
            this.left = 0;
        }
        //Handle the top of the screen;
        if (this.top <= 0) {
            this.top = 0;
        }
        // Handle the bottom of the screen;
        else if (this.top + this.height > this.gameScreen.offsetHeight){
            this.top = this.gameScreen.offsetHeight - this.height;
        }
        // Apply the force of gravity
        if (!this.isJumping && this.top + this.height < this.gameScreen.offsetHeight) {
            this.directionY += this.gravity; // apply the force of gravity while the player is still in the air
        }
        // Jump handling
        if (this.isJumping) {
            const elapsedTime = performance.now() - this.jumpStartTime;           // the elapsed time will be the result of the precise ↩︎
            if (elapsedTime < 350) { // Adjust jump duration as needed                   //  moment minus the jump start that was saved
                this.directionY = -this.jumpStrength;
            } else {
                this.isJumping = false;   // if the player is not jumping, all the statement behind is ignored.
            }
        }
        this.updatePosition();
    }
    // jump function
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpStartTime = performance.now();
        }
    }

    //--------------------------------------------------UPDATE POSITION----------------------------------------------------------->
    updatePosition() {
        this.left += this.directionX;
        this.top += this.directionY;

        // Handle screen boundaries
        if (this.left < 0) {
            this.left = 0;
        } else if (this.left + this.width > this.gameScreen.offsetWidth) {
            this.left = this.gameScreen.offsetWidth - this.width;
        }

        if (this.top < 0) {
            this.top = 0;
        } else if (this.top + this.height > this.gameScreen.offsetHeight) {
            this.top = this.gameScreen.offsetHeight - this.height;
            this.isJumping = false; // Stop jumping when hitting the ground
        }

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }


    //--------------------------------------------------COLLISION----------------------------------------------------------->
    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        //If part of the player's car is inside the obstacles car, then I have a collision
        if(playerRect.left < obstacleRect.right && playerRect.right > obstacleRect.left && playerRect.top < obstacleRect.bottom && playerRect.bottom > obstacleRect.top) {
            return true;
        } else {
            return false;
        }
    }

    didCollide(point){
        const playerRect = this.element.getBoundingClientRect();
        const pointRect = point.element.getBoundingClientRect();

        if (
            playerRect.left < pointRect.right &&
            playerRect.right > pointRect.left &&
            playerRect.top < pointRect.bottom &&
            playerRect.bottom > pointRect.top
        ) {
            return true;

        } else {
            return false;
        }


    }
}