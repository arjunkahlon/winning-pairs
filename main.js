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

/* eslint-disable no-debugger, no-console */
/* eslint-disable no-unused-vars */

const $playAgain = document.querySelector('#play-again-button');
const $player1Container = document.querySelector('#player1-container');
const $player2Container = document.querySelector('#player2-container');

document.addEventListener('DOMContentLoaded', event => playGame());

$playAgain.addEventListener('click', () => {
  return playGame();
});

const playGame = function () {
  const deck = generateDeck();
  const handPlayer1 = [];
  const handPlayer2 = [];

  generateHands(deck, handPlayer1, handPlayer2, 10);
  console.log(handPlayer1, handPlayer2);
  // Determine Winners

  const player1Pairs = determineWinningPairs(handPlayer1);
  const player2Pairs = determineWinningPairs(handPlayer2);

  console.log(player1Pairs);
  console.log(player2Pairs);

  renderCards(handPlayer1, handPlayer2, $player1Container, $player2Container);

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
      newCard.cardURL = 'undefined';
      newCard.pairStatus = '';
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
};

const generateHands = function (deck, handPlayer1, handPlayer2, size) {
  for (let i = 0; i < size; i++) {
    handPlayer1.push(deck[i++]);
    handPlayer2.push(deck[i]);
  }
};

const determineWinningPairs = function (hand) {
  const winningPairs = [];

  for (let i = 0; i < hand.length - 1; i++) {

    const subArr = [];

    for (let j = i + 1; j < hand.length; j++) {

      if (hand[i].rank === hand[j].rank) {

        if (winningPairs.length === 0) {
          if (subArr.length === 0) {
            subArr.push(hand[i].rank);
            subArr.push(hand[j].rank);
          } else {
            subArr.push(hand[j].rank);

          }

          hand[i].pairStatus = 'pair0';
          hand[j].pairStatus = 'pair0';
        } else if (!winningPairs[0].includes(hand[i].rank)) {
          if (subArr.length === 0) {
            subArr.push(hand[i].rank);
            subArr.push(hand[j].rank);
          } else {
            subArr.push(hand[j].rank);
          }

          hand[i].pairStatus = 'pair1';
          hand[j].pairStatus = 'pair1';
        }
      }
    }
    if (subArr.length > 0) {
      winningPairs.push(subArr);
    }
  }
  return winningPairs;
};

// DOM Functionality

function renderCards(hand1, hand2, $player1Container, $player2Container) {

  for (let i = 0; i < hand1.length; i++) {
    $player1Container.appendChild(createElement('img', { src: hand1[i].imgURL, class: `card ${hand1[i].pairStatus}` }, []));
    $player2Container.appendChild(createElement('img', { src: hand2[i].imgURL, class: `card ${hand2[i].pairStatus}` }, []));

  }
}

function createElement(tagName, attributes, children) {
  const $element = document.createElement(tagName);
  for (const name in attributes) {
    $element.setAttribute(name, attributes[name]);
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i] instanceof HTMLElement) {
      $element.appendChild(children[i]);
    } else {
      $element.appendChild(document.createTextNode(children[i]));
    }
  }
  return $element;
}

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
