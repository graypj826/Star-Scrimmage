
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
		$(`.human-row-${i}`).append(squareDiv);
		squareDiv.droppable({ 
			drop: function(event, ui){
				$(squareDiv).append(ui.draggable);
				if(ui.draggable.hasClass("hull-class")){
					$(squareDiv).addClass("holds-hull")
					const moveHull = humanhullPartsInHand.splice(humanhullPartsInHand[i]);
					humanhullPartsInPlay.push(moveHull);
				};
				if(ui.draggable.hasClass("hull-class")){
					$(".human-square").droppable({
						disabled: true
					})
					let id = $(ui.draggable).parent().attr("id");
					let xcoord = parseInt(id[13]);
					let ycoord = parseInt(id[15]);
					$(`#human-square-${xcoord-1}-${ycoord}`).droppable({
						disabled: false
					})
					$(`#human-square-${xcoord-1}-${ycoord}`).addClass("human-available");
					$(`#human-square-${xcoord+1}-${ycoord}`).droppable({
						disabled: false
					})
					$(`#human-square-${xcoord+1}-${ycoord}`).addClass("human-available");

					$(`#human-square-${xcoord}-${ycoord-1}`).droppable({
						disabled: false
					})
					$(`#human-square-${xcoord}-${ycoord-1}`).addClass("human-available");

					$(`#human-square-${xcoord}-${ycoord+1}`).droppable({
						disabled: false
					})
					$(`#human-square-${xcoord}-${ycoord+1}`).addClass("human-available");
				};
				if(ui.draggable.hasClass("hull-class")){
					$(squareDiv).addClass("holds-hull")
					const moveHull = humanhullPartsInHand.splice(humanhullPartsInHand[i]);
					humanhullPartsInPlay.push(moveHull);
				}
				if(ui.draggable.hasClass("gun-class")){
					$(squareDiv).addClass("holds-gun")
					$(squareDiv).addClass("human-gun-class")
					const moveGun = humangunPartsInHand.splice(ui.draggable,1);
					console.log(humangunPartsInHand);
					console.log(moveGun)
					aliengunPartsInPlay.push(moveGun[0]);
					human.getVitals();	
				}
			}
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
			drop: function(event, ui){
				$(squareDiv).append(ui.draggable);
				if(ui.draggable.hasClass("hull-class")){
					$(squareDiv).addClass("holds-hull")
					const moveHull = alienhullPartsInHand.splice(alienhullPartsInHand[i]);
					alienhullPartsInPlay.push(moveHull);
				};
				if(ui.draggable.hasClass("hull-class")){
					$(".alien-square").droppable({
						disabled: true
					})
					let id = $(ui.draggable).parent().attr("id");
					let xcoord = parseInt(id[13]);
					console.log(xcoord);
					let ycoord = parseInt(id[15]);
					console.log(ycoord);
					$(`#alien-square-${xcoord-1}-${ycoord}`).droppable({
						disabled: false
					})
					$(`#alien-square-${xcoord-1}-${ycoord}`).addClass("alien-available");
					$(`#alien-square-${xcoord+1}-${ycoord}`).droppable({
						disabled: false
					})
					$(`#alien-square-${xcoord+1}-${ycoord}`).addClass("alien-available");

					$(`#alien-square-${xcoord}-${ycoord-1}`).droppable({
						disabled: false
					})
					$(`#alien-square-${xcoord}-${ycoord-1}`).addClass("alien-available");

					$(`#alien-square-${xcoord}-${ycoord+1}`).droppable({
						disabled: false
					})
					$(`#alien-square-${xcoord}-${ycoord+1}`).addClass("alien-available");
				}
				if(ui.draggable.hasClass("hull-class")){
					$(squareDiv).addClass("holds-hull")
					const moveHull = alienhullPartsInHand.splice(alienhullPartsInHand[i]);
					alienhullPartsInPlay.push(moveHull);
				}
				if(ui.draggable.hasClass("gun-class")){
					$(squareDiv).addClass("holds-gun")
					$(squareDiv).addClass("alien-gun-class")
					const moveGun = aliengunPartsInHand.splice(ui.draggable,1);
					console.log(aliengunPartsInHand);
					aliengunPartsInPlay.push(moveGun[0]);
					alien.getVitals();	
				}
			}
		})		
	}
} 

//creat classes for hull and gun to be able to generate objects from for human and alien

class Hull {
	constructor(name, faction, integrity){
		this.name = name
		this.faction = faction
		this.type = "hull"
		this.integrity = integrity;

	}

}

