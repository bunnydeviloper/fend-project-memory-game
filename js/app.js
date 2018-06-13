// Define all initial variables:
const cards = document.getElementsByClassName('card');
const initialDeck = [...cards];
const deck = document.querySelector('.deck');
const displayMoves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll('.stars li');
const winner = document.querySelector('.winner');
const timer = document.querySelector('.timer');

let moves = 0; // set initial move to 0
let openCards = []; // temporary list of open cards
let allStars = 3; // initial star rating is 3
let matchedPairs = 0; //set initial matched pair to 0

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const shuffleDeck = () => {
  // shuffle the list of cards using the provided "shuffle" method above
  shuffle(initialDeck);
  
  // loop through each card and create its HTML
  for (let i = 0; i < initialDeck.length; i++) {
    const newCard = initialDeck[i];
    // add each card's HTML to the page
    deck.appendChild(newCard);
  } 
}

const startGame = () => {
  shuffleDeck();

  moves = 0;
  displayMoves.innerText = moves;
  matchedPairs = 0;
  winner.style.display = 'none';
  openCards = []; // hide all the initial cards

  // reset initial rating to 3 stars
  stars.forEach((star) => { star.style.display = 'inline-block' });

  // reset all the cards properties
  initialDeck.forEach((card) => {
    card.classList.remove('show', 'open', 'match');
  });

  // reset timer
  second = 0, minute = 0;
  timer.innerHTML = `${minute} mins ${second} secs`;
  clearInterval(interval);
  deck.addEventListener('click', startTimer, {once: true}); // invoke the listener only once
};

// Display the cards on the page
window.onload = () => { startGame(); }; 

// Restart when user clicked on the restart button
restart.addEventListener('click', startGame);

const noMatch = () => {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards = []; // reset list of open cards
};

const matched = () => {
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards = []; // reset list of open cards
};

const removeStars = () => {
  if (moves === 15) {
    stars[0].style.display = 'none';
    allStars--;
  }
  if (moves === 25) {
    stars[1].style.display = 'none';
    allStars--;
  }
};

const movesCounter = () => {
  // increment the move counter and display it on the page (fn)
  moves++;
  displayMoves.innerText = moves;
};

const flipCards = function() {
  if (openCards.length === 2) return; // only allow user to see 2 cards at a time

  // each click, flip the card and display the card's symbol
  if (!this.classList.contains('match')) {
    this.classList.toggle('open');
    this.classList.toggle('show');
  }
};

const checkPairs = function() {
  if (!this.classList.contains('match')) openCards.push(this); // Add open cards to array
  if (openCards.length === 2) {
    // check if 2 current cards are match
    if (openCards[0].querySelector('i').classList.value === openCards[1].querySelector('i').classList.value) {
      matched();
      matchedPairs++;
      if (matchedPairs === 8) final();
    } else {
      setTimeout(noMatch, 500); // delay half second so user can see cards
    }
    movesCounter();
    removeStars();
  }
};

// Set up click event listener for each card
initialDeck.forEach((card) => {
    card.addEventListener('click', flipCards);
    card.addEventListener('click', checkPairs);
});

// Timer function from https://github.com/sandraisrael/Memory-Game-fend/blob/master/js/app.js
let second = 0, minute = 0;
let interval;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+" mins "+second+" secs";
    second++;
    if(second == 60){
      minute++;
      second=0;
    }
  },1000);
}

// if all cards have matched, display a message with the final score (fn)
const final = () => {
  clearInterval(interval);
  winner.style.display = 'flex';

  document.querySelector('.totalMoves').innerHTML = ` ${moves}`;
  document.querySelector('.totalStars').innerHTML = ` ${allStars}`;
  document.querySelector('.totalTime').innerHTML = ` ${timer.innerHTML}`;

  // click button to restart the game
  document.querySelector('.again').addEventListener('click', startGame);
};
