// Define all initial variables:
const cards = document.getElementsByClassName('card');
const initialDeck = [...cards];
const deck = document.querySelector('.deck');
const displayMoves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll('.stars li');

let moves = 0; // set initial move to 0
let openCards = []; // temporary list of open cards
let allStars = 3; // initial star rating is 3

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

const shuffleDeck = function() {
  // shuffle the list of cards using the provided "shuffle" method above
  shuffle(initialDeck);
  
  // loop through each card and create its HTML
  for (let i = 0; i < initialDeck.length; i++) {
    const newCard = initialDeck[i];
    // add each card's HTML to the page
    deck.appendChild(newCard);
  } 
}

const startGame = function() {
  moves = 0;
  displayMoves.innerText = moves;

  // reset initial rating to 3 stars
  stars.forEach(function(star) { star.style.display = 'inline-block' });

  // reset all the cards properties
  initialDeck.forEach(function(card) {
    card.classList.remove('show', 'open', 'match');
  });
  openCards = []; // hide all the initial cards
  shuffleDeck();
};

// Display the cards on the page
window.onload = function() { startGame(); }; 
// Restart when user clicked on the restart button
restart.addEventListener('click', startGame);

const matchOrNot = function(status1, status2) {
  openCards.forEach((e) => { 
    e.classList.toggle(status1);
    e.classList.toggle(status2);
  });
  openCards = []; // reset list of open cards to none
};

const removeStars = function() {
  if (moves === 9) {
    stars[0].style.display = 'none';
    allStars--;
  }
  if (moves === 13) {
    stars[1].style.display = 'none';
    allStars--;
  }
};

const addCards = function() {
  // each click, flip the card and display the card's symbol
  this.classList.toggle('open');
  this.classList.toggle('show');

  // Add open cards to array
  openCards.push(this);

  if (openCards.length === 2) {
    removeStars();
    // increment the move counter and display it on the page (fn)
    moves++;
    displayMoves.innerText = moves;

    // check if 2 current cards are match
    (openCards[0].querySelector('i').classList.value ===
     openCards[1].querySelector('i').classList.value)
      ? matchOrNot('match') 
      : setTimeout(function() { matchOrNot('open', 'show') }, 500); // delay half second so user can see cards
    return; // soft reset after user have seen 2 cards
  }
};

// Set up click event listener for each card
initialDeck.forEach(function(card) { card.addEventListener('click', addCards); });

// if all cards have matched, display a message with the final score (fn)