class Gun {
	constructor(name, faction, damage, integrity, range){
		this.name = name
		this.faction = faction
		this.damage = damage
		this.integrity = integrity
		this.id  = "gun" + ++Gun.counter;
		this.range = range
		this.type = "gun"
	}
	//this.hull = Math.floor(Math.random() * 4) + 3;
	//Math.floor(Math.random() * 4) + 3;
	attackhull(target){
		console.log(target)
		target.integrity = target.integrity-this.damage
		$(target).find(".card-property").text(target.integrity)
	}
	attackgun(target){
		target.integrity = target.integrity-this.damage
	}
	checkAlienPartDestroyed(name, target){
		if(name.integrity <= 0){
			console.log(target)
			$(target).parent(".alien-square").css("background-image","none")
			$(target).css("background-image", "url('https://media.giphy.com/media/ahza0v6s5pSxy/200w.gif')");
			$(target).fadeOut(600)			
		} else {
			$(target).children("card-integrity").text(target.integrity)
		}
	}
	checkHumanPartDestroyed(name, target){
		if(name.integrity <= 0){
			console.log(target)
			$(target).parent(".human-square").css("background-image","none")
			$(target).css("background-image", "url('https://media.giphy.com/media/ahza0v6s5pSxy/200w.gif')");
			$(target).fadeOut(600)			
		} else {
			$(target).children("card-integrity").text(target.integrity)
		}
	}	
			
}

Gun.counter = 0;

//static id = 1 ("static means it stays with the class", so we want to ++ and then it'll go up as it is created.)

//generate 2 guns and one hull for both

const alienHull = new Hull("alienHull","alien", 1);
const alienGun1 = new Gun("alienGun1","alien", 1, 1, 2);
const alienGun2 = new Gun("alienGun2","alien", 1, 1, 3);
const alienGun3 = new Gun("alienGun2", "alien", 2, 1, 1);


