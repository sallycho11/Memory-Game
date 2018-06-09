/*
 * Create a list that holds all of your cards
 */

let cardList = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
let clickedCards = [];
let countMatches = 0;
let moves = 0;
let gameStarted = false;
let timer = new Timer();

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

function createBoard() {
	shuffle(cardList);
	for (let i=0; i < cardList.length; i++) {
		$('.deck').append('<div class="card"><i class="fa fa-' + cardList[i] + '"></i></div>');
	}
}

function flipCard(card) {
	// Flip card
	if (clickedCards.length < 2) {
		$(this).toggleClass('open show');

		// Start Timer
		if (gameStarted === false) {
			gameStarted = true;
			timer.start();
		}

		countMoves();

		// First click
		if (clickedCards.length === 0) {
			clickedCards.push($(this));

		// Second click	
		} else if (clickedCards.length === 1) {
				clickedCards.push($(this));

				// Check for a match
				if (clickedCards[0][0].firstChild.className === clickedCards[1][0].firstChild.className) {
					countMatches += 2;
					clickedCards.forEach(function(card) {
						card.off('click');
					});
					clickedCards = [];

					// Reset game if you won
					if (cardList.length === countMatches) {
						showResults();
					}
				} else {

					//flip the cards over if it isn't a match
					function flipCardsOver() {
						clickedCards[0].toggleClass('show open');
						clickedCards[1].toggleClass('show open');
						clickedCards = [];
				}
				setTimeout(flipCardsOver, 400);				
			}
		}
	}
}

function countMoves() {
	if (clickedCards.length % 2 === 0) {
		moves += 1;
		if (moves === 15) {
		    keepScore();
		} else if (moves === 25) {
			keepScore();
		}
		$('.moves').text(moves);
	}
}

function keepScore() {
    $('.stars').children()[0].remove();
    $('.stars').append('<li><i class="fa fa-star-o"></i></li>');
}

function checkWin() {
	countMatches += 1;
	if (cardList.length === countMatches) {
		showResults();
	}
}

// Reset Game
function reset() {
	clickedCards = [];
	countMatches = 0;
	moves = 0;
	$('.moves').text(moves);
	$('.deck').empty();
	$('.stars').empty();
	// Add filled stars
	$('.stars').append('<li><i class="fa fa-star" style="margin-right: 4.3px;"></i></li>');
	$('.stars').append('<li><i class="fa fa-star" style="margin-right: 4.3px;"></i></li>');
	$('.stars').append('<li><i class="fa fa-star"></i></li>');
	timer.stop();
	$('#timer').html("00:00:00");
	gameStarted = false;
	startGame();
}

// Reset Button
$('.restart').click(reset);


// Start game
function startGame() {
	createBoard();
	$('.card').click(flipCard);
}

// Timer
timer.addEventListener('secondsUpdated', function (e) {
	$('#timer').html(timer.getTimeValues().toString());
});

function showResults() {
	$('.modal-body').html('');
	moves += 1;
	$('.moves').text(moves);
	timer.pause();
	let scoreResults = `
	    <p>
	        <span class="score-titles">Moves:</span>
	        <span class="score-values">${moves}</span>
	        <span class="score-titles">Time:</span>
	        <span class="score-values">${timer.getTimeValues().toString()}</span>
	    </p>
	    <div class="text-center margin-top-2">
	         <div class="starScore">
	            <i class="fa fa-star fa-3x"></i>    
	         </div>
	         <div class="starScore">
	            <i class="fa ${ (moves > 25) ? "fa-star-o" : "fa-star"}  fa-3x"></i>    
	         </div>
	        <div class="starScore">
	            <i class="fa ${ (moves > 15) ? "fa-star-o" : "fa-star"} fa-3x"></i>    
	         </div>
	    </div>
	    <div class="btn" id="restartGame">PLAY AGAIN :)</div>`;
	$('.modal').removeAttr('id');
	$('.modal-body').append($(scoreResults));
	$('.starScore').css('display', 'inline');
	$('.modal').css('display', 'block');
	$('#restartGame').click(reset);
	$('.btn').click(function() {
		$('.modal').css('display', 'none');
	});
}

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
