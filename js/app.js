
//hard code game board and cards on board

	//create array for player and computer and append to html

$('#player-hand-div').droppable({
	accept: '.player-card',
	drop: function(event, ui){
		$('#player-hand-div').append(ui.draggable)
	},
})

const gameBoard =[ 	[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
]

for (let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('#player-gameboard').append(`<div class="player-row-${i} player-row game-row"></div>`)
	for(let x = 0; x < row.length; x++){
		const square = row[x];
		const squareDiv = $(`<div class="square player-square player-droppable" id="player-square-${x}-${i}"></div>`)
		$(`.player-row-${i}`).append(squareDiv)
		squareDiv.droppable({
			accept: '.player-card',
			drop: function(event, ui){
				$(squareDiv).append(ui.draggable)
				if(ui.draggable.hasClass("hull-class")){
					const moveHull = playerhullPartsInHand.splice(playerhullPartsInHand[i]);
					playerhullPartsInPlay.push(moveHull);
		 			console.log(playerhullPartsInHand);
				}
				if(ui.draggable.hasClass("gun-class")){
					const moveGun = playergunPartsInHand.splice(playergunPartsInHand[i]);
					playergunPartsInPlay.push(moveGun);
		 			console.log(playergunPartsInHand);
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
			
			accept: '.player-card',
			drop: function(event, ui){
				$(squareDiv).append(ui.draggable)
			}
		});
	}
	
}

//creat classes for hull and gun to be able to generate objects from for player and alien

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

const alienHull = new Hull(10)
const alienGun = new Gun(1, 1)

const playerHull = new Hull(10)
const playerGun = new Gun(1, 3)



//players can target other cards to do damage
//alienGun.attackhull(playerHull) check check

//create player object to hold on to player actions, needs cards in hand, construction functions and attack functions

//issue with scope in wtih these

playerhullPartsInHand = [];
playerhullPartsInPlay = [];
playerhullPartsDestroyed = [];
playergunPartsInHand = [];
playergunPartsInPlay = [];
playergunPartsDestroyed = [];
playerShotThisRound = [];

gameDeck=[];

const player ={
	// hullPartsInHand : [],
	// hullPartsInPlay : [],
	// hullPartsDestroyed : [],
	// gunPartsInHand : [],
	// gunPartsInPlay : [],
	// gunPartsDestroyed : [],
	// //life :  total life for all player hull parts in play
	playHull: function(){
		$(".player-hull-class").draggable({disabled: false });
	},
	addToShip: function(){ 
		$(".player-gun-class").draggable({disabled: false });
	},	
	
	attack: function(){
		console.log(playergunPartsInPlay)
		for(let i =0; i < playergunPartsInPlay.length; i++){
			enemyTargeting();
			const firedGuns = playergunPartsInPlay.splice(playergunPartsInPlay[0]);
			playerShotThisRound.push(firedGuns);
			console.log(playerShotThisRound);
		}
		
	}
}

//create alien object to keep track aliens stuff, cards in hand, cards in play, life, construction and play -- reach goal, setup/ai/random for computer

const alien = {
	hullPartsInHand : [],
	hullPartsInPlay : [],
	hullPartsDestroyed : [],
	gunPartsInHand : [],
	gunPartsInPlay : [], 
	partsDestroyed : [],
	alienlife : alienHull.integrity, 
	layShip: function(){
		console.log("lay ship")
		console.log(alien.hullPartsInHand)
		$("#alien-square-1-3").addClass("alien-hull-class hull-class");
		const moveHull = this.hullPartsInHand.splice(0);
		this.hullPartsInPlay.push(moveHull);
		$("#alien-square-0-3").addClass("alien-gun-class gun-class");
	}
}

//create game object to keep track of game needs 1) deal parts at the start of the game 2) deal parts each round, 3) different phases of game play [draw, construction, attack] 4) switching play to alien and back to player gameDeck : [playerHull, playerGun, alienHull, alienGun],


const game = {
	
	buildDeck : function(){
		gameDeck.push(playerHull);
		gameDeck.push(playerGun);
		gameDeck.push(alienHull);
		gameDeck.push(alienGun);

	},
	dealPlayer : function(){ //for testing and initial cretion, hard coded the made guns and hulls into the hand, need to create a function later that creates random cards and then puts them into a deck.
		//we'll need to create a deck and have that deck sorted into the game deck and added, but for now, hard coded.
	

	//deal out the hull card
		let moveCard = gameDeck.splice(0,1);
		playerhullPartsInHand.push(moveCard[0]);
		for (let i =0; i < playerhullPartsInHand.length; i++){
			const hullDiv = $(`<div id="player-hull-${i}" class="player-card hull-class player-hull-class"> Hull Card </div>`)
			hullDiv.appendTo ("#player-hand-div");
			hullDiv.draggable({
				containment: '.player-side',
				helper:'clone',
			})
		}
		

	//deal out gun parts --> with more advanced features this will deal ALL ship parts
		moveCard = gameDeck.splice(0,1);
		playergunPartsInHand.push(moveCard[0]);
		for (let i =0; i < playergunPartsInHand.length; i++){
			const gunDiv = $(`<div id="player-gun-${i}" class="player-card gun-class player-gun-class"> Gun card </div>`)
			gunDiv.appendTo ("#player-hand-div");
			gunDiv.draggable({
				containment: '.player-side',
				helper: 'clone',
				// class: {
				// 	"ui-draggable": "test"
				// }
			})
	
		}
		
	},
	dealAlien: function(){
	//revise to make it player 2 once the full game play for player 1 is working
		let moveCard = gameDeck.splice(0,1);
		alien.hullPartsInHand.push(moveCard[0]);

	//revise to make it player 2 once the full game play for player 1 is working

		moveCard = gameDeck.splice(0,1);
		alien.gunPartsInHand.push(moveCard[0]);

		
		
	},

	//umbrella function to build the deck and deal cards
	dealParts : function(){
		this.buildDeck();
		this.dealPlayer();
		this.dealAlien();

	},

	//time for players to add on to play the hull card
	constructHullRound : function(){
		console.log("constructHullRounds");
		if (playergunPartsInHand.length > 0){
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
		player.playHull();	
	},	

	//time for players to play any parts they may have
	constructPartsRound : function(){		
		console.log("constructPartsRounds");
		$(".player-hull-class").draggable({disabled: true });
		$('#next-button').text("Attack!")
		$('#next-button').click(function(){
			$('#construction').hide();
			game.attackRound();
		})
		player.addToShip();	
	},
	//move into attack the players opponent
	attackRound : function(){
		console.log("attack Mode");
		console.log(playergunPartsInPlay);
		$(".player-gun-class").draggable({disabled: true });
		if (playergunPartsInPlay.length > 0){
			console.log("player is attacking")
			player.attack();
		} else {
			$('#next-button').text("End Round")
			$('#next-button').click(function(){
			console.log("end of round")
			})
		}
	},

	//reset players options once their round starts over
	resetFunctions : function(){
		for(let i = 0; i <playerShotThisRound.length; i++){
			const firedGuns = playerShotThisRound.splice(playerShotThisRound[0]);
				playergunPartsInPlay.push(firedGuns);
				console.log(playerShotThisRound);
		}
	},
//umbrella function to play a round
	playRounds : function(){
		this.resetFunctions();
		if(playerhullPartsInHand.length > 0){
			this.constructHullRound();
		} else if (playergunPartsInHand.length > 0){
			this.constructPartsRound();
		} else {
			this.attackRound();
		}
		
	}
}

const enemyTargeting = function(){
	$(".alien-square").one("click",function(e){
		console.log("alien-square");
		if($(e.currentTarget).hasClass("hull-class")){
			console.log("classy")
			playerGun.attackhull(alienHull)
			checkIntegrity();
		} else if($(e.currentTarget).hasClass("gun-class")){
			console.log('shooter')
			playerGun.attackgun(alienGun)
			playerGun.checkPartDestroyed(alienGun,e.currentTarget);
		}		
	})	
}

const checkIntegrity = function(){
	if (alien.life <= 0 ){
		console.log("Player 1 has won!")
	}
};

// const playerTargeting = () => {
// 	$(".player-square").click(function(e){
// 		console.log("player-square");
// 		if($(e.currentTarget).hasClass("gun-class")){
// 			alert("arming weapons -- target the enemy when ready")
// 			enemyTargeting()
// 		}  		
// 	})
// }

//round function that 

//umbrella function that controls the game that regulates rounds
const startGame = () => { 
	
	game.dealParts();
	$(".player-card").draggable({disabled: true });
	alien.layShip();
	game.playRounds();
}


startGame();

//demonstration of drag and drop

// // //$('#divCountries').droppable({
// // 	accept: 'li[data-value="country"]', // the html is <li data-value="country"> USA </li>	
// 	drop: function (event,ui){
// // 		$('#countries').append(ui.draggable))
// // 	}
// // });