const humanHull = new Hull("humanHull","human", 10);
const humanGun1 = new Gun("humanGun1","human", 1, 3, 2);
const humanGun2 = new Gun("humanGun2","human", 1, 3, 1);
const humanGun3 = new Gun("humanGun3","human", 2, 1, 1);

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
		$(".human-gun-class").on("selectableselected",(function(e){
			let shooter = $(e.target).data(("cardInfo"));
			const rangeValue = human.determineRange(e);
			human.humanTargeting(rangeValue);
			human.humanAttackShot(e, shooter);		
		}))
	},
	humanAttackShot : function(e, shooter){
		$(".target").one("click",function(e){
			const target = $(e.currentTarget).children(".alien-card")
			const name  = $(e.currentTarget).children(".alien-card").data(("cardInfo"))
			if(target.hasClass("hull-class")){
				shooter.attackhull(name)
				human.checkAlienIntegrity(name);
				human.turnOffTargeting();
			} else if(target.hasClass("gun-class")){
				shooter.attackgun(name)
				shooter.checkAlienPartDestroyed(name,target);
				human.turnOffTargeting();
			} else {
				console.log("miss");
				human.turnOffTargeting();
			}	
		})	
	},
	checkAlienIntegrity: function (target, ){
		if(target.integrity <= 0){
			$("#hide-at-win").hide()
			$("body").css("background-image", "url('https://cdn-images-1.medium.com/max/1600/1*jyQsEU2T01tacQiKFKLh7Q.png')")
			$("body").append("<div id = 'player-1-win-screen'> <h1> PLAYER 1 IS THE WINNER! </h1></div>")
			$("#player-1-win-screen").append("<input type='button' value='Refresh Page' onClick='window.location.reload()'>")
		} else {
			alien.getVitals()
		}
	},
	determineRange : function(e){
		const parent = $(e.target).parent(".alien-square")
		const id = parent.attr("id");
		const rangeFinder = parent.find(".card-range")
		const ycoord = parseInt(id[15]);
		const rangeValue = rangeFinder.text() - ycoord;
		return rangeValue
	},
	humanTargeting : function(rangeValue){
		// const parent = $(e.currentTarget).parent()
		// const id = parent.attr("id");
		// const rangeFinder = parent.find(".card-range")
		// const rangeValue = rangeFinder.text() - 1;
		if (rangeValue === 3){
			$(`#alien-square-0-3`).addClass("target")
			$(`#alien-square-1-3`).addClass("target")
			$(`#alien-square-2-3`).addClass("target")
			$(`#alien-square-3-3`).addClass("target")

			$(`#alien-square-0-2`).addClass("target")
			$(`#alien-square-1-2`).addClass("target")
			$(`#alien-square-2-2`).addClass("target")
			$(`#alien-square-3-2`).addClass("target")

			$(`#alien-square-0-1`).addClass("target")
			$(`#alien-square-1-1`).addClass("target")
			$(`#alien-square-2-1`).addClass("target")
			$(`#alien-square-3-1`).addClass("target")

			$(`#alien-square-0-0`).addClass("target")
			$(`#alien-square-1-0`).addClass("target")
			$(`#alien-square-2-0`).addClass("target")
			$(`#alien-square-3-0`).addClass("target")

		} else if (rangeValue === 2){

			$(`#alien-square-0-3`).addClass("target")
			$(`#alien-square-1-3`).addClass("target")
			$(`#alien-square-2-3`).addClass("target")
			$(`#alien-square-3-3`).addClass("target")

			$(`#alien-square-0-2`).addClass("target")
			$(`#alien-square-1-2`).addClass("target")
			$(`#alien-square-2-2`).addClass("target")
			$(`#alien-square-3-2`).addClass("target")

			$(`#alien-square-0-1`).addClass("target")
			$(`#alien-square-1-1`).addClass("target")
			$(`#alien-square-2-1`).addClass("target")
			$(`#alien-square-3-1`).addClass("target")

		} else if (rangeValue === 1){

			$(`#alien-square-0-3`).addClass("target")
			$(`#alien-square-1-3`).addClass("target")
			$(`#alien-square-2-3`).addClass("target")
			$(`#alien-square-3-3`).addClass("target")

			$(`#alien-square-0-2`).addClass("target")
			$(`#alien-square-1-2`).addClass("target")
			$(`#alien-square-2-2`).addClass("target")
			$(`#alien-square-3-2`).addClass("target")

		} else {

			$(`#alien-square-0-3`).addClass("target")
			$(`#alien-square-1-3`).addClass("target")
			$(`#alien-square-2-3`).addClass("target")
			$(`#alien-square-3-3`).addClass("target")

		}
	},
	getVitals: function(){
		$("#human-health").text(`Health: ${humanHull.integrity}`);
		$("#human-holding-cards").text(`Cards In Hand: ${humangunPartsInHand.length}`)
	},
	turnOffTargeting: function(){
		game.turnOffAliens();
		$(`#alien-square-0-3`).removeClass("target")
		$(`#alien-square-1-3`).removeClass("target")
		$(`#alien-square-2-3`).removeClass("target")
		$(`#alien-square-3-3`).removeClass("target")

		$(`#alien-square-0-2`).removeClass("target")
		$(`#alien-square-1-2`).removeClass("target")
		$(`#alien-square-2-2`).removeClass("target")
		$(`#alien-square-3-2`).removeClass("target")

		$(`#alien-square-0-1`).removeClass("target")
		$(`#alien-square-1-1`).removeClass("target")
		$(`#alien-square-2-1`).removeClass("target")
		$(`#alien-square-3-1`).removeClass("target")

		$(`#alien-square-0-0`).removeClass("target")
		$(`#alien-square-1-0`).removeClass("target")
		$(`#alien-square-2-0`).removeClass("target")
		$(`#alien-square-3-0`).removeClass("target")	
	}


};
		
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
		// $(".human-card").selectable({
		// 	disabled: true
		// })
		$(".alien-card").selectable({
			disabled: false
		})

		$(".alien-card").removeClass("target")

		$(".alien-gun-class").on("selectableselected",(function(e){
			let shooter = $(e.target).data(("cardInfo"));
			const rangeValue = alien.determineRange(e);
			alien.alienTargeting(rangeValue);
			alien.alienAttackShot(e, shooter);		
		}))
	},
	alienAttackShot : function(e, shooter){

		$(".target").one("click",function(e){
			const target = $(e.currentTarget).children(".human-card")
			const name  = $(e.currentTarget).children(".human-card").data(("cardInfo"))
			if(target.hasClass("hull-class")){
				shooter.attackhull(name);
				alien.checkHumanIntegrity(name);
				alien.turnOffTargeting();
			} else if(target.hasClass("gun-class")){
				shooter.attackgun(name)
				shooter.checkHumanPartDestroyed(name,target);
				alien.turnOffTargeting();
			} else {
				console.log("miss");
			}	
		})	
	},
	checkHumanIntegrity: function (target){
		if(target.integrity <= 0){
			$("#hide-at-win").hide()
			$("body").css("background-image", "url('https://cdn-images-1.medium.com/max/1600/1*jyQsEU2T01tacQiKFKLh7Q.png')")
			$("body").append("<div id = 'player-2-win-screen'> <h1> PLAYER 2 IS THE WINNER! </h1></div>")
			$("#player-1-win-screen").append("<input type='button' value='Refresh Page' onClick='window.location.reload()'>")
		} else {
			$(target).children("card-integrity").text(target.integrity)
			human.getVitals()
		}
	},
	determineRange : function(e){
		const parent = $(e.target).parent(".alien-square")
		const id = parent.attr("id");
		const rangeFinder = parent.find(".card-range")
		const ycoord = parseInt(id[15]);
		const rangeValue = rangeFinder.text() - ycoord;
		return rangeValue
	},
	alienTargeting : function(rangeValue){
		// const parent = $(e.currentTarget).parent()
		// const id = parent.attr("id");
		// const rangeFinder = parent.find(".card-range")
		// const rangeValue = rangeFinder.text() - 1;
		if (rangeValue === 3){

			$(`#human-square-0-3`).addClass("target")
			$(`#human-square-0-3`).children().addClass("target")
			$(`#human-square-1-3`).addClass("target")
			$(`#human-square-1-3`).children().addClass("target")
			$(`#human-square-2-3`).addClass("target")
			$(`#human-square-2-3`).children().addClass("target")
			$(`#human-square-3-3`).addClass("target")
			$(`#human-square-3-3`).children().addClass("target")

			$(`#human-square-0-2`).addClass("target")
			$(`#human-square-0-2`).children().addClass("target")
			$(`#human-square-1-2`).addClass("target")
			$(`#human-square-1-2`).children().addClass("target")
			$(`#human-square-2-2`).addClass("target")
			$(`#human-square-2-2`).children().addClass("target")
			$(`#human-square-3-2`).addClass("target")
			$(`#human-square-3-2`).children().addClass("target")

			$(`#human-square-0-1`).addClass("target")
			$(`#human-square-0-1`).children().addClass("target")
			$(`#human-square-1-1`).addClass("target")
			$(`#human-square-1-1`).children().addClass("target")
			$(`#human-square-2-1`).addClass("target")
			$(`#human-square-2-1`).children().addClass("target")
			$(`#human-square-3-1`).addClass("target")
			$(`#human-square-3-1`).children().addClass("target")

			$(`#human-square-0-0`).addClass("target")
			$(`#human-square-0-0`).children().addClass("target")
			$(`#human-square-1-0`).addClass("target")
			$(`#human-square-1-0`).children().addClass("target")
			$(`#human-square-2-0`).addClass("target")
			$(`#human-square-2-0`).children().addClass("target")
			$(`#human-square-3-0`).addClass("target")
			$(`#human-square-3-0`).children().addClass("target")

		} else if (rangeValue === 2){

			$(`#human-square-0-2`).addClass("target")
			$(`#human-square-0-2`).children().addClass("target")
			$(`#human-square-1-2`).addClass("target")
			$(`#human-square-1-2`).children().addClass("target")
			$(`#human-square-2-2`).addClass("target")
			$(`#human-square-2-2`).children().addClass("target")
			$(`#human-square-3-2`).addClass("target")
			$(`#human-square-3-2`).children().addClass("target")

			$(`#human-square-0-1`).addClass("target")
			$(`#human-square-0-1`).children().addClass("target")
			$(`#human-square-1-1`).addClass("target")
			$(`#human-square-1-1`).children().addClass("target")
			$(`#human-square-2-1`).addClass("target")
			$(`#human-square-2-1`).children().addClass("target")
			$(`#human-square-3-1`).addClass("target")
			$(`#human-square-3-1`).children().addClass("target")

			$(`#human-square-0-0`).addClass("target")
			$(`#human-square-0-0`).children().addClass("target")
			$(`#human-square-1-0`).addClass("target")
			$(`#human-square-1-0`).children().addClass("target")
			$(`#human-square-2-0`).addClass("target")
			$(`#human-square-2-0`).children().addClass("target")
			$(`#human-square-3-0`).addClass("target")
			$(`#human-square-3-0`).children().addClass("target")

		} else if (rangeValue === 1){

			$(`#human-square-0-1`).addClass("target")
			$(`#human-square-0-1`).children().addClass("target")
			$(`#human-square-1-1`).addClass("target")
			$(`#human-square-1-1`).children().addClass("target")
			$(`#human-square-2-1`).addClass("target")
			$(`#human-square-2-1`).children().addClass("target")
			$(`#human-square-3-1`).addClass("target")
			$(`#human-square-3-1`).children().addClass("target")

			$(`#human-square-0-0`).addClass("target")
			$(`#human-square-0-0`).children().addClass("target")
			$(`#human-square-1-0`).addClass("target")
			$(`#human-square-1-0`).children().addClass("target")
			$(`#human-square-2-0`).addClass("target")
			$(`#human-square-2-0`).children().addClass("target")
			$(`#human-square-3-0`).addClass("target")
			$(`#human-square-3-0`).children().addClass("target")


		} else {
			$(`#human-square-0-0`).addClass("target")
			$(`#human-square-0-0`).children().addClass("target")
			$(`#human-square-1-0`).addClass("target")
			$(`#human-square-1-0`).children().addClass("target")
			$(`#human-square-2-0`).addClass("target")
			$(`#human-square-2-0`).children().addClass("target")
			$(`#human-square-3-0`).addClass("target")
			$(`#human-square-3-0`).children().addClass("target")

		}
	},
	turnOffTargeting: function(){
		game.turnOffAliens();
		
		$(`#human-square-0-3`).removeClass("target")
		$(`#human-square-0-3`).children().removeClass("target")
		$(`#human-square-1-3`).removeClass("target")
		$(`#human-square-1-3`).children().removeClass("target")
		$(`#human-square-2-3`).removeClass("target")
		$(`#human-square-2-3`).children().removeClass("target")
		$(`#human-square-3-3`).removeClass("target")
		$(`#human-square-3-3`).children().removeClass("target")

		$(`#human-square-0-2`).removeClass("target")
		$(`#human-square-0-2`).children().removeClass("target")
		$(`#human-square-1-2`).removeClass("target")
		$(`#human-square-1-2`).children().removeClass("target")
		$(`#human-square-2-2`).removeClass("target")
		$(`#human-square-2-2`).children().removeClass("target")
		$(`#human-square-3-2`).removeClass("target")
		$(`#human-square-3-2`).children().removeClass("target")

		$(`#human-square-0-1`).removeClass("target")
		$(`#human-square-0-1`).children().removeClass("target")
		$(`#human-square-1-1`).removeClass("target")
		$(`#human-square-1-1`).children().removeClass("target")
		$(`#human-square-2-1`).removeClass("target")
		$(`#human-square-2-1`).children().removeClass("target")
		$(`#human-square-3-1`).removeClass("target")
		$(`#human-square-3-1`).children().removeClass("target")

		$(`#human-square-0-0`).removeClass("target")
		$(`#human-square-0-0`).children().removeClass("target")
		$(`#human-square-1-0`).removeClass("target")
		$(`#human-square-1-0`).children().removeClass("target")
		$(`#human-square-2-0`).removeClass("target")
		$(`#human-square-2-0`).children().removeClass("target")
		$(`#human-square-3-0`).removeClass("target")
		$(`#human-square-3-0`).children().removeClass("target")
		},
	getVitals: function(){
		$("#alien-health").text(`Health: ${alienHull.integrity}`);
		$("#alien-holding-cards").text(`Cards In Hand: ${aliengunPartsInHand.length}`)
	},
}

