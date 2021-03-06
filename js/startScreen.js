fetchScore = () => { 
  let candies = [];
  let streets = [];
  let dataCandy = [];
  let dataStreet = [];

  fetch(`https://fr-en.openfoodfacts.org/category/candies/${getRandomArbitrary(1,10)}.json`)
    .then(response=> response.json())
    .then( json => {dataCandy = json.products})
    .then( () =>{ dataCandy.map(candy => {
      return(
        
        candies.push(candy.product_name)
      )
      })
      
      
    })
    .then( () => {candies.map(candy =>{
      return(
        document.getElementById("candies").innerHTML += `<li>${candy}</li>`
      )

    })})

    fetch("https://api-adresse.data.gouv.fr/search/?q=rue&type=street&limit=23&citycode=44109")
    .then(response => response.json())
    
    .then( json => {
      dataStreet = json.features
    })
    .then( () => {dataStreet.map(street => {
      console.log(street)
      return(
        streets.push(street.properties.name)
      )})
      console.log(dataStreet)
    })
    .then( () => {streets.map(street =>{
      return(
        document.getElementById("adress").innerHTML += `<li>${street}</li>`
      )

    })})
 
}


getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

window.onload = () => {

    let toggleMusic ="OFF"
    let startScreen =`
    <div class="row mt-5">
      <div class="col-md-12 text-center logo">
        <h1 class="main-title">NANTES HORROR STORY</h1>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <button id="startGame" onClick="launchCanvas()" class="themeBtn1">START GAME</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <button onClick="fetchScore()" type="button" class="themeBtn" data-toggle="modal" data-target="#exampleModal">
        HIGH SCORE
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header d-flex justify-content-center">
                <h1 class="modal-title text-orange" id="exampleModalLabel">HIGH SCORE</h1>
              </div>
              <div class="container modal-body">
                <div class="row">
                  
                  <ul id="adress" class="col-6 adress-score score text-orange list-unstyled">
                  <span class="score-title">Streets</span>
                  </ul> 
                  <ul id="candies" class=" col-6 score text-green list-unstyled">
                  <span class="score-title">Candies you got</span>
                  </ul>
                </div>
                  
              </div>
              <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="themeBtn" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <button value=${toggleMusic} id="musicLaunch" class="themeBtn">MUSIC OFF</button>
      </div>
    </div>`
  
    
    document.getElementById("screen").innerHTML = startScreen;
    let audio = new Audio('./assets/sound/Undead.mp3');
    let audioGame = new Audio('./assets/sound/GameMusic.mp3')
    
    let startMusicHandler = document.getElementById("musicLaunch")

    startMusicHandler.addEventListener('click', function(){
      if(startMusicHandler.value === "OFF"){
        audio.play();
        startMusicHandler.value = "ON";
        startMusicHandler.innerHTML = "MUSIC ON";
      }
      else if(startMusicHandler.value === "ON") {
        audio.pause();
        startMusicHandler.value = "OFF";
        startMusicHandler.innerHTML = "MUSIC OFF";
      }
    });

    let startGameHandler = document.getElementById("startGame")

    startGameHandler.addEventListener('click', function(){
      document.getElementById("screenSwitch").className = "d-none";
      audioGame.play();
      audioGame.volume = 0.08;
      if (audio.play()) {
        audio.pause()
      }
      document.getElementById("canvas").className ="d-block";
    });

    let restartGameHandler = document.getElementById("restartGame")

    restartGameHandler.addEventListener('click', function(){
      document.getElementById("gameoverScreen").className = "d-none";
      document.getElementById("healthBar").style.width = `100%`;
      document.getElementById("candiesBar").style.width = `0%`;
    })

    let restartGameWonHandler = document.getElementById("restartGameWon")

    restartGameWonHandler.addEventListener('click', function(){
      document.getElementById("wonScreen").className = "d-none";
      document.getElementById("healthBar").style.width = `100%`;
      document.getElementById("candiesBar").style.width = `0%`;
    })
}
  