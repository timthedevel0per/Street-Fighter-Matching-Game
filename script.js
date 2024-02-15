// Function to create a new card element
function createNewCard() {
    /* Creates a new div element and assigns it to a variable called cardElement */
    let cardElement = document.createElement("div");
  
    /* Adds the "card" class to the cardElement */
    cardElement.classList.add("card");
  
    /* Writes the HTML for the children of the card element and assigns it as the innerHTML of cardElement */
    cardElement.innerHTML = `
      <div class="card-down"></div>
      <div class="card-up"></div>`;
  
    /* Returns the cardElement */
    return cardElement;
  }
//createNewCardTest();

// Function to append a new card to a parent element
function appendNewCard(parentElement) {
    /* Creates a new card by calling createNewCard() and assigns it to a variable named cardElement */
    let cardElement = createNewCard();
  
    /* Appends the cardElement to the parentElement */
    parentElement.appendChild(cardElement);
  
    /* Returns the card element */
    return cardElement;
  }
//appendNewCardTest();



// Function to shuffle card image classes
function shuffleCardImageClasses() {
    /* Creates a new array containing two of each image class string in order */
    let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
  
    /* Shuffles the array of class names */
    return _.shuffle(cardClasses);
  }
//shuffleCardImageClassesTest()


// Function to create cards and return an array of card objects
function createCards(parentElement, shuffledImageClasses) {
    /* Makes an empty array to hold our card objects */
    let cardObjects = [];
  
    /* Loops 12 times to create the 12 cards */
    for (let i = 0; i < 12; i++) {
      /* Uses appendNewCard to create/append a new card and stores the result in a variable */
      let newCardElement = appendNewCard(parentElement);
  
      /* Adds an image class to the new card element using shuffledImageClasses[i] */
      newCardElement.classList.add(shuffledImageClasses[i]);
  
      /* Appends a new object to the card object array */
      cardObjects.push({
        index: i,
        element: newCardElement,
        imageClass: shuffledImageClasses[i]
      });
    }
  
    /* Returns the array of 12 card objects */
    return cardObjects;
  }
//createCardsTest();

// Function to determine if two cards match
function doCardsMatch(cardObject1, cardObject2) { 
  /* Determines if two cards match based on their image class */  
  if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  }
  else {
    return false;
  }
}
//doCardsMatchTest();

/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that video lesson in HQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};

// Function to increment a counter and update the UI
function incrementCounter(counterName, parentElement) {
  /* Initializes the counter if not defined */
  if (counters[counterName] == undefined) {
    counters[counterName] = 0;
  }

  /* Increments the counter for counterName */
  counters[counterName]++;

   /* Updates the HTML within parentElement to display the new counter value */
  parentElement.innerHTML = counters[counterName];
}
//incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;

// Function called when a card is flipped
function onCardFlipped(newlyFlippedCard) {
 /* Increments the flip counter */
  incrementCounter("flip-counter", document.getElementById("flip-count"));

   /* If lastCardFlipped is null, updates lastCardFlipped and returns */
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }


  /* If the above condition was not met, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard', respectively. */

  /* If the cards don't match, removes the "flipped" class from each, resets lastCardFlipped to null, and exits the function */
  if (newlyFlippedCard.imageClass != lastCardFlipped.imageClass) {
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
     	
  /* If two matching cards are flipped, increments the match counter, adds a "glow" effect to the cards, and plays corresponding audio */
  incrementCounter("match-counter", document.getElementById("match-count"));
  newlyFlippedCard.element.classList.add("glow");
  lastCardFlipped.element.classList.add("glow");

  // Play audio based on the image class
  switch (newlyFlippedCard.imageClass) {
    case "image-1":
      document.getElementById("audio1").play();
      break;
    case "image-2":
      document.getElementById("audio2").play();
      break;
    case "image-3":
      document.getElementById("audio3").play();
      break;
    case "image-4":
      document.getElementById("audio4").play();
      break;
    case "image-5":
      document.getElementById("audio5").play();
      break;
    case "image-6":
      document.getElementById("audio6").play();
      break;
    default:
      console.log("No audio defined for this card.");
      break;
  }


  /* Plays either the win audio or match audio based on the number of matches needed to win */
  let numMatchesToWin = 6;
  if (counters["match-counter"] == numMatchesToWin) {
    winAudio.play();
    alert("Congratulations! You won the game!!!");
  }
  else {
    matchAudio.play();
  }

  /* Resets lastCardFlipped to null */
  lastCardFlipped = null;
}

/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {
  /* Gets the card container by its id */
  let cardContainer = document.getElementById("card-container");


  /* Clears all the cards from the card container */
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  /* Resets the flip and match counts displayed in the HTML */
  let flipCount = document.getElementById("flip-count");
  let matchCount = document.getElementById("match-count");
  flipCount.innerText = 0;
  matchCount.innerText = 0;


  /* Reassigns the value of the counters dictionary to an empty object */
  counters = {}


  /* Sets lastCardFlipped back to null */
  lastCardFlipped = null;


  /* Sets up a new game */
  setUpGame();

}

// Sets up the game
setUpGame();