//create game object to keep track of game needs 1) deal parts at the start of the game 2) deal parts each round, 3) different phases of game play [draw, construction, attack] 4) switching play to alien and back to human gameDeck : [humanHull, humanGun, alienHull, alienGun],


const game = {
	checkBuildDeck : false,
	checkDealHuman : false,
	checkDealAlien : false,
	checkDealParts : false,
	checkConstructFirstHumanHull : false,
	checkConstructFirstAlienHull : false,
	checkConstructFirstHumanParts : false,
	checkConstructFirstAlienParts : false,
	checkPlayHumanRounds : false,
	checkPlayAlienRounds : false,

	
	buildDeck : function(){
		gameDeck.push(alienHull);
		gameDeck.push(alienGun1);
		gameDeck.push(alienGun2);
		gameDeck.push(alienGun3);
		gameDeck.push(humanHull);
		gameDeck.push(humanGun1);
		gameDeck.push(humanGun2);
		gameDeck.push(humanGun3);
		this.buildDeck = true;
	},
	sortCards : function(){
		//deal out the hull card
		let i = gameDeck.length
		while (i--){
			if (gameDeck[0].faction == "human"){	
				if ((gameDeck[0].type == "hull")){
					let moveCard = gameDeck.splice(gameDeck[0],1);
					humanhullPartsInHand.push(moveCard[0]);
				} else {
					let moveCard = gameDeck.splice(gameDeck[0],1);
					humangunPartsInHand.push(moveCard[0]);
				}
			} else {
				if (gameDeck[0].type == "hull"){
					let moveCard = gameDeck.splice(gameDeck[0],1);
					alienhullPartsInHand.push(moveCard[0]);
				} else {
					let moveCard = gameDeck.splice(gameDeck[0],1);
					aliengunPartsInHand.push(moveCard[0]);
				}
			}
		
		}
	},
	dealHuman : function(){ 
		for (let i =0; i < humanhullPartsInHand.length; i++){
			const hullDiv = $(`<div id="human-hull-${i}" class="human-card hull-class human-hull-class"> Colony Ship  <div class="card-property" id="human-hull-card-text-${i}"> text </div></div>`)
			hullDiv.appendTo ("#human-hand-div");
			$(`#human-hull-${i}`).data("cardInfo", humanhullPartsInHand[i])
			const integrity = humanhullPartsInHand[i].integrity
			$(`#human-hull-card-text-${i}`).text(integrity);
			hullDiv.draggable({
				containment: '.human-side',
				helper:'clone',
			})
		}	
		for (let i =0; i < humangunPartsInHand.length; i++){
			const gunDiv = $(`<div id="human-gun-${i}" class="human-card gun-class human-gun-class"> Fighter Ship </div>`)
			gunDiv.appendTo ("#human-hand-div");
			this.addPropertiesToHumanCards(i);
			this.addIntegrityToHumanCards(i);
			this.addDamageToHumanCards(i);
			this.addRangeToHumanCards(i);
			// this.addNameToHumanCards(i);
			$(`#human-gun-${i}`).data("cardInfo", humangunPartsInHand[i])
			gunDiv.draggable({
				containment: '.human-side',
				helper: 'clone',
				start: function(event, ui){
					$(".human-available").css("background-color", "rgba(22, 252, 103, 0.76)")
				},
				stop: function(event, ui) {
					$(".human-available").css("background-color","transparent")
				}
			})	
		}
		this.checkDealHuman = true;		
	},
	addPropertiesToHumanCards : function(i){
		const partsProperty = $("<div class='card-property human-card-property'></div>")
		partsProperty.appendTo(`#human-gun-${i}`)
	},
	addIntegrityToHumanCards : function(i){
		const integrityDiv = $(`<div id="human-integrity-text-${i}" class="card-integrity human-card-property"></div>`)
		integrityDiv.appendTo($(`#human-gun-${i}`).children(".card-property"))
		const integrity = humangunPartsInHand[i].integrity;
		integrityDiv.text(integrity + " / ")
	},
	addDamageToHumanCards : function(i){
		const damageDiv = $(`<div id="human-gun-damage-text-${i}" class="card-damage human-card-property"></div>`)
		damageDiv.appendTo($(`#human-gun-${i}`).children(".card-property"))
		const damage = humangunPartsInHand[i].damage;
		damageDiv.text(damage + " / ")
	},
	addRangeToHumanCards : function(i){
		const rangeDiv = $(`<div id="human-gun-range-text-${i}" class="card-range human-card-property"></div>`)
		rangeDiv.appendTo($(`#human-gun-${i}`).children(".card-property"))
		const range = humangunPartsInHand[i].range;
		rangeDiv.text(range)
	},

	dealAlien : function(){
		for (let i =0; i < alienhullPartsInHand.length; i++){
			const hullDiv = $(`<div id="alien-hull-${i}" class="alien-card hull-class alien-hull-class"> Colony Ship <div class="card-property" id="alien-hull-card-text-${i}"> text </div></div>`)
			hullDiv.appendTo("#alien-hand-div");
			$(`#alien-hull-${i}`).data("cardInfo", alienhullPartsInHand[i])
			const integrity = alienhullPartsInHand[i].integrity
			$(`#alien-hull-card-text-${i}`).text(integrity);
			hullDiv.draggable({
				containment: '.alien-side',
				helper:'clone',	
			})
		}
		for (let i =0; i < aliengunPartsInHand.length; i++){
			const gunDiv = $(`<div id="alien-gun-${i}" class="alien-card gun-class alien-gun-class "> Fighter Ship </div>`)
			gunDiv.appendTo ("#alien-hand-div");
			this.addPropertiesToAlienCards(i);
			this.addIntegrityToAlienCards(i);
			this.addDamageToAlienCards(i);
			this.addRangeToAlienCards(i);
			$(`#alien-gun-${i}`).data("cardInfo", aliengunPartsInHand[i])
			gunDiv.draggable({
				containment: '.alien-side',
				helper: 'clone',
				start: function(event, ui){
					$(".alien-available").css("background-color", "rgba(22, 252, 103, 0.76)")
				},
				stop: function(event, ui) {
					$(".alien-available").css("background-color","transparent")
				}
			});
		}
		this.checkDealAlien = true;
	},
	addPropertiesToAlienCards : function(i){
		const partsProperty = $("<div class='card-property'></div>")
		partsProperty.appendTo(`#alien-gun-${i}`)
	},
	addIntegrityToAlienCards : function(i){
		const integrityDiv = $(`<div id="alien-integrity-text-${i}" class="card-integrity"></div>`)
		integrityDiv.appendTo($(`#alien-gun-${i}`).children(".card-property"))
		const integrity = aliengunPartsInHand[i].integrity;
		integrityDiv.text(integrity + " / ")
	},
	addDamageToAlienCards : function(i){
		const damageDiv = $(`<div id="alien"-gun-damage-text-${i}" class="card-damage"></div>`)
		damageDiv.appendTo($(`#alien-gun-${i}`).children(".card-property"))
		const damage = aliengunPartsInHand[i].damage;
		damageDiv.text(damage + " / ")
	},
	addRangeToAlienCards : function(i){
		const rangeDiv = $(`<div id="alien-gun-range-text-${i}" class="card-range"></div>`)
		rangeDiv.appendTo($(`#alien-gun-${i}`).children(".card-property"))
		const range = aliengunPartsInHand[i].range;
		rangeDiv.text(" "+range)
	},
	//umbrella function to build the deck and deal cards
	dealParts : function(){
		this.buildDeck();
		this.sortCards();
		this.dealHuman();
		this.dealAlien();
		this.checkDealParts = true;
	},
	//time for humans to add on to play the hull card
	constructFirstHumanHull : function(){
		game.switchButton();
		game.hideAlien();
		game.showHuman();

		human.playHull();

		$('#human-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 1 - Deploy Your Colony Ship")
		

		
		this.checkConstructFirstHumanHull = true;	
	},
	constructFirstHumanParts : function(){
		$(".human-hull-class").draggable({disabled: true });

		if(humanhullPartsInPlay.length <= 0){
			$(".human-square").droppable({disabled: true })
		}

		game.switchButton();
		game.hideAlien();
		game.showHuman();

	
		human.addToShip();

		$('#human-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 1 - Deploy Your Fighter Ship")
		
		this.checkConstructFirstHumanParts = true;
	},
	constructHumanHullRound : function(){
		game.hideAlien();
		game.showHuman();
		console.log(humangunPartsInHand);
		
		human.playHull();

		$('#human-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 1 - Deploy Additional Colony Ships")
		
		if (humangunPartsInHand.length > 0){
			$('#next-button').text("Next: Add To Your Fleet"),
			$('#next-button').one("click",function(){
				game.constructHumanPartsRound();
			})
		} else {
			$('#next-button').text("Move to Attack")
			$('#next-button').one("click", function(){
				game.humanAttackRound();
			})
		}	
	},
	//time for humans to play any parts they may have
	constructHumanPartsRound : function(){

		game.hideAlien();
		game.showHuman();

		human.addToShip();

		if(humanhullPartsInPlay.length <= 0){
			$(".human-gun-class").draggable({disabled: true })
		}

		$(".human-hull-class").draggable({disabled: true });
		
		$('#human-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 1 - Deploy Additional Fighter Ships")
		
		$('#next-button').text("Move to Attack")
		$('#next-button').one("click", function(){
			$('#construction').hide();
			game.humanAttackRound();
		})	
	},
	humanAttackRound : function(){
		$(".human-card").draggable({disabled: true });

		game.hideAlien();
		game.turnOffAliens();
		game.showHuman();
		game.switchButton();
		
		human.attack();
		
	
		
		$(".human-name-of-card").show();

		$(function(){
			$(".human-card").selectable();			
		})	
		$('#human-instructions').text("You get one shot for each ship you have in play! When you're happy with your choice, click the button to end your turn.")

		$('#phase').text("Player 1 - Attack!")
		
		
	},
	//umbrella function to play a round
	playHumanRounds : function(){

		$(".alien-card").draggable({disabled: true })
			this.constructHumanHullRound();
		game.checkPlayHumanRounds = true;
	},
	constructFirstAlienHull : function(){
		game.hideHuman();
		game.showAlien();
		game.switchButton();
		
		alien.playHull();

		$('#alien-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 2 - Place Your Colony Ship")
		$("#alien-health").text(`Health: ${alienHull.integrity}`);
		$("#alien-holding-cards").text(`Cards In Hand: ${aliengunPartsInHand.length}`)

		this.checkConstructFirstAlienHull = true;

	},
	constructFirstAlienParts : function(){

		game.hideHuman();
		game.showAlien();
		game.switchButton();

		alien.addToShip();
		
		$('#alien-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 2 - Place Your Fighter Ships")

		this.checkConstructFirstAlienParts = true;
	},
	constructAlienHullRound : function(){
		game.showAlien();
		game.hideHuman();

		alien.playHull();

		if (aliengunPartsInHand.length > 0){
			$('#next-button').text("Next: Add To Your Fleet"),
			$('#next-button').click(function(){
				game.constructAlienPartsRound();
				console.log("construct parts is next")
			})
		} else {
			$('#next-button').text("Move To Attack!")
			$('#next-button').click(function(){
				game.alienAttackRound();
				console.log("attack is next")
			})
		}
		
		
		$('#alien-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 2 - Deploy Any Additional Colony Ships")
		console.log(aliengunPartsInHand)
			
	},	
	constructAlienPartsRound : function(){		
		$(".alien-hull-class").draggable({disabled: true });
		$('#next-button').text("Move To Attack")
		$('#next-button').click(function(){
			$('#construction').hide();
			game.alienAttackRound();
		})
		console.log("attack phase")
		game.hideHuman();
		game.showAlien();
		$('#alien-instructions').text("Remember, your fighters can only be deployed by your colony ship, so deploy wisely! When you're happy with your choice, click the button to end your turn.")
		$('#phase').text("Player 2 - Deploy Any Additional Fighter Ships")

		alien.addToShip();
	},
	//move into attack the humans opponent
	alienAttackRound : function(){
		game.hideHuman();
		game.showAlien();
		game.turnOffHumans();
		game.switchButton();

		alien.attack();

		$('#alien-instructions').text("You get one shot for each ship you have in play! When you're happy with your choice, click the button to end your turn.")

			//^^^currently un-true
		$('#phase').text("Player 2 - Attack!")
		$(".alien-card").draggable({disabled: true });

	},
	//reset humans options once their round starts over
	playAlienRounds : function(){

		$(".human-card").draggable({disabled: true })
		this.constructAlienHullRound();
		this.checkPlayAlienRounds = true;
	},
	resetFunctions : function(){
		game.checkPlayHumanRounds = false;
		game.checkPlayAlienRounds = false;
		game.switchPlayers();
	},
	switchButton: function(){
		$('#next-button').text("End Turn")
		$('#next-button').one("click",function(){
			game.hideAlien();
			game.hideHuman();
			game.switchPlayers();
		})
	},
	switchPlayers : function(){
			if (game.checkConstructFirstHumanHull === false){
				alert("Switch Players first human hull")
				game.constructFirstHumanHull();
			} else if (game.checkConstructFirstAlienHull === false){
				alert("Switch Players first Alien Hull");
				game.constructFirstAlienHull();
			} else if (game.checkConstructFirstHumanParts === false){
				alert("Switch Players First Human Parts");
				game.constructFirstHumanParts();
			} else if (game.checkConstructFirstAlienParts === false){
				alert("Switch Players to First alien Parts");
				game.constructFirstAlienParts();
			} else if (game.checkPlayHumanRounds === false){
				alert("Switch Players to Human Rounds");
				game.playHumanRounds();
			} else if (game.checkPlayAlienRounds === false){
				alert("Switch Players to Alien Rounds");
				game.playAlienRounds();
			} else {
				game.resetFunctions();
			}
	},
	hideAlien : function(){
		$("#alien-instructions").hide();
		$("#alien-hand-div").hide();
	},
	showAlien : function(){
		$("#alien-instructions").show();
		$("#alien-hand-div").show();
	},
	hideHuman : function(){
		$("#human-instructions").hide();
		$("#human-hand-div").hide();
	},
	showHuman : function(){
		$("#human-instructions").show();
		$("#human-hand-div").show();
	},
	turnOffAliens : function(){
		$(".alien-card").selectable({
			disabled: true
		})
		$(".alien-card").draggable({
			disabled: true
		})
		$(".alien-card").off("click")		 
	},
	turnOffHumans : function(){
		$(".human-card").selectable({
			disabled: true
		})
		$(".human-card").draggable({
			disabled: true
		})
		$(".human-card").off("click")		 
	},



//I'd like to create a coin flip that sets the first player to play their hull and gives them first opportunity to attack.
	setupGame : function(){
		$(".human-card").draggable({disabled: true});
		$(".alien-card").draggable({disabled: true});
		this.constructFirstHumanHull();
		// this.constructFirstAlienHull(); 
		// this.switchPlayers();
		// this.constructFirstHumanParts();
		// this.switchPlayers();
		// this.constructFirstAlienParts();
		// this.switchPlayers();
	},
	playGame : function(){ 
		this.dealParts();
		this.setupGame();
	},
	checkHumanIntegrity : function(){
		if(name.integrity <= 0){
			$("#container").hide()
			$("body").append("<div class = 'win-screen'> PLAYER 1 IS THE WINNER! </div>")
		} else {
			$(target).children("card-integrity").text(target.integrity)
			human.getVitals()
		}
	},
	
}


game.playGame();


