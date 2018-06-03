const deck = document.querySelector('.deck');
let cardList = [];
let counter = 0;
let items = document.querySelectorAll(".deck li"),
    tab = [], index;

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


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


// - display the card's symbol (put this functionality in another function that you call from cardClicked)
function displaySymbol(card){
  card.classList.add('show');
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


//   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function flipCards() {
  for (let i = 0; i < 2; i++){
    tab[cardList[0]].classList.remove('show')
    cardList.shift();
  }


}

//   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)


//   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

function cardClicked(evt) {
  if (items[index].className != 'card show'){
    counter++;
    let cardFace = items[index].querySelector('i').className;
    console.log('I was clicked: ' + index);
    displaySymbol(items[index]);
    addToCardList(index);
    if (counter % 2 == 0)
      if (!checkMatch())
        flipCards();
  };
}


//set up the event listener for a card. If a card is clicked (cardClicked):
deck.addEventListener('click', cardClicked);
