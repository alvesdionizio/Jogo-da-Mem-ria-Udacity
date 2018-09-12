'use strict'
var figuraAberta = [];
var movimentos = 0;
var acertos = 0;
var arr;
var estrelas;
var start = new Date().getTime();
var end;
var items = document.querySelectorAll('.card'); 

const btn_reiniciar = document.getElementsByClassName("restart")[0];
const playAgain = document.getElementById("playAgain");
const indice = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

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


function embaralhar() {
	timer();
	items = document.querySelectorAll('.card');
	arr = shuffle(indice);

	for (var i = 0; i < 16; i++) {
		var elemento = items[arr[i]].cloneNode(true);
		var destino = document.querySelectorAll('.card')[i];
		destino.replaceWith(elemento);
	}

	items = document.querySelectorAll('.card');

	for (let i = 0; i <= 15; i++) { 
	    const item = items[i]; 
	    item.addEventListener('click', function () { 
			if(verificarfigura(item) == false) {
				abrirfigura(item, i);
				setTimeout(function() {
					verificarMatch();
				},600);
				incrementarMovimentos();
				analisarEstrelas();
				
			} 
			
		});
	} 
}

embaralhar();

btn_reiniciar.addEventListener('click', function(){
	reiniciar();
});

playAgain.addEventListener('click', function(){
	reiniciar();
});

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
			acertos++;
			fixarFigurasIguais();
			verificarFimDeJogo();
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
	
}

function reiniciar(){
	embaralhar();
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
	start = new Date().getTime();

}

function verificarFimDeJogo(){
	if(acertos == 8){
		end = new Date().getTime();
		document.getElementById("texto").innerHTML = "With "+ movimentos +" moves, "+ (end-start)/1000 +" seconds and "+ document.getElementsByClassName("cor").length +" Stars.";
		document.getElementsByClassName("container")[0].classList.add("invisivel");
		document.getElementsByClassName("container")[1].classList.remove("invisivel");
	}
}

function timer () {
    setInterval(function() {
        end = new Date().getTime();
        document.getElementsByClassName("tempo")[0].innerHTML = "Tempo: "+(end-start)/1000;
    });
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
