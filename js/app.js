const deck = document.querySelector('.deck');
let cardList = [];
let counter = 0;
let items = document.querySelectorAll('.deck li'),
    tab = [], index;
const listItem = document.createElement('li');
let rating = document.querySelector('.stars');


// add values to the array
for(let i = 0; i < items.length; i++){
tab.push(items[i]);
}

// get selected element index
for(var i = 0; i < items.length; i++)
{
items[i].onclick = function(){

   index = tab.indexOf(this);
   return index;
};
}
/*
 * Create a list that holds all of your cards
 */
let deckOfCards = ['fa-diamond', 'fa-diamond',
                  'fa-paper-plane-o', 'fa-paper-plane-o',
                  'fa-anchor', 'fa-anchor',
                  'fa-bolt', 'fa-bolt',
                  'fa-cube', 'fa-cube',
                  'fa-leaf', 'fa-leaf',
                  'fa-bicycle', 'fa-bicycle',
                  'fa-bomb', 'fa-bomb'
            ];




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
}//Display the cards on the page
//  - shuffle the list of cards using the provided "shuffle" method above
shuffle(deckOfCards);

//   - loop through each card and create its HTML
//   - add each card's HTML to the page
let ul = document.querySelector(".deck");
let listItems = ul.getElementsByTagName("li");
undefined
for (let i = 0; i < items.length; ++i) {
  listItems[i].innerHTML = '<i class="fa ' + deckOfCards[i] + '"></i>';
}

// Shuffle function from http://stackoverflow.com/a/2450976



// - display the card's symbol (put this functionality in another function that you call from cardClicked)
function displaySymbol(card){
  card.classList.add('open', 'show');
}

//  - add the card to a *list* of "open" cards (put this functionality in another function that you call from cardClicked)
function addToCardList(cardIndex) {
  cardList.unshift(cardIndex);
  }

  //  - if the list already has another card, check to see if the two cards match
function checkMatch() {
  if (tab[cardList[0]].innerHTML == tab[cardList[1]].innerHTML)
  	return true;
  else
  	return false;
}

//   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from cardClicked)
function matchCards(){
  for (let i = 0; i < 2; i++)
    tab[cardList[i]].classList.add('match');
}

//   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function flipCards() {
  setTimeout(function(){
  for (let i = 0; i < 2; i++){
    tab[cardList[i]].classList.add('no-match');
    };
  }, 1000);
  setTimeout(function(){
  for (let i = 0; i < 2; i++){
    tab[cardList[0]].classList.remove('show', 'open', 'no-match');
    cardList.shift();
    };
  }, 2000);
}

//   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function addToCounter(counter){
  let moves = counter/2;
  if (moves === 1)
    document.getElementById('moves').textContent = moves + ' Move';
  else
    document.getElementById('moves').textContent = moves + ' Moves';
}

//   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function gameOver(){
  //dispay div over the game
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('final-time').textContent = 'Time: ';
  document.getElementById('final-moves').textContent = 'Moves: ' + counter/2;
  document.getElementById('final-rating').textContent = 'Rating: ';
  document.getElementById('final-rating').appendChild = rating;


  //display message
  // dispay score & rating
}


function cardClicked() {
  if (items[index].className == 'card'){
    counter++;
    if (counter % 8 == 0)
      rating.removeChild(rating.firstChild);

    let cardFace = items[index].querySelector('i').className;
    console.log('I was clicked: ' + index);
    displaySymbol(items[index]);
    addToCardList(index);
    if (counter % 2 == 0){
      if (!checkMatch())
        flipCards();
      else
        matchCards();

      addToCounter(counter);
      };
    if (cardList.length == 16)
      gameOver();
  };
}

//set up the event listener for a card. If a card is clicked (cardClicked):
deck.addEventListener('click', cardClicked);
