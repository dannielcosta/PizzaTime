class Point {
    constructor(gameScreen){
        this.gameScreen = gameScreen;

        // Random Position
        this.top = Math.floor(Math.random() * (550 - 350) + 350);     // <----- alterar valores

        this.left = 850;
        this.width = 70;
        this.height = 70;

        // Create the HTML element and create default styling
        this.element = document.createElement("img");
        this.element.src = "./docs/images/pizza-slice.png";   //    
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(){
        // Move RIGHT TO LEFT
        this.left -= 3;    
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left =`${this.left}px`;
        this.element.style.top=`${this.top}px`;
    }
}