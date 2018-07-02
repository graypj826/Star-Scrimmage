
//hard code game board and cards on board

	//create array for player and computer and append to html


if (jQuery.ui) {
  console.log("ui loaded")
}

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
		const squareDiv = $(`<div class="square player-square player-droppable" id="player-square-${x}-${i} "></div>`)
		$(`.player-row-${i}`).append(squareDiv)
		squareDiv.droppable();
	}
}

for (let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('#alien-gameboard').append(`<div class="alien-row-${i} alien-row game-row"></div>`)
	for(let x = 0; x < row.length; x++){
		const square = row[x];
		const squareDiv = $(`<div class="square alien-droppable alien-square" id="alien-square-${x}-${i} "></div>`)
		$(`.alien-row-${i}`).append(squareDiv)
		squareDiv.droppable();
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
}

//generate 2 guns and one hull for both

const alienHull = new Hull(10)
const alienGun = new Gun(1, 3)

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
	//life :  total life for all player hull parts in play
	// addToShip: function(){ // need to change this for jquery ui
	// 	if(playergunPartsInHand.length>0){
	// 		for(let i = 0; i < playergunPartsInHand.length; i++){
	// 			$("div").on("click", function(e){
	// 				if($(e.currentTarget).hasClass("player-square") == true){
	// 					$(".player-square").on("click",function(e){
	// 						$(e.currentTarget).addClass("gun-class");		
	// 						const movePart = playergunPartsInHand.splice(playergunPartsInHand[i]);
	// 						playergunPartsInPlay.push(movePart);
	// 						console.log(playergunPartsInHand);
	// 						console.log(`player has ${playergunPartsInHand.length} left to play`)
	// 					})
	// 				}	
	// 						// } else if ($(e.currentTarget).hasClass("alien-square") == true){
	// 						// 	console.log("please pick a player square")
	// 						// 	}
	// 				if(playerhullPartsInHand.length < 1) {
	// 					$("this").off("event")			// })	
	// 				}			
	// 			})
	// 		}
	// 	}
	// },	
	// playHull: function(){
	// 	console.log("playHull function running")
	// 	for(let i = 0; i < playergunPartsInHand.length; i++){
	// 		$("div").on("click", function(event){
	// 			if($(event.currentTarget).hasClass("player-square") == true){
	// 				console.log("Player player-square")
	// 				$(event.currentTarget).addClass("hull-class");
	// 				const moveHull = playerhullPartsInHand.splice(playerhullPartsInHand[i]);
	// 				playerhullPartsInPlay.push(moveHull);
	// 				console.log(playerhullPartsInHand);
	// 			}
	// 		})
			
	// 	if(playerhullPartsInHand.length < 1) {
	// 		$("this").off("event")
	// 		game.constructionRound();	
	// 		}
		
	// 	}
	// },
	attack: function(){
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
	//alienlife 
	layShip: function(){
		$('#alien-square-1-3').addClass("hull-class");
		const moveHull = this.hullPartsInHand.splice(0);
		this.hullPartsInPlay.push(moveHull);
		$('#alien-square-2-3').addClass("gun-class");
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
	
		let moveCard = gameDeck.splice(0,1);
		playerhullPartsInHand.push(moveCard[0]);
		for (let i =0; i < playerhullPartsInHand.length; i++){
			const hullDiv = $(`<div id="player-hull-${i}" class="player-card"> card 1 </div>`)
			hullDiv.appendTo ("#player-hand-div");
			hullDiv.draggable({
				containment: '#player-side',
				// revert: true
			})
			$('#player-hand-div').append(hullDiv)
		}


		
		moveCard = gameDeck.splice(0,1);
		playergunPartsInHand.push(moveCard[0]);
		for (let i =0; i < playergunPartsInHand.length; i++){
			const hullDiv = $(`<div id="player-gun-${i}" class="player-card"> card 1 </div>`)
			hullDiv.appendTo ("#player-hand-div");
			hullDiv.draggable({
				containment: '#player-side',
				// revert: true
			})
			$('#player-hand-div').append(`<div id="player-gun-${i}" class="player-card draggable"> Card 2</div>`)
	
		}
		
	},
	dealAlien: function(){
		alien.hullPartsInHand.push(alienHull);
		alien.gunPartsInHand.push(alienGun);
	},
	dealParts : function(){
		this.buildDeck();
		this.dealPlayer();
		this.dealAlien();

	},
	constructionRound : function(){
		if (playerhullPartsInHand.length>0){
			console.log("cards to play!")
			$('#action-button').text("Construct Hull").attr("id","constructHull")
			$('#construction').click(function(){
				player.playHull();
			})
			

		} else if(playergunPartsInHand>0) {
			console.log("cards to play!")
			$('#action-button').text("Add To Your Ship").attr("id","constructParts")
			$('#constructParts').click(function(){
				player.addToShip();
				})
		}
	}, 
	attackMode : function(){
		playergunPartsInPlay.push(playergunPartsInHand[0]);
		console.log("attack Mode");
		if (playergunPartsInPlay.length > 0){
			console.log("attack!")
			$('#action-button').text("Attack").attr("id","attack")
			$('#attack').click(function(){
				player.attack();
			})
		}
	},
	resetFunctions : function(){
		for(let i = 0; i <playerShotThisRound.length; i++){
			const firedGuns = playerShotThisRound.splice(playerShotThisRound[0]);
				playergunPartsInPlay.push(firedGuns);
				console.log(playerShotThisRound);
		}
	},
	playRound : function(){
		this.resetFunctions();
		// this.constructionRound();
		this.attackMode();
	}
}

//player can do damage to the computer with the power of jQuery
//.hasclass checks to se if it has a class

//need to figure out a way to select the card and only then do damage - addClass selected card, makes red border, activates enemy targeting, then turns off. We could sort it into a new array, cards to be played in round, and splice it out next change they get...could use next button to cycle through array and then whenever they attack or hit next, it moves to the next card until there are no more cards left in the to be played array. 

const enemyTargeting = () => {
	$(".alien-square").on("click",function(e){
		console.log("alien-square");
		if($(e.currentTarget).hasClass("hull-class")){
			console.log("classy")
			playerGun.attackhull(alienHull)
		} else if($(e.currentTarget).hasClass("gun-class")){
			console.log('shooter')
			playerGun.attackgun(alienGun)
		} 		
	})	
}

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

//start game method that regulates rounds
const startGame = () => { 
	game.dealParts();
	alien.layShip();
	// game.playRound();
}

$("#content").draggable({
    containment: "parent"
});

$(" ")

startGame();

//demonstration of drag and drop

// // //$('#divCountries').droppable({
// // 	accept: 'li[data-value="country"]', // the html is <li data-value="country"> USA </li>	
// 	drop: function (event,ui){
// // 		$('#countries').append(ui.draggable))
// // 	}
// // });
