//Variables
const qwerty = document.getElementById("qwerty");
const overlay = document.getElementById("overlay");
const imgLi = document.querySelectorAll(".tries");
const startButton = document.querySelector(".btn__reset");
const ul = document.querySelector("ul");
const phrases = [ "Falafel and tahini ",
                  "Caramel and sea salt ",
                  "Cookies and cream ",
                  "Peach cobbler and icecream ",
                  "Macrooni and cheese ",
                  "Clotted cream and jam "]

let title = document.querySelector(".title");
let button = document.getElementsByTagName("button");
let missed = 0;

//start game
startButton.addEventListener("click", (e) => {
  overlay.style.display = "none";
});

//Pick random phrases from phrases
function getRandomPhraseAsArray(arr) {
  //pick random array
  const randomArr = Math.floor(Math.random()*arr.length);
  const selected = arr[randomArr];
  const selectedNormalised = selected.toLowerCase();
  const splitPhrase = selectedNormalised.split("");
  return splitPhrase;
}

//Variable to hold value from getRandomPhraseAsArray
const addPhraseToDisplay = (arr) => {
  for (i=0; i<arr.length; i+=1){
    const li = document.createElement('li');
    li.textContent = arr[i];
    if (li.textContent !== ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
    ul.appendChild(li);
  }
};

//Display randomly selected phrase
let selectedPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(selectedPhrase);

//Variable - check selected keys - returns boolean
let checkLetter = (e) => {
  let letterFound = null;
  let selectedLetter = e.target;
  const letter = document.querySelectorAll('.letter')
  for (let i=0; i<letter.length; i+=1) {
    if (selectedLetter.textContent === letter[i].textContent) {
      letter[i].classList.add('show');
      const correct = letter[i].textContent;
      letterFound = true
    }
  }
  return letterFound;
};

//Function - check score
function checkWin () {
  const show = document.querySelectorAll('.show');
  const letter = document.querySelectorAll('.letter');
  if (show.length === letter.length) {
    overlay.style.display = 'flex';
    overlay.classList.add('winner');
    title.textContent = 'You won!'
    startButton.textContent = 'Play again?';
  }
};

//HANDLERS -- CALLING EVERYTHING LIVE
qwerty.addEventListener ("click", (e) => {
  // keys
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.setAttribute('disabled', 'true');
  }

  //checking letter
  checkLetter(e);
  correct = checkLetter(e)

  if (e.target.tagName === 'BUTTON' && correct === null) {
    i = missed;
    imgLi[i].firstChild.setAttribute('src', 'images/lostHeart.png');
    missed += 1;
    //storing the amount of lives lost
  }

  //checking score
  if (missed === 5) {
    overlay.style.display = 'flex';
    overlay.classList.add('lose');
    title.textContent = 'Sorry, there is always tomorrow!';
    startButton.textContent = 'Play again';
  }

  //checking if won
  checkWin();

});

//Reset game -----
startButton.addEventListener('click', (e) => {

    if (e.target.textContent === 'Play again') {
      overlay.style.display = 'none';

    //reset score and hearts
    missed = 0;
    for (i=0; i<imgLi.length; i+=1) {
      imgLi[i].firstChild.setAttribute('src', 'images/liveHeart.png');
    }
    // remove previous phrase list items
        const removeLi = phrase.querySelectorAll('li');
        for (i=0; i<removeLi.length; i+=1) {
          ul.removeChild(removeLi[i]);
        }

    // reset keyboard buttons
    for (i=0; i<button.length; i+=1) {
      button[i].classList.remove('chosen');
      button[i].disabled = false;
    }

    // remove classes from overlay
    overlay.classList.remove('win', 'lose');

    // generate random phrase
    selectedPhrase = getRandomPhraseAsArray(phrases);
    // Add characters to display
    addPhraseToDisplay(selectedPhrase);
  }
});
