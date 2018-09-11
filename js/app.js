/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

  }

  return array;
}

var figuraAberta = [];
var movimentos = 0;
var acertos = 0;

const items = document.querySelectorAll('.card'); 
arr = shuffle(items);

for (var i = 0; i < 16; i++) {
	items[i] = arr[i];
}

const btn_reiniciar = document.getElementsByClassName("restart")[0];
const playAgain = document.getElementById("playAgain");

btn_reiniciar.addEventListener('click', function(){
	reiniciar();
});

playAgain.addEventListener('click', function(){
	reiniciar();
});

for (let i = 0; i <= 15; i++) { 
    const item = items[i]; 
    item.addEventListener('click', function () { 
		if(verificarfigura(item) == false) {
			abrirfigura(item, i);
		} 

		setTimeout(function() {
			verificarMatch();
		},600);
		incrementarMovimentos();
		analisarEstrelas();
		verificarFimDeJogo();
	});
} 

function abrirfigura(elemento, i) {
	elemento.classList.add("open");
	setTimeout(function() {
		elemento.classList.add("show");
	},200);
	figuraAberta.push(i);
	
}

function fecharfigura(elemento) {
	elemento.classList.add("erro");
	setTimeout(function() {
		elemento.classList.remove("erro");
		elemento.classList.remove("show");
		elemento.classList.remove("open");
	},400);

	
}

function verificarfigura(elemento) {
	return elemento.classList.contains("open");
}

function verificarMatch(){
	if(figuraAberta.length == 2){
		if(items[figuraAberta[0]].querySelector('i').className  == items[figuraAberta[1]].querySelector('i').className ){
			fixarFigurasIguais();
			acertos++;
		} else {
			figurasDiferentes();
		}
		figuraAberta = [];
	}
}

function fixarFigurasIguais(){
	fecharfigura(items[figuraAberta[0]]);
	fecharfigura(items[figuraAberta[1]]);
	items[figuraAberta[0]].classList.add("match");
	items[figuraAberta[1]].classList.add("match");
}

function figurasDiferentes(){
	fecharfigura(items[figuraAberta[0]]);
	fecharfigura(items[figuraAberta[1]]);
}

function incrementarMovimentos(){
	movimentos++;
	document.getElementsByClassName("moves")[0].innerHTML = movimentos;
}

function analisarEstrelas(){
	estrelas = document.getElementsByClassName("fa-star");

	if(movimentos >= 18){
		estrelas[2].classList.remove("cor");
	}
	if(movimentos >= 22){
		estrelas[1].classList.remove("cor");
	}
	if(movimentos >= 26){
		estrelas[0].classList.remove("cor");
	}
	
}

function reiniciar(){
	figuraAberta = [];
	for (let i = 0; i <= 15; i++) { 
	    items[i].classList.remove("match");
	    items[i].classList.remove("open");
	    items[i].classList.remove("show");
	} 
	acertos = 0;
	movimentos = -1;
	incrementarMovimentos();
	estrelas[0].classList.add("cor");
	estrelas[1].classList.add("cor");
	estrelas[2].classList.add("cor");

	document.getElementsByClassName("container")[1].classList.add("invisivel");
	document.getElementsByClassName("container")[0].classList.remove("invisivel");
}

function verificarFimDeJogo(){
	if(acertos == 8){
		document.getElementById("texto").innerHTML = "With "+ movimentos +" moves and "+ document.getElementsByClassName("cor").length +" Stars.";
		document.getElementsByClassName("container")[0].classList.add("invisivel");
		document.getElementsByClassName("container")[1].classList.remove("invisivel");
	}
}

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
