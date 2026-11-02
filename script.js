/*************************************************************************
 /*
 *
 *
 *
 **/

 /*Modifié par : Hard_Gim
 Mail : damien.serres@ac-rennes.fr
 Pour un exercice en BTS SIO :
 - retrait de l'usage de jQuery
 Date : 20/10/2025 - MAJ : 12/10/2026
 *************************************************************************/
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var tailleCanvasX = canvas.getAttribute("width");
var tailleCanvasY = canvas.getAttribute("height");

var caseSize = Math.min(tailleCanvasX / 3, tailleCanvasY / 3);
var margin = 25;

var isPlayerOne = true;
var isTheEnd = false;
var nbCaseFull = 0;
var isCaseFull = new Array(
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
);
var casesPlayer1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var casesPlayer2 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var nbManchesPlayed = 0;

function drawGrid() {
  context.strokeStyle = "#181818";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(caseSize, margin);
  context.lineTo(caseSize, 3 * caseSize - margin);
  context.moveTo(2 * caseSize, margin);
  context.lineTo(2 * caseSize, 3 * caseSize - margin);
  context.moveTo(margin, caseSize);
  context.lineTo(3 * caseSize - margin, caseSize);
  context.moveTo(margin, 2 * caseSize);
  context.lineTo(3 * caseSize - margin, 2 * caseSize);
  context.stroke();
}

function drawCross(x, y) {
  context.strokeStyle = "#00007f";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(x - caseSize / 2 + margin, y - caseSize / 2 + margin);
  context.lineTo(x + caseSize / 2 - margin, y + caseSize / 2 - margin);
  context.moveTo(x - caseSize / 2 + margin, y + caseSize / 2 - margin);
  context.lineTo(x + caseSize / 2 - margin, y - caseSize / 2 + margin);
  context.stroke();
}

function drawCircle(x, y) {
  context.strokeStyle = "#7f0000";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(x, y, caseSize / 2 - margin, 0, 2 * Math.PI, true);
  context.stroke();
}

function drawSector(x, y, i) {
  if (isPlayerOne) {
    drawCross(x, y);
    casesPlayer1[i] = 1;
    isPlayerOne = false;
    
    document.getElementById("canvas").classList.add("circle");
    document.getElementById("canvas").classList.remove("cross");

    document.getElementById("gameMessages").innerHTML =
      '<span class="player2">C\'est au joueur 2 de jouer.</span>';

    if (casesPlayer1[0] * casesPlayer1[1] * casesPlayer1[2] == 1) theEnd(1);
    else if (casesPlayer1[3] * casesPlayer1[4] * casesPlayer1[5] == 1)
      theEnd(1);
    else if (casesPlayer1[6] * casesPlayer1[7] * casesPlayer1[8] == 1)
      theEnd(1);
    else if (casesPlayer1[0] * casesPlayer1[3] * casesPlayer1[6] == 1)
      theEnd(1);
    else if (casesPlayer1[1] * casesPlayer1[4] * casesPlayer1[7] == 1)
      theEnd(1);
    else if (casesPlayer1[2] * casesPlayer1[5] * casesPlayer1[8] == 1)
      theEnd(1);
    else if (casesPlayer1[0] * casesPlayer1[4] * casesPlayer1[8] == 1)
      theEnd(1);
    else if (casesPlayer1[2] * casesPlayer1[4] * casesPlayer1[6] == 1)
      theEnd(1);
    else if (nbCaseFull == 9) theEnd(0);
  } else {
    drawCircle(x, y);
    casesPlayer2[i] = 1;
    isPlayerOne = true;

    document.getElementById("canvas").classList.add("cross");
    document.getElementById("canvas").classList.remove("circle");

    document.getElementById("gameMessages").innerHTML =
      '<span class="player1">C\'est au joueur 1 de jouer.</span>';

    if (casesPlayer2[0] * casesPlayer2[1] * casesPlayer2[2] == 1) theEnd(2);
    else if (casesPlayer2[3] * casesPlayer2[4] * casesPlayer2[5] == 1)
      theEnd(2);
    else if (casesPlayer2[6] * casesPlayer2[7] * casesPlayer2[8] == 1)
      theEnd(2);
    else if (casesPlayer2[0] * casesPlayer2[3] * casesPlayer2[6] == 1)
      theEnd(2);
    else if (casesPlayer2[1] * casesPlayer2[4] * casesPlayer2[7] == 1)
      theEnd(2);
    else if (casesPlayer2[2] * casesPlayer2[5] * casesPlayer2[8] == 1)
      theEnd(2);
    else if (casesPlayer2[0] * casesPlayer2[4] * casesPlayer2[8] == 1)
      theEnd(2);
    else if (casesPlayer2[2] * casesPlayer2[4] * casesPlayer2[6] == 1)
      theEnd(2);
    else if (nbCaseFull == 9) theEnd(0);
  }
}

