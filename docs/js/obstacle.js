class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        
        // Random Position
        this.top = Math.floor(Math.random() * (550 - 100) + 100);     // <----- alterar valores

        this.left = 850;
        this.width = 80;
        this.height = 80;

        // Create the HTML element and create default styling
        this.element = document.createElement("img");
        this.element.src = "./docs/images/pineapple.png";   //    
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(speed){
        // Move RIGHT TO LEFT
        this.left -= speed;
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left =`${this.left}px`;
        this.element.style.top=`${this.top}px`;
    }
}