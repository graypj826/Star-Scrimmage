
//hard code game board and cards on board

	//create array for player and computer and append to html






const gameBoard =[ 	[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
]

for (let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('#alien-gameboard').append(`<div class="alien-row-${i} alien-row game-row"></div>`)
	$('#player-gameboard').append(`<div class="player-row-${i} player-row game-row"></div>`)
	for(let x = 0; x < row.length; x++){
		const square = row[x];
		$(`.alien-row-${i}`).append(`<div class="square alien-square-${x}-${i} alien-square"></div>`)
		$(`.player-row-${i}`).append(`<div class="square player-square-${x}-${i} player-square"></div>`)
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

//hard code the hull on to the array

const player ={
	hullPartsInHand : [],
	hullPartsInPlay : [],
	hullPartsDestroyed : [],
	gunPartsInHand : [],
	gunPartsInPlay : [],
	gunPartsDestroyed : [],
	addToShip: function(){
		$(".player-square").click(function(e){
		console.log("player-square");
		}) 
	},
	playHull: function(){
		$(".player-square").click(function(e){
		$(e.currentTarget).addClass("hull-class");
		const moveHull = hullPartsInHand.splice([0],1);
		hullPartsInPlay.push(moveHull); 
		})
	}
}

// }
	//playerLife : total life for all player hull parts in play
	//}

	// }

const alien ={
	hullPartsInHand : [],
	hullPartsInPlay : [],
	hullPartsDestroyed : [],
	gunPartsInHand : [],
	gunPartsInPlay : [], 
	partsDestroyed : [],
	//alienlife 
}


const game = {
	dealParts : function(){
		player.hullPartsInHand.push(playerHull);
		player.gunPartsInHand.push(playerGun);
		alien.hullPartsInHand.push(alienHull);
		alien.gunPartsInHand.push(alienGun);
	},
	firstHull : function(){
		player.playHull();		
	},
	constructionRound : function(){
		if ((player.hullPartsInHand.length>0) || (player.gunPartsInHand>0)){
			console.log("cards to play!")
			$('#action-button').text("Constuction").attr("id","construction")
			$('#construction').click(function(){
				player.addToShip()
			})

		} else {
			console.log("move to battle")
		}
	}, 
}

const startGame = () => {
	game.dealParts();
	game.constructionRound();
}

startGame();


$(".alien-square-1-2").addClass("hull-class");
$(".alien-square-2-2").addClass("gun-class");

//$(".player-square-2-0").addClass("hull-class");
$(".player-square-1-0").addClass("gun-class");


//player can do damage to the computer with the power of jQuery
//.hasclass checks to se if it has a class
const enemyTargeting = () => {
	$(".alien-square").click(function(e){
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


//player has hand of 2 guns and 1 hull of two blocks

//alien has hand of 2 guns and 1 hull of two blocks

