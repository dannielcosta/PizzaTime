window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButtons = document.querySelectorAll("#restart-button");
  const playButton = document.getElementById("play");
  const instructionsScreen = document.getElementById("instructions");
  const startScreen = document.getElementById("game-intro");

  let game;

  //--------------------------------------------------BUTTONS----------------------------------------------------------->

  playButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    instructionsScreen.style.display = "block"
  })

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButtons.forEach((element)=>{
    element.addEventListener("click", function (){
      reloadGame();
    })
  })

  //--------------------------------------------------GAME----------------------------------------------------------->

  function startGame() {
    game = new Game();
    game.start();
  }

  function reloadGame (){
    location.reload();
  }

  

//--------------------------------------------------CONTROLS----------------------------------------------------------->
  function handleKeydown(event){
    const key = event.key;
    const possibleKeys = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown"
    ];

    if(possibleKeys.includes(key)){
      event.preventDefault();

      if(game){
        switch(key){
          case "ArrowLeft":
            game.player.directionX = -2; //estes valores têm que ser alterados
            break;
          case "ArrowUp":
            game.player.jump();
            break;
          case "ArrowRight":
            game.player.directionX = 2;
            break;
          case "ArrowDown":
            game.player.directionY = 0;
            break;
        }
      }
    }
    else if (key === " ") { // Check for space bar
      event.preventDefault();
      if (game) {
        game.player.jump();
      }
  }
  }
  function handleKeyup(event){
    const key = event.key;
    const possibleKeys = [
      "ArrowLeft",
      "Space",
      "ArrowRight",
      "ArrowDown"
    ];

    if(possibleKeys.includes(key)){
      event.preventDefault();

      if(game){
        switch(key){
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
            game.player.directionY = 0;
            break;
          case "ArrowRight":
            game.player.directionX = 0;
            break;
          case "ArrowDown":
            game.player.directionY = 0;
            break;
        }
      }
    }
    
  }

 



  
  window.addEventListener("keydown",handleKeydown);
  window.addEventListener("keyup",handleKeyup);
}