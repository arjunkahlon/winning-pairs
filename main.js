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

let deck = [];
const $player1Container = document.querySelector('#player1-container');
const $player2Container = document.querySelector('#player2-container');
const $playAgain = document.querySelector('#play-again-button');

document.addEventListener('DOMContentLoaded', event => {
  deck = generateDeck();
  playGame(deck);
});

$playAgain.addEventListener('click', () => {
  return playGame(deck);
});

const playGame = function (deck) {
  const handPlayer1 = [];
  const handPlayer2 = [];
  const handSize = 5;

  initializeHandDOM();

  if (deck.length < (handSize * 2)) {
    deck = generateDeck();
  }

  generateHands(deck, handPlayer1, handPlayer2, handSize);
  console.log('Player 1\'s Hand: ', handPlayer1);
  console.log('Player 2\'s Hand: ', handPlayer2);

  const player1Pairs = determinePairs(handPlayer1);
  const player2Pairs = determinePairs(handPlayer2);

  // Extra Credit Challenge
  // ----------------------------------------------------------------------
  // If either player has no pairs, generate a random number between 1 and
  //  100. If this number is between 1 and 90 inclusive, recursively call playGame
  //  function and redraw hands.

  if ((player1Pairs.length === 0 || player2Pairs.length === 0) &&
    (Math.random() * 100 + 1) <= 90) {
    return playGame(deck);
  } else {
    console.log('Player 1\'s Pairs: ', player1Pairs);
    console.log('Player 2\'s Pairs: ', player2Pairs);

    determineWinner(player1Pairs, player2Pairs);
    renderCards(handPlayer1, handPlayer2);
  }
};

const generateDeck = function () {
  const suits = ['spade', 'heart', 'diamond', 'club'];
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const cardBaseURL = 'https://raw.githubusercontent.com/uzair-ashraf/storage-bucket/master/cards/';
  const generatedDeck = [];

  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const newCard = {};
      newCard.rank = cards[i];
      newCard.suit = suits[j];
      newCard.cardURL = `${cardBaseURL}${suits[j]}_${cards[i]}.png`;
      newCard.pairStatus = '';
      generatedDeck.push(newCard);
    }
  }
  shuffleDeck(generatedDeck);
  return generatedDeck;
};

const shuffleDeck = function (generatedDeck) {
  let i = generatedDeck.length;
  while (--i > 0) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [generatedDeck[randomIndex], generatedDeck[i]] = [generatedDeck[i], generatedDeck[randomIndex]];
  }
};

const generateHands = function (deck, handPlayer1, handPlayer2, size) {
  for (let i = 0; i < size; i++) {
    handPlayer1.push(deck.shift());
    handPlayer2.push(deck.shift());
  }
};

const determinePairs = function (hand) {
  const pairs = [];

  for (let i = 0; i < hand.length - 1; i++) {
    const subPairs = [];
    for (let j = i + 1; j < hand.length; j++) {
      if (hand[i].rank === hand[j].rank) {
        if (pairs.length === 0) {
          if (subPairs.length === 0) {
            subPairs.push(hand[i].rank);
            subPairs.push(hand[j].rank);
          } else {
            subPairs.push(hand[j].rank);
          }
          hand[i].pairStatus = 'pair0';
          hand[j].pairStatus = 'pair0';
        } else if (!pairs[0].includes(hand[i].rank)) {
          if (subPairs.length === 0) {
            subPairs.push(hand[i].rank);
            subPairs.push(hand[j].rank);
          } else {
            subPairs.push(hand[j].rank);
          }
          hand[i].pairStatus = 'pair1';
          hand[j].pairStatus = 'pair1';
        }
      }
    }
    if (subPairs.length > 0) {
      pairs.push(subPairs);
    }
  }
  return pairs;
};

const determineWinner = function (player1Pairs, player2Pairs) {
  if (player1Pairs.length > player2Pairs.length) {
    console.log('Player 1 has more pairs. Player 1 has won!');
    return renderWinner($player1Container);
  } else if (player2Pairs.length > player1Pairs.length) {
    console.log('Player 2 has more pairs. Player 2 has won!');
    return renderWinner($player2Container);
  } else {
    if (player1Pairs.length !== 0 && player2Pairs.length !== 0) {
      return tieBreaker(player1Pairs, player2Pairs);
    }
  }
  console.log('Neither player has any pairs. There is no winner.');
};

const tieBreaker = function (player1Pairs, player2Pairs) {
  const player1PairCardCount = calculatePairCardCount(player1Pairs);
  const player2PairCardCount = calculatePairCardCount(player2Pairs);

  if (player1PairCardCount > player2PairCardCount) {
    console.log('Player 1 has more paired cards and has won!');
    return renderWinner($player1Container);
  } else if (player2PairCardCount > player1PairCardCount) {
    console.log('Player 2 has more paired cards and has won!');
    return renderWinner($player2Container);
  }

  // Final Tie Breaker. Calculate the total number if pairs are the same and
  //    number of cards are the same

  const player1Total = calculateTotal(player1Pairs);
  const player2Total = calculateTotal(player2Pairs);

  if (player1Total > player2Total) {
    console.log('Player 1 has won with a higher total rank!');
    renderWinner($player1Container);
  } else if (player2Total > player1Total) {
    console.log('Player 2 has won with a higher total rank!');
    renderWinner($player2Container);
  } else {
    console.log('Both Players have equal total ranks. Draw!');
  }
};

const calculatePairCardCount = function (pairs) {
  let pairCount = 0;

  if (pairs.length > 1) {
    pairCount += pairs[0].length + pairs[1].length;
  } else {
    pairCount = pairs[0].length;
  }
  return pairCount;
};

const calculateTotal = function (pairs) {
  let total = 0;

  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < pairs[i].length; j++) {
      total += convertRank(pairs[i][j]);
    }
  }
  return total;
};

const convertRank = function (rank) {
  switch (rank) {
    case 'A':
      return 14;
    case 'K':
      return 13;
    case 'Q':
      return 12;
    case 'J':
      return 11;
    default:
      return parseInt(rank);
  }
};

// DOM Functionality

const renderCards = function (hand1, hand2) {

  for (let i = 0; i < hand1.length; i++) {
    $player1Container.appendChild(
      createElement(
        'img', {
          src: hand1[i].cardURL,
          alt: `Image - Suit: ${hand1[i].suit} Rank: ${hand1[i].rank}`,
          class: `card ${hand1[i].pairStatus}`
        }, []
      )
    );
    $player2Container.appendChild(
      createElement(
        'img', {
          src: hand2[i].cardURL,
          alt: `Image - Suit: ${hand2[i].suit} Rank: ${hand2[i].rank}`,
          class: `card ${hand2[i].pairStatus}`
        }, []
      )
    );

  }
};

const renderWinner = function (playerContainer) {
  playerContainer.parentElement.classList.add('winning');
};

const createElement = function (tagName, attributes, children) {
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
};

const initializeHandDOM = function () {
  if ($player1Container.hasChildNodes || $player2Container.hasChildNodes) {
    removeAllChildren($player1Container);
    removeAllChildren($player2Container);
    $player1Container.parentElement.className = 'hand';
    $player2Container.parentElement.className = 'hand';
  }

};

const removeAllChildren = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
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
