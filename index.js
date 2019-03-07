var board = [];
var tour = 1;
var joueur;
var question;
var input;

function prmpt(message, typeValeur, idValeur) {
  question = document.createElement('div');
  let titre = document.createElement('h2');
  input = document.createElement('input');
  let button = document.createElement('button');
  input.setAttribute("type", typeValeur);
  input.setAttribute("id", idValeur);
  button.setAttribute("value", "OK");
  titre.innerHTML = message;
  button.addEventListener("click", valide);
  document.body.appendChild(question);
  question.appendChild(titre);
  question.appendChild(input);
  question.appendChild(button);
}

function fillBoard() {
  for (let i = 0; i < 10; i++) {
	board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}

function gameTour() {
  tour += 1;
  if (tour === 3) tour = 1;
  gestion();
}

function gestion() {
  if (tour === 1) {
	prmpt("Tour de"+" "+joueur+" "+"Dans quelle colonne voulez-vous jouer?", "number", "inputNombre");
  }
else machineTour();
}

function jouer(x) {
  for (let i = board.length-1; i >= 0; i--) {
	if (board[i][x] === 0) {
		board[i][x] = tour;
		console.table(board);
		gameWin(i, x);
		break;
	}
  }
}

function machineTour() {
  rand = Math.floor(Math.random() * 10);
  jouer(rand);
}

function valide() {
  if (input.getAttribute("id") == "inputName") {
	joueur = input.value;
	console.log("Salut"+" "+joueur);
	document.body.removeChild(question);
 	gestion();
  }
else {
  	document.body.removeChild(question);
  	jouer(input.value);
  }
}

function gameWin(i, x) {
  var col = parseInt(x, 10);
  var row = parseInt(i, 10);
  for (let k = -3; k < 1; k++) {
	let okHori = 0;
	let okVerti = 0;
	let okDiag1 = 0;
	let okDiag2 = 0;
	for (let c = 0; c < 4; c++) {
	  if (board[((row+k)+c)] != undefined && board[((row+k)+c)][col] === tour) {
		okVerti +=1;
	  }
	  if (board[row][((col+k)+c)] != undefined && board[row][((col+k)+c)] === tour) {
		okHori +=1;
	  }
	  if (board[((row+k)+c)] != undefined && board[((row+k)+c)][((col+k)+c)] != undefined && board[((row+k)+c)][((col+k)+c)] === tour) {console.log(board[((row+k)+c)][((col+k)+c)]);
		okDiag1 +=1;
	  }
	  if (board[((row+k)+c)] != undefined && board[((row+k)+c)][((col-k)-c)] != undefined && board[((row+k)+c)][((col-k)-c)] === tour) {
		okDiag2 +=1;
	  }
	}
	if (okHori === 4 || okVerti === 4 || okDiag1 === 4 || okDiag2 ===4) {
	  if (tour === 1) {alert("Felicitation, vous avez gagné!"); document.location.reload(true);}
	else {alert("Dommage... la machine vous a battut"); document.location.reload(true)}
	}
  }
  gameTour();
}

fillBoard();
prmpt("Quel est votre pseudo?", "text", "inputName");