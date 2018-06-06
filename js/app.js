// Define all initial variables:
const cards = document.getElementsByClassName('card');
const initialDeck = [...cards];
const deck = document.querySelector('.deck');

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
  // shuffle the list of cards using the provided "shuffle" method 
  shuffle(initialDeck);
  // loop through each card and create its HTML
  for (let i = 0; i < initialDeck.length; i++) {
    const newCard = initialDeck[i];
    // add each card's HTML to the page
    deck.appendChild(newCard);
  } 
}

const startGame = function() {
  // reset all the cards properties
  initialDeck.forEach(function(card) {
    card.classList.remove('show', 'open', 'match');
  });
  // hide all the initial cards
  openCards = [];
  shuffleDeck();

};

// Display the cards on the page
window.onload = function() { startGame(); }; 

/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = []; // temporary list of open cards

const matchOrNot = function(status1, status2) {
  openCards.forEach((e) => { 
    e.classList.toggle(status1);
    e.classList.toggle(status2);
  });
  openCards = []; // reset list of open cards to none
};

// Add open cards to array
const addOpenCards = function() {
  openCards.push(this);
  if (openCards.length === 2) {
    // check if 2 current cards are match
    (openCards[0].querySelector('i').classList.value ===
     openCards[1].querySelector('i').classList.value)
      ? matchOrNot('match') 
      : setTimeout(function() { matchOrNot('open', 'show') }, 500); // delay half second so user can see cards
  }
};

// Each click, flip the card and display the card's symbol
const flipCard = function() {
  if (openCards.length === 2) return; // only allow user to see maximum 2 cards at a time
  this.classList.toggle('open');
  this.classList.toggle('show');
};

// Set up click event listener for each card
initialDeck.forEach(function(card) {
  card.addEventListener('click', flipCard);
  card.addEventListener('click', addOpenCards);
});

const restart = document.querySelector('.restart');
restart.addEventListener('click', startGame);
