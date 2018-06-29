console.log("Engines are go!")

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

$(".alien-square-1-2").addClass("hull-class");
$(".alien-square-2-2").addClass("gun-class");

$(".player-square-2-0").addClass("hull-class");
$(".player-square-1-0").addClass("gun-class");


//player can do damage to the computer with the power of jQuery

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

//.hasclass checks to se if it has a class


//player has hand of 2 guns and 1 hull of two blocks

//alien has hand of 2 guns and 1 hull of two blocks

