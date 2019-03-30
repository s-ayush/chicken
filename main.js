// Parameters
let resourceValue = 50;
let damageValue = 100;
let numberOfRounds = 10;
let initialFitness = 1000;

// Setup
let valSpan = document.querySelector('#value');
valSpan.textContent = resourceValue;
let roundSpan = document.querySelector('#num-rounds');
roundSpan.textContent = numberOfRounds;

let attackButton = document.querySelector('#attack-btn');
let retreatButton = document.querySelector('#retreat-btn');

function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
}

function updateScore() {
	let playerScore = document.querySelector('#player-score');
	playerScore.textContent = playerBird.fitness;

	let cpuScore = document.querySelector('#cpu-score');
	cpuScore.textContent = cpuBird.fitness;

	let currentRound = document.querySelector('#round');
	currentRound.textContent = round;

	document.querySelector('#player-strategy').textContent =
		playerBird.strStrategy();
	document.querySelector('#cpu-strategy').textContent =
		cpuBird.strStrategy();
}

function declareWinner() {
	if (round >= numberOfRounds) {
		attackButton.disabled = true;
		retreatButton.disabled = true;

		let scoreBoard = document.querySelector('#score-board');
		let winnerBanner = document.createElement('h3');
		if (playerBird.fitness > cpuBird.fitness) {
			winnerBanner.textContent = 'Human player wins!';
		} else if (playerBird.fitness < cpuBird.fitness) {
			winnerBanner.textContent = 'CPU wins!';
		}

		scoreBoard.appendChild(winnerBanner);
	}
}

// Bird object
function Bird(fitness) {
	this.fitness = fitness;
	this.strategy = 0;

	this.strStrategy = function() {
		if (this.strategy === 0) {
			return 'retreat';
		} else if (this.strategy === 1) {
			return 'attack';
		}
	}

	this.changeFitness = function(fit) {
		this.fitness += fit;
	}

	this.attack = function() {
		this.strategy = 1;
	}

	this.retreat = function() {
		this.strategy = 0;
	}

	this.random = function() {
		this.strategy = getRandomInt(2);
	}

	this.fight = function(other) {
		if (this.strategy > other.strategy) {
			this.changeFitness(resourceValue)

		} else if (this.strategy < other.strategy) {
			other.changeFitness(resourceValue)

		} else if (this.strategy === other.strategy) {
			if (this.strategy === 1) {
				this.changeFitness((resourceValue - damageValue)/2)
				other.changeFitness((resourceValue - damageValue)/2)

			} else if (this.strategy === 0) {
				this.changeFitness(resourceValue/2)
				other.changeFitness(resourceValue/2)
			}
		}

		// Not OOP. Bad!
		round += 1;
		updateScore();
		declareWinner();
	}
}

// Main stuff
let playerBird = new Bird(initialFitness);
let cpuBird = new Bird(initialFitness);

let round = 1;

attackButton.onclick = function() {
	playerBird.attack();
	cpuBird.random();
	playerBird.fight(cpuBird);
}

retreatButton.onclick = function() {
	playerBird.retreat();
	cpuBird.random();
	playerBird.fight(cpuBird);
}

updateScore();
