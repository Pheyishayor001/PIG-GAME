'use strict';

// Selecting elements El === Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditons
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

console.log(score0El, score1El, diceEl, btnRoll, btnNew, btnHold);

// this needs to be defined out of the click function below so it isnt changed after every click.

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; //setting the active player to 0 helps make the tenary operator switch between player 0(1) & 1(2)
let playing = true; // this boolean value implements the game-over state.

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // reset the score to 0

  currentScore = 0; //reset current variable to 0.

  activePlayer = activePlayer === 0 ? 1 : 0; // using the tenary operator to switch active player from 0(1) to 1(2). and immeditely saving it to the activePlayer variable.

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random dice roll.
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    diceEl.classList.remove('hidden');
    // below the number of the dice rolled will be the img of dice displayed
    diceEl.src = `dice-${dice}.png`;

    // 3. check for a rolled 1.
    if (dice !== 1) {
      //   add dice to current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //dynamically selecting the active player.
    } else {
      // if 1 is rolled used function above to switch player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1 . Add current score to the Active player's score.
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    //this score will be added to the array above. the reason for using player 0 & 1 is because arrays are 0 index based.
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100

    if (scores[activePlayer] >= 20) {
      //  finish the game
      playing = false; // when the >=20 becomes true, the playing=false variable is read, thus deactivating the roll dice and hold button.

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // add the winner CSS Style
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // remove the active CSS Style

      diceEl.classList.add('hidden'); //hidding the dice upon win
    } else {
      // switch to the next player
      switchPlayer(); // this function as defined above will switch player.
    }
  }
});
