
//hard code game board and cards on board

	//create array for human and computer and append to html

$('#human-hand-div').droppable({
	accept: '.human-card',
	drop: function(event, ui){
		$('#human-hand-div').append(ui.draggable)
	},
})

const gameBoard =[ 	[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
]

for (let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('#human-gameboard').append(`<div class="human-row-${i} human-row game-row"></div>`)
	for(let x = 0; x < row.length; x++){
		const square = row[x];
		const squareDiv = $(`<div class="square human-square human-droppable" id="human-square-${x}-${i}"></div>`)
		$(`.human-row-${i}`).append(squareDiv)
		squareDiv.droppable({
			accept: '.human-card',
			drop: function(event, ui){
				$(squareDiv).append(ui.draggable)
				if(ui.draggable.hasClass("hull-class")){
					const moveHull = humanhullPartsInHand.splice(humanhullPartsInHand[i]);
					humanhullPartsInPlay.push(moveHull);
		 			console.log(humanhullPartsInHand);
				}
				if(ui.draggable.hasClass("gun-class")){
					const moveGun = humangunPartsInHand.splice(humangunPartsInHand[i]);
					humangunPartsInPlay.push(moveGun);
		 			console.log(humangunPartsInHand);
				}
			},
		})
	}
}

for (let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('#alien-gameboard').append(`<div class="alien-row-${i} alien-row game-row"></div>`)
	for(let x = 0; x < row.length; x++){
		const square = row[x];
		const squareDiv = $(`<div class="square alien-droppable alien-square" id="alien-square-${x}-${i}"></div>`)
		$(`.alien-row-${i}`).append(squareDiv)
		squareDiv.droppable({
			
			accept: '.human-card',
			drop: function(event, ui){
				$(squareDiv).append(ui.draggable)
			}
		});
	}
	
}

//creat classes for hull and gun to be able to generate objects from for human and alien

class Hull {
	constructor(integrity){
		this.integrity=integrity;
	}

}

class Gun {
	constructor(damage, integrity){
		this.damage = damage
		this.integrity = integrity
	}
	attackhull(target){
		target.integrity = target.integrity-this.damage
		console.log(target)
	}
	attackgun(target){
		target.integrity = target.integrity-this.damage
		console.log(target)
	}
	checkPartDestroyed(target, div){
		if(target.integrity <= 0){
			$(div).removeClass("gun-class");
		}
	}
}

//generate 2 guns and one hull for both

const alienHull = new Hull(1)
const alienGun = new Gun(1, 1)

const humanHull = new Hull(10)
const humanGun = new Gun(1, 3)



//humans can target other cards to do damage
//alienGun.attackhull(humanHull) check check

//create human object to hold on to human actions, needs cards in hand, construction functions and attack functions

//issue with scope in wtih these

humanhullPartsInHand = [];
humanhullPartsInPlay = [];
humanhullPartsDestroyed = [];
humangunPartsInHand = [];
humangunPartsInPlay = [];
humangunPartsDestroyed = [];
humanShotThisRound = []; 

alienhullPartsInHand = [];
alienhullPartsInPlay = [];
alienhullPartsDestroyed = [];
aliengunPartsInHand = [];
aliengunPartsInPlay = [];
aliengunPartsDestroyed = [];
alienShotThisRound = []; 

gameDeck=[];
gameWinner = false;

const human ={
	life :  humanHull.integrity,
	playHull: function(){
		$(".human-hull-class").draggable({disabled: false });
	},
	addToShip: function(){ 
		$(".human-gun-class").draggable({disabled: false });
	},	
	
	attack: function(){
		console.log(humangunPartsInPlay)
		for(let i =0; i < humangunPartsInPlay.length; i++){
			enemyTargeting();
			const firedGuns = humangunPartsInPlay.splice(humangunPartsInPlay[0]);
			humanShotThisRound.push(firedGuns);
			console.log(humanShotThisRound);
		}
		
	}
}

//create alien object to keep track aliens stuff, cards in hand, cards in play, life, construction and play -- reach goal, setup/ai/random for computer

const alien = {
	life : alienHull.integrity, 
	playHull: function(){
		$(".alien-hull-class").draggable({disabled: false });
	},
	addToShip: function(){ 
		$(".alien-gun-class").draggable({disabled: false });
	},	
	
	attack: function(){
		console.log(aliengunPartsInPlay)
		for(let i =0; i < aliengunPartsInPlay.length; i++){
			enemyTargeting();
			const firedGuns = aliengunPartsInPlay.splice(aliengunPartsInPlay[0]);
			alienShotThisRound.push(firedGuns);
			console.log(alienShotThisRound);
		}
		
	}
}

//create game object to keep track of game needs 1) deal parts at the start of the game 2) deal parts each round, 3) different phases of game play [draw, construction, attack] 4) switching play to alien and back to human gameDeck : [humanHull, humanGun, alienHull, alienGun],


const game = {
	
	buildDeck : function(){
		gameDeck.push(humanHull);
		gameDeck.push(humanGun);
		gameDeck.push(alienHull);
		gameDeck.push(alienGun);

	},
	dealHuman : function(){ 

	//deal out the hull card
		let moveCard = gameDeck.splice(0,1);
		humanhullPartsInHand.push(moveCard[0]);
		for (let i =0; i < humanhullPartsInHand.length; i++){
			const hullDiv = $(`<div id="human-hull-${i}" class="human-card hull-class human-hull-class"> Hull Card </div>`)
			hullDiv.appendTo ("#human-hand-div");
			hullDiv.draggable({
				containment: '.human-side',
				helper:'clone',
			})
		}	
	//deal out gun parts --> with more advanced features this will deal ALL ship parts
		moveCard = gameDeck.splice(0,1);
		humangunPartsInHand.push(moveCard[0]);
		for (let i =0; i < humangunPartsInHand.length; i++){
			const gunDiv = $(`<div id="human-gun-${i}" class="human-card gun-class human-gun-class"> Gun card </div>`)
			gunDiv.appendTo ("#human-hand-div");
			gunDiv.draggable({
				containment: '.human-side',
				helper: 'clone',
				// class: {
				// 	"ui-draggable": "test"
				// }
			})
		}		
	},
	dealAlien : function(){ 
	//deal out the hull card
		let moveCard = gameDeck.splice(0,1);
		alienhullPartsInHand.push(moveCard[0]);
		for (let i =0; i < alienhullPartsInHand.length; i++){
			const hullDiv = $(`<div id="alien-hull-${i}" class="alien-card hull-class alien-hull-class"> Hull Card </div>`)
			hullDiv.appendTo ("#alien-hand-div");
			hullDiv.draggable({
				containment: '.alien-side',
				helper:'clone',
			})
		}
	//deal out gun parts --> with more advanced features this will deal ALL ship parts
		moveCard = gameDeck.splice(0,1);
		aliengunPartsInHand.push(moveCard[0]);
		for (let i =0; i < aliengunPartsInHand.length; i++){
			const gunDiv = $(`<div id="alien-gun-${i}" class="alien-card gun-class alien-gun-class"> Gun card </div>`)
			gunDiv.appendTo ("#alien-hand-div");
			gunDiv.draggable({
				containment: '.alien-side',
				helper: 'clone',
				// class: {
				// 	"ui-draggable": "test"
				// }
			})
		}
	},

	//umbrella function to build the deck and deal cards
	dealParts : function(){
		this.buildDeck();
		this.dealHuman();
		this.dealAlien();

	},
	//time for humans to add on to play the hull card
	constructHumanHullRound : function(){
		console.log("constructHullRounds");
		if (humangunPartsInHand.length > 0){
			$('#next-button').text("Next: Add to Your Ship"),
			$('#next-button').click(function(){
				game.constructPartsRound();
			})
		} else {
			$('#next-button').text("Attack!")
			$('#next-button').click(function(){
				game.attackRound();
			})
		}
		human.playHull();	
	},
	//time for humans to play any parts they may have
	constructHumanPartsRound : function(){		
		console.log("constructPartsRounds");
		$(".human-hull-class").draggable({disabled: true });
		$('#next-button').text("Attack!")
		$('#next-button').click(function(){
			$('#construction').hide();
			game.attackRound();
		})
		human.addToShip();	
	},
	humanAttackRound : function(){
		console.log("attack Mode");
		console.log(humangunPartsInPlay);
		$(".human-gun-class").draggable({disabled: true });
		if (humangunPartsInPlay.length > 0){
			console.log("human is attacking")
			human.attack();
		} else {
			$('#next-button').text("End turn")
			$('#next-button').click(function(){
			console.log("end of round")
			this.switchPlayers();
			})
		}
	},
	//umbrella function to play a round
	playHumanRounds : function(){
		this.resetFunctions();
		$(".alien-card").draggable({disabled: true })
		if(humanhullPartsInHand.length > 0){
			this.constructHumanHullRound();
		} else if (humangunPartsInHand.length > 0){
			this.constructHumanPartsRound();
		} else {
			this.humanAttackRound();
		}
	},
	constructAlienHullRound : function(){
		console.log("constructHullRounds");
		if (aliengunPartsInHand.length > 0){
			$('#next-button').text("Next: Add to Your Ship"),
			$('#next-button').click(function(){
				game.constructPartsRound();
			})
		} else {
			$('#next-button').text("Attack!")
			$('#next-button').click(function(){
				game.attackRound();
			})
		}
		alien.playHull();	
	},	
	constructAlienPartsRound : function(){		
		console.log("constructPartsRounds");
		$(".alien-hull-class").draggable({disabled: true });
		$('#next-button').text("Attack!")
		$('#next-button').click(function(){
			$('#construction').hide();
			game.attackRound();
		})
		alien.addToShip();	
	},
	//move into attack the humans opponent
	alienAttackRound : function(){
		console.log("attack Mode");
		console.log(aliengunPartsInPlay);
		$(".alien-gun-class").draggable({disabled: true });
		if (aliengunPartsInPlay.length > 0){
			console.log("alien is attacking")
			alien.attack();
		} else {
			$('#next-button').text("End Round")
			$('#next-button').click(function(){
			console.log("end of round")
			this.switchPlayers;
			})
		}
	},
	//reset humans options once their round starts over
	playAlienRounds : function(){
		this.resetFunctions();
		$(".human-card").draggable({disabled: true })
		if(alienhullPartsInHand.length > 0){
			this.constructAlienHullRound();
		} else if (aliengunPartsInHand.length > 0){
			this.constructAlienPartsRound();
		} else {
			this.alienAttackRound();
		}
	},
	resetFunctions : function(){
		for(let i = 0; i <humanShotThisRound.length; i++){
			const firedGuns = humanShotThisRound.splice(humanShotThisRound[0]);
				humangunPartsInPlay.push(firedGuns);
				console.log(humanShotThisRound);
		}
		for(let i = 0; i <alienShotThisRound.length; i++){
			const firedGuns = alienShotThisRound.splice(alienShotThisRound[0]);
				aliengunPartsInPlay.push(firedGuns);
				console.log(alienShotThisRound);
		}
	},
	switchPlayers : function(){
		$('#next-button').text("End Turn")
			$('#next-button').click(function(){
			alert("Switch Players")
			console.log("switchPlayer")
			})
	},
//I'd like to create a coin flip that sets the first player to play their hull and gives them first opportunity to attack.
	setupGame : function(){
		this.constructHumanHullRound();
		this.switchPlayers();
		this.constructAlienHullRound(); 
		this.switchPlayers();
		this.constructHumanPartsRound();
		this.switchPlayers();
		this.constructAlienPartsRound();
		this.switchPlayers();
	},
	playGame : function(){ 
		this.dealParts();
		this.setupGame();
		this.switchPlayers();
		this.playHumanRounds();
		this.playAlienRounds();
	// while(gameWinner === false){
	// 	game.playHumanRounds();
	// 	game.playAlienRounds();
	// }
	},
}


const humanTargeting = function(){
	$(".alien-square").one("click",function(e){
		console.log("alien-square");
		if($(e.currentTarget).hasClass("hull-class")){
			console.log("classy")
			humanGun.attackhull(alienHull)
			checkIntegrity();
		} else if($(e.currentTarget).hasClass("gun-class")){
			console.log('shooter')
			humanGun.attackgun(alienGun)
			humanGun.checkPartDestroyed(alienGun,e.currentTarget);
		}		
	})	
}

const alienTargeting = function(){
	$(".human-square").one("click",function(e){
		console.log("human-square");
		if($(e.currentTarget).hasClass("hull-class")){
			console.log("classy")
			alienGun.attackhull(alienHull)
			checkIntegrity();
		} else if($(e.currentTarget).hasClass("gun-class")){
			console.log('shooter')
			alienGun.attackgun(alienGun)
			alienGun.checkPartDestroyed(humanGun,e.currentTarget);
		}		
	})	
}


const checkAlienIntegrity = function(){
	if (alien.life <= 0 ){
		console.log("human 1 has won!")
		gameWinner = true;
	} else {
		console.log("not destroyed")
		console.log(alien.life )
	}
};

const checkHumanIntegrity = function(){
	if (humanlife <= 0 ){
		console.log("alien 1 has won!")
		gameWinner = true;

	} else {
		console.log("not destroyed")
		console.log(alien.life )
	}
};

//umbrella function that controls the game that regulates rounds




playGame();

//demonstration of drag and drop

// // //$('#divCountries').droppable({
// // 	accept: 'li[data-value="country"]', // the html is <li data-value="country"> USA </li>	
// 	drop: function (event,ui){
// // 		$('#countries').append(ui.draggable))
// // 	}
// // });
