const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const letter = document.querySelectorAll(".letter");
const overlay = document.getElementById("overlay");
const scoreboard = document.getElementById("scoreboard");
const startButton = document.querySelector(".btn__reset");
const ul = document.querySelector("ul");
const phrases = [
  "Falafel and tahini",
  "Caramel and sea salt",
  "Cookies and cream",
  "Peach cobbler and icecream",
  "Macrooni and cheese",
  "Clotted cream and jam"
]

let title = document.querySelector(".title");
let button = document.getElementsByTagName("button");
let missed = 0;

// start game
startButton.addEventListener("click", (e) =>{
  e.target.style.display = "none";
});

//get keys


//Random Phrases from Array
function getRandomPhraseAsArray(arr) {
  //pick random array
  const randomArr = Math.floor(Math.random()*arr.length);
  const picked = arr[randomArr];
  const pickedNormalised = picked.toLowerCase();
  const splitPhrase = pickedNormalised.split("");
  return splitPhrase;
};

//display getRandomPhraseAsArray results
const addPhraseToDisplay = (arr) => {
  for (i=0; i<arr.length; i+=1){
    const li = document.createElement('li');
    li.textContent = arr[i];
    if (li.textContent !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    ul.appendChild(li);
  }
}


const phraseArray = getRandomPhraseAsArray(phrases);
console.log(addPhraseToDisplay);

//does keys match with letters and returns correct letters
function checkLetter (e) {
  let letterFound = null;
  const selectedL = e.target;
  for (let i=0; i<letter.length; i+=1) {
    if (selectedL.textContent === letter[i].textContent) {
      letter[i].classList.add('show');
      const correct = letter[i].textContent;
      letterFound = true
    }
  }
  return letterFound;
};

//is all letter correct? show win screen!
function checkWin () {
  const show = document.querySelectorAll('.show');
  const letter = document.querySelectorAll('.letter');
  if (show.length === letter.length) {
    console.log('Player Wins!');
    overlay.style.display = 'flex';
    overlay.classList.add('winner');
    title.textContent = 'You won!'
    startButton.textContent = 'Play again?';
  }
};


//HANDLERS ---
qwerty.addEventListener ("click", (e) => {

  // keys
  if (e.target.tagName === 'button') {
    e.target.classList.add('chosen');
    e.target.setAttribute('disabled', 'true');
  }

  //checking letter
  checkLetter(e);
  if (e.target.tagName === 'button' && matched === null) {
    i = missed;
    scoreboard[i].setAttribute('src', 'images/lostHeart.png');
    missed += 1;
    //storing the amount of lives lost
  }

  //checking score
  if (missed === 5) {
    console.log('Come on, you can do this!');
    overlay.style.display = 'flex';
    overlay.classList.add('lose');
    title.textContent = 'Sorry, there is always tomorrow!';
    startButton.textContent = 'Play again';
  }

  //checking if won
  checkWin();


});

//reset

startButton.addEventListener('click', (e) => {

    if (e.target.textContent === 'Play again') {
      overlay.style.display = 'none';

    //reset score and hearts
    missed = 0;
    for (i=0; i<scoreboard.length; i+=1) {
      scoreboard[i].setAttribute('src', 'images/liveHeart.png');
    }
    // remove list items
    const li = phrase.querySelectorAll('li');
    for (i=0; i<li.length; i+=1) {
      ul.removeChild(li[i]);
    }

    // reset keyboard buttons
    for (i=0; i<button.length; i+=1) {
      button[i].classList.remove('chosen');
      button[i].disabled = false;
    }

    // remove classes from overlay
    overlay.classList.remove('win', 'lose');

    //generate new random phrase
    const characters = getRandomPhraseAsArray(phrases);
    console.log(characters)

    // Add characters to display
    addPhraseToDisplay(characters);
  }
});
