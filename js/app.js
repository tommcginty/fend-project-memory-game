const deck = document.querySelector('.deck'),
      listItem = document.createElement('li');
let cardList = [];
let counter = 0;
let items = document.querySelectorAll('.deck li'),
    tab = [], index;
let rating = document.querySelector('.stars');
let seconds = 0, minutes = 0, time;
let timeKeeper = document.querySelector('.clock');
let restart = document.querySelector('.fa-repeat');
let replay = document.getElementById('replay');
let openCards = 0;

//timmer functions
function increaseTime() {
  seconds++;
    if (seconds > 59){
      seconds = 0;
      minutes++;
    }
    if (seconds < 10)
      timeKeeper.textContent = minutes + ":0" + seconds;
    else {
      timeKeeper.textContent = minutes + ":" + seconds;
    }
}

function timer() {
  time = setInterval(increaseTime, 1000);
}

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
}
//Display the cards on the page
//  - shuffle the list of cards using the provided "shuffle" method above
shuffle(deckOfCards);

function dealCards() {
//   - loop through each card and create its HTML
//   - add each card's HTML to the page
  let ul = document.querySelector(".deck");
  let listItems = ul.getElementsByTagName("li");
  for (let i = 0; i < items.length; ++i) {
    listItems[i].innerHTML = '<i class="fa ' + deckOfCards[i] + '"></i>';
  }
}
dealCards();


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
  }, 200);
  setTimeout(function(){
  for (let i = 0; i < 2; i++){
    tab[cardList[0]].classList.remove('show', 'open', 'no-match');
    cardList.shift();
    };
  }, 1000);
}

//   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function addToMoves(counter){
  let moves = counter/2;
  if (moves === 1)
    document.querySelector('.moves p').textContent = moves + ' Move';
  else
    document.querySelector('.moves p').textContent = moves + ' Moves';
}

//   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function gameOver(){
  clearTimeout(time);
  let gameOverDiv = document.getElementById('game-over');

  if(document.getElementById('final-rating')){
    oldRating = document.getElementById('final-rating');
    gameOverDiv.removeChild(oldRating);
  }

  let ratingMessage = document.createElement('P');
  let button = document.getElementById('replay');
  ratingMessage.setAttribute('id', 'final-rating');
  gameOverDiv.insertBefore(ratingMessage, button);

  gameOverDiv.style.display = 'block';
  document.getElementById('final-time').textContent = 'Time: ' + minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
  document.getElementById('final-moves').textContent = 'Moves: ' + counter/2;

  if (document.querySelector('.stars').getElementsByTagName('li').length >= 1){
    let finalRating = rating.cloneNode(true);
    var newItem = document.createElement("LI");
    var textnode = document.createTextNode("Rating: \u00A0");
    newItem.appendChild(textnode);
    ratingMessage.appendChild(finalRating);
    finalRating.insertBefore(newItem, finalRating.childNodes[0]);
  }
  else {
    finalRating.textContent = 'Rating: None';
}
  replay.addEventListener('click', playAgain)
}

function cardClicked() {
  if (counter == 0)
    timer();
  if (items[index].className == 'card'){
    counter++;
    if (document.querySelector('.stars').getElementsByTagName('li').length >= 1 && counter % 20 == 0){
        let loseStar = document.querySelector('.fa-star');
        rating.removeChild(rating.firstChild); // lose a star every 10 moves
      }
    let cardFace = items[index].querySelector('i').className;
    displaySymbol(items[index]);
    addToCardList(index);
    if (counter % 2 == 0){
      deck.removeEventListener('click', cardClicked);
      if (!checkMatch())
        flipCards();
      else
        matchCards();

      addToMoves(counter);
      };
    if (cardList.length == 16)
    setTimeout(function(){
      gameOver();
    }, 1000);
  };
  setTimeout(function(){
    deck.addEventListener('click', cardClicked);
  }, 2000);
}

function playAgain() {
  document.getElementById('game-over').style.display = 'none';
  restartGame();
}

function restartGame(){
  clearTimeout(time);
  seconds = 0;
  minutes = 0;
  counter = 0;
  timeKeeper.innerHTML = '0:00';
  document.querySelector('.moves p').textContent = counter + ' Moves';
  rating.innerHTML = '<li><i class="fa fa-star"></i></li>' +
                        '<li><i class="fa fa-star"></i></li>' +
                        '<li><i class="fa fa-star"></i></li>';
  for (let i = 0; i < cardList.length; i++){
    tab[cardList[i]].classList.remove('show', 'open', 'match');
    }
    shuffle(deckOfCards);
    dealCards();
    cardList = [];
}

//set up the event listener for a card. If a card is clicked (cardClicked):

deck.addEventListener('click', cardClicked);
restart.addEventListener('click', restartGame);
