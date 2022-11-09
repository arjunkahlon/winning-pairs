/*
  # Programming Proficiency Test

  Assumes basic JavaScript knowledge; jQuery knowledge helps a lot.

  ## Exercises

  1. Clicking the button should generate two random hands in memory (console.log).
  2. Clicking the button should render two random hands on the page as cards.
  3. Determine the winning hand by its number of pairs, add class="winning" to hand.
  4. Determine winning pairs and add class="pair0" (or "pair1" for 2nd pair) to cards.
  5. [Extra Credit] Ensure that 90% of hands have at least one pair.

*/

const playAgain = document.querySelector('#play-again-button');
playAgain.addEventListener('click', () => {
  return playGame();
});

const playGame = function () {
  const deck = generateDeck();
  const handPlayer1 = [];
  const handPlayer2 = [];

  generateHands(deck, handPlayer1, handPlayer2);
  // console.log(handPlayer1, handPlayer2);
};

const generateDeck = function () {
  const suits = ['spade', 'heart', 'diamond', 'club'];
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const cardBaseURL = 'http://h3h.net/images/cards/{suit}_{card}.svg';
  const deck = [];

  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const newCard = {};
      newCard.rank = cards[i];
      newCard.suits = suits[j];
      newCard.cardURL = cardBaseURL;
      deck.push(newCard);
    }
  }
  shuffleDeck(deck);
  return deck;
};

const shuffleDeck = function (deck) {
  // Fisher-Yates Algorithm
  let i = deck.length;
  while (--i > 0) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[randomIndex], deck[i]] = [deck[i], deck[randomIndex]];
  }
  // console.log(deck);
};

const generateHands = function (deck, handPlayer1, handPlayer2) {
  for (let i = 0; i < 10; i++) {
    handPlayer1.push(deck[i++]);
    handPlayer2.push(deck[i]);
  }
};

/*

The MIT License

Copyright (c) 2012 Brad Fults.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
