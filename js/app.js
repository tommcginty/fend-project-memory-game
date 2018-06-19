const deck = document.querySelector('.deck'),
      listItem = document.createElement('li'),
      items = document.querySelectorAll('.deck li'),
      rating = document.querySelector('.stars'),
      timeKeeper = document.querySelector('.clock'),
      restart = document.querySelector('.fa-repeat'),
      replay = document.getElementById('replay'),
      gameOverDiv = document.getElementById('game-over'),
      button = document.getElementById('replay');

let deckOfCards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'],
    cardList = [],
    tab = [],
    counter = 0,
    seconds = 0,
    minutes = 0,
    time,
    index;

// add values to the array
items.forEach(function(item) {
  tab.push(item)
});

// get selected element index
items.forEach(function (item){
  item.onclick = function(){
   index = tab.indexOf(this);
   return index;
 };
});

/*
** functions
*/

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

//timmer functions
function increaseTime() {
  seconds++;
    if (seconds > 59){
      seconds = 0;
      minutes++;
    }
    if (seconds < 10)
      timeKeeper.textContent = minutes + ':0' + seconds;
    else {
      timeKeeper.textContent = minutes + ':' + seconds;
    }
}

function timer() {
  time = setInterval(increaseTime, 1000);
}

function dealCards() {
  let ul = document.querySelector('.deck');
  let listItems = ul.getElementsByTagName('li');
  items.forEach(function(item, i) {
    listItems[i].innerHTML = '<i class="fa ' + deckOfCards[i] + '"></i>';
  });
};

function displaySymbol(card){
  card.classList.add('open', 'show');
}

// keeps track of open cards
function addToCardList(cardIndex) {
  cardList.unshift(cardIndex);
  }

function checkMatch() {
  if (tab[cardList[0]].innerHTML == tab[cardList[1]].innerHTML)
  	return true;
  else
  	return false;
}

function matchCards(){
  for (let i = 0; i < 2; i++)
    tab[cardList[i]].classList.add('match');
}

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

// One move is two flips
function addToMoves(counter){
  let moves = counter/2;
  if (moves === 1)
    document.querySelector('.moves p').textContent = moves + ' Move';
  else
    document.querySelector('.moves p').textContent = moves + ' Moves';
}

function gameOver(){
  clearTimeout(time);

// If the player has played more than one game,
// this will clear the previous rating
  if(document.getElementById('final-stars')){
    let oldRating = document.getElementById('final-stars');
    gameOverDiv.removeChild(oldRating);
    document.getElementById('final-rating').textContent = 'Rating:';
  }
  else
    document.getElementById('final-rating').textContent = 'Rating:';

// reveal the modal window with the move & time totals
  gameOverDiv.style.display = 'block';
  document.getElementById('final-time').textContent = 'Time: ' + minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
  document.getElementById('final-moves').textContent = 'Moves: ' + counter/2;

// check the star rating and display
  if (document.querySelector('.stars').getElementsByTagName('li').length >= 1){
    let finalRating = rating.cloneNode(true);
    finalRating.removeAttribute('class');
    finalRating.setAttribute('id', 'final-stars');
    gameOverDiv.insertBefore(finalRating, button);
  }
  else
    document.getElementById('final-rating').textContent = 'Rating: No Stars';

replay.addEventListener('click', playAgain)
}

// Main function for gameplay
function cardClicked() {
// start the timer when the first card is clicked
  if (counter == 0)
    timer();

  if (items[index].className == 'card'){
    counter++;

 // lose a star every 10 moves
    if (document.querySelector('.stars').getElementsByTagName('li').length >= 1 && counter % 20 == 0){
        rating.removeChild(rating.firstChild);
      }

    let cardFace = items[index].querySelector('i').className;
    displaySymbol(items[index]);

    addToCardList(index);

// Check to see if cards match.
// The event listener is removed, otherwise you can keep flipping cards
    if (counter % 2 == 0){
      deck.removeEventListener('click', cardClicked);
      if (!checkMatch())
        flipCards();
      else
        matchCards();

      addToMoves(counter);
      };

// If all of the cards are flipped, game over
    if (cardList.length == 16)
    setTimeout(function(){
      gameOver();
    }, 1000);
  };

// Event listener is added back, after a delay
  setTimeout(function(){
    deck.addEventListener('click', cardClicked);
  }, 2000);
}

function playAgain() {
  document.getElementById('game-over').style.display = 'none';
  restartGame();
}

// This function resets & shuffles the deck and resets the score panel
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
// Flipp the cards back
  for (let i = 0; i < cardList.length; i++){
    tab[cardList[i]].classList.remove('show', 'open', 'match');
    }

    shuffle(deckOfCards);
    dealCards();
    cardList = [];
}
/*
** The gameplay starts here
*/

shuffle(deckOfCards);
dealCards();

deck.addEventListener('click', cardClicked);
restart.addEventListener('click', restartGame);
