var highScore = 0;
var score = 0;
var count = 0;
var timeLeft = 120;
var globalStates = [];
var abbreviations = {};
var gameOver = false;
var timer = setInterval(function() { updateTimer() }, 1000);

function shuffle(array) {
	for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return array;
}

function renderState() {
	if(count <= 50) {
		if(count !== 0) {
			if(document.getElementById("inputState").value.toLowerCase().replace(/^\s+|\s+$/g, '') === globalStates[count-1].toLowerCase() || 
				document.getElementById("inputState").value.toLowerCase().replace(/^\s+|\s+$/g, '') === abbreviations[globalStates[count-1]].toLowerCase()) {
				score += 1;
				document.getElementById("currentScore").innerHTML = "Current Score: " + score;
				if(score > highScore) {
					highScore = score;
					document.getElementById("highScore").innerHTML = "High Score: " + highScore;
				}
			}
			document.getElementById("state").innerHTML = "Previous State: " + globalStates[count-1];
		}

		if(count < 50) {
			document.getElementById("flag").src = window.location.href.substring(0, window.location.href.length-11) + "/images/" + globalStates[count].toLowerCase().replace(" ", "") + ".gif";
		}
	} else if(!gameOver) {
		gameOver = true;
		count = 51;
		alert("GAME OVER! Score: " + score);
	}
	document.getElementById("inputState").value = "";
	count += 1;
}

function restart() {
	gameOver = false;
	globalStates = shuffle(globalStates);
	count = 0;
	if(score > highScore) {
		highScore = score;
		document.getElementById("highScore").innerHTML = "High Score: " + highScore;
	}
	score = 0;
	document.getElementById("currentScore").innerHTML = "Current Score: " + score;
	document.getElementById("inputState").value = "";
	renderState();
	document.getElementById("timeLeft").innerHTML = "Time Remaining: " + 120 + " seconds";
	startTimer(120);
}

function updateTimer() {
	timeLeft -= 1;
	if(timeLeft >= 0) {
		document.getElementById("timeLeft").innerHTML = "Time Remaining: " + timeLeft + " seconds";
	} else if(!gameOver) {
		gameOver = true;
		count = 51;
		alert("GAME OVER! Score: " + score);
	}
}

function startTimer(time) {
	timeLeft = time;
	timer.clearInterval();
	timer = setInterval(function() { updateTimer() }, 1000);
}

function main(states) {
	globalStates = states;
	renderState();
}