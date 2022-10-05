const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let firstCard = null;
let secondCard = null;
// undefined didn't work
let stopClickListener = false; // use this in an if statement to not allow click function to run
function handleCardClick(event) {
  if (stopClickListener === true) { /* Stop function from running when both cards are clicked*/
    console.log("You can't click right now");
    return;
  }

  const clickedCard = event.target;
  clickedCard.style.backgroundColor = event.target.className; /* had to be after the stop click function couldn't figure out for a bit */

  if (clickedCard.classList.contains('flippedCard')) { /* check if clicked card has already been clicked */
    console.log("You can't click the same card twice!")
    return;
  } else {
    if (!firstCard || !secondCard) { /* assigning variables for clicks when they are null*/
      if (firstCard !== null) {
        secondCard = clickedCard;
        secondCard.classList.add('flippedCard');
      } else {
        firstCard = clickedCard;
        firstCard.classList.add('flippedCard')
      }
    }
    if (firstCard && secondCard) { /*this function should work when both cards have assigned variables */
      stopClickListener = true; /* stop clicks when this if statement runs */
      if (firstCard.classList[0] !== secondCard.classList[0]) {
        setTimeout(() => {
          // first card functions
          firstCard.style.backgroundColor = "";
          firstCard.classList.remove('flippedCard');
          firstCard = null;
          // second card functions
          secondCard.style.backgroundColor = "";
          secondCard.classList.remove('flippedCard');
          secondCard = null;
          // make it possible to run the function again
          stopClickListener = false;
        }, 1000);
      }
      if (firstCard.classList[0] === secondCard.classList[0]) {
        // first card functions
        firstCard.classList.remove('flippedCard');
        firstCard.removeEventListener('click', handleCardClick);
        firstCard = null;
        // second card functions
        secondCard.classList.remove('flippedCard');
        secondCard.removeEventListener('click', handleCardClick);
        secondCard = null;
        // make it possible to run the function again
        stopClickListener = false
      }
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