/*************************************************************************
Ici pour le code à compléter
*************************************************************************/
function theEnd(player) {

  document.getElementById("canvas").classList.remove("cross");
  document.getElementById("canvas").classList.remove("circle");

  isTheEnd = true;

  nbManchesPlayed = nbManchesPlayed + 1;

  document.getElementById("nbManches").innerHTML = nbManchesPlayed + " manches";

  document.getElementById("gameMessages").innerHTML =
    '<strong class="player' + player + '">Le joueur ' + player + ' remporte la manche !</strong>' +
    '<br><br><button onClick="newMatch()">Nouvelle manche</button>' +
    '<br><button onClick="newGame()">Nouvelle partie</button>';

  if (player == 1) {
    scorePlayer1 = scorePlayer1 + 1;
    document.getElementById("score1").innerHTML = scorePlayer1 + " pt";
  } else {
    scorePlayer2 = scorePlayer2 + 1;
    document.getElementById("score2").innerHTML = scorePlayer2 + " pt";
  }
}


function newMatch() {
  var i = 0;
  context.clearRect(0, 0, tailleCanvasX, tailleCanvasY);
  drawGrid();
  isTheEnd = false;
  nbCaseFull = 0;
  for (i = 0; i < 9; i++) {
    isCaseFull[i] = false;
    casesPlayer1[i] = 0;
    casesPlayer2[i] = 0;
  }
  if (isPlayerOne) {

    document.getElementById("canvas").classList.add("cross");
    document.getElementById("canvas").classList.remove("circle");
    document.getElementById("gameMessages").innerHTML =
      '<span class="player1">C\'est au joueur 1 de jouer.</span>';
  } else {
    document.getElementById("canvas").classList.add("circle");
    document.getElementById("canvas").classList.remove("cross");
    document.getElementById("gameMessages").innerHTML =
      '<span class="player2">C\'est au joueur 2 de jouer.</span>';
  }
}

function newGame() {
  scorePlayer1 = 0;

  document.getElementById("score1").innerHTML = scorePlayer1 + " pt";
  scorePlayer2 = 0;
  document.getElementById("score2").innerHTML = scorePlayer2 + " pt";

  isPlayerOne = true;
  document.getElementById("canvas").classList.add("cross");
  document.getElementById("canvas").classList.remove("circle");

  nbManchesPlayed = 0;
  document.getElementById("nbManches").innerHTML = nbManchesPlayed + " manche";

  newMatch();
}


drawGrid();

document.getElementById("score1").innerHTML = scorePlayer1 + " pt";
document.getElementById("score2").innerHTML = scorePlayer2 + " pt";
document.getElementById("nbManches").innerHTML = nbManchesPlayed + " manche";
document.getElementById("gameMessages").innerHTML =
  '<span class="player1">C\'est au joueur 1 de jouer.</span>';
document.getElementById("canvas").classList.add("cross");
document.getElementById("canvas").classList.remove("circle");

document.getElementById("canvas").addEventListener("click", function (e) {
  var x = e.pageX - this.offsetLeft;
  var y = e.pageY - this.offsetTop;
  var centerX = 0;
  var centerY = 0;
  var col = 0;
  var row = 0;
  var index = 0;

  if (x < caseSize) {
    centerX = caseSize / 2;
    col = 0;
  } else if (x < 2 * caseSize) {
    centerX = (3 * caseSize) / 2;
    col = 1;
  } else {
    centerX = (5 * caseSize) / 2;
    col = 2;
  }

  if (y < caseSize) {
    centerY = caseSize / 2;
    row = 0;
  } else if (y < 2 * caseSize) {
    centerY = (3 * caseSize) / 2;
    row = 1;
  } else {
    centerY = (5 * caseSize) / 2;
    row = 2;
  }

  index = col + 3 * row;
  if (!isCaseFull[index] && !isTheEnd) {
    isCaseFull[index] = true;
    nbCaseFull++;
    drawSector(centerX, centerY, index);
  }
});