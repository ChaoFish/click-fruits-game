function randomEmotion() {
	var emotionName = Math.floor(Math.random() * 9) + 1;
	emotionNode.src = "images/" + emotionName + ".png";
}

function randomPosition() {
	var emotionPositionX = Math.ceil(Math.random() * 95) + 2;
	emotionNode.style.left = emotionPositionX + "%";
	emotionNode.style.top = 0;
}

function emotionFall() {
	emotionPositionY += speed;
	emotionNode.style.top = emotionPositionY + "px";
	if (emotionPositionY >= 465) {
		losePoint++;
		lose.innerHTML = "Lose Point: " + losePoint;
		if (losePoint >= 5) {
			gameOver();
		}
		else {
			emotionRefresh();
		}
	}
	if (emotionPositionY < 465 && stopGame == false) {
		requestAnimationFrame(emotionFall);
	}
}

function emotionRefresh() {
	emotionPositionY = 0;
	randomEmotion();
	randomPosition();
}

function gameOver() {
	blackAreaRule.style.display = "block";
	overRule.style.display = "block";
	refreshGame = false;
}

function gameStart() {
	refreshGame = true;
	speed = 1;
	scorePoint = 0;
	losePoint = 0;
	score.innerHTML = "Score: 0";
	lose.innerHTML = "Lose Point: 0";
	blackAreaRule.style.display = "none";
	overRule.style.display = "none";
	emotionRefresh();
	emotionFall();
}

function gameRefresh() {
	speed = 1;
	scorePoint = 0;
	losePoint = 0;
	score.innerHTML = "Score: 0";
	lose.innerHTML = "Lose Point: 0";
	emotionRefresh();
}

function gamePause() {
	stopGame = true;
	pause.innerHTML = "Continue";
}

function gameContinue() {
	stopGame = false;
	pause.innerHTML = "Pause";
	emotionFall();
}

var emotionNode = document.getElementsByTagName('img')[0],
	refreshGame = false,
	stopGame = false,
	emotionPositionY,
	scorePoint,
	losePoint,
	speed,
	score = document.getElementsByClassName("score")[0],
	lose = document.getElementsByClassName("lose")[0],
	start = document.getElementsByClassName("start")[0],
	pause = document.getElementsByClassName("pause")[0],
	sheet = document.styleSheets[0],
	styleRules = sheet.cssRules || sheet.rules,
	blackAreaRule = styleRules[0],
	overRule = styleRules[1],
	imgRule = styleRules[2];

start.addEventListener("click", function() {
	if (refreshGame == false) {
		gameStart();
	}
	else {
		gameRefresh();	
	}
});

pause.addEventListener("click", function() {
	if (stopGame == false) {
		gamePause();
	}
	else {
		gameContinue();
	}
})
emotionNode.addEventListener("click", function() {
	scorePoint++;
	score.innerHTML = "Score: " + scorePoint;
	var preSpeed = speed + 0.2;
	speed = 0.5;
	imgRule.style.animation = "fade-out 0.5s";
	imgRule.style["-webkit-animation"] = "fade-out 0.5s";
	setTimeout(function() {
		speed = preSpeed;
		emotionRefresh();
		imgRule.style.animation = undefined;
		imgRule.style["-webkit-animation"] = undefined;
	}, 500);
});