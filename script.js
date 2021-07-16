let spinning = [new Audio("src/audios/spinning.mp3"), new Audio("src/audios/spinning.mp3"), new Audio("src/audios/spinning.mp3"), new Audio("src/audios/spinning.mp3"), new Audio("src/audios/spinning.mp3"), new Audio("src/audios/spinning.mp3"), new Audio("src/audios/spinning.mp3")];
let coin = [new Audio("src/audios/coin.mp3"), new Audio("src/audios/coin.mp3")]
let winning = new Audio("src/audios/winning.wav");
let losing = new Audio("src/audios/losing.mp3");
let audio = false;
let titleState = document.getElementById("title-state")
let button = document.getElementById("spin")

const randomNumber = (min, max) => Math.floor((Math.random() * (max-min+1)) + min);


function testWin(){
	let slotOne = document.getElementById("slot-1").className
	let slotTwo = document.getElementById("slot-2").className
	let slotThree = document.getElementById("slot-3").className

	if ((slotOne == slotTwo && slotTwo == slotThree) ||
		(slotOne == slotTwo && slotThree == "a7") ||
		(slotOne == slotThree && slotTwo == "a7") ||
		(slotTwo == slotThree && slotOne == "a7") ){
		titleState.innerHTML = "GANHOU!";
		winning.play();
	}else{
		titleState.innerHTML = "PERDEU! :P UUHF!"
		losing.play();
	}
}

function performSlot(){
	let random = randomNumber(1,4)*7
	let slotNumber1 = random+randomNumber(1,7)
	let slotNumber2 = random+2*7+randomNumber(1,7)
	let slotNumber3 = random+4*7+randomNumber(1,7)

	let b1 = 0;
	let b2 = 0;
	let b3 = 0;
	let sound = 0
	titleState.innerHTML = "GIRANDO"
	slotOne = setInterval(firstSpinning, 50);
	slotTwo = setInterval(secondSpinning, 50);
	slotThree = setInterval(thirdSpinning, 50);
	function firstSpinning(){
		b1++;
		if (b1>=slotNumber1){
			coin[0].play()
			clearInterval(slotOne);
			return null;
		}
		slotIcon = document.getElementById("slot-1");
		if (slotIcon.className=="a7"){
			slotIcon.className = "a0";
		}
		slotIcon.className = "a"+(parseInt(slotIcon.className.substring(1))+1)
	}
	function secondSpinning(){
		b2++;
		if (b2>=slotNumber2){
			coin[1].play()
			clearInterval(slotTwo);
			return null;
		}
		slotIcon = document.getElementById("slot-2");
		if (slotIcon.className=="a7"){
			slotIcon.className = "a0";
		}
		slotIcon.className = "a"+(parseInt(slotIcon.className.substring(1))+1)
	}
	function thirdSpinning(){
		b3++;
		if (b3>=slotNumber3){
			clearInterval(slotThree);
			testWin();
			return null;
		}
		slotIcon = document.getElementById("slot-3");
		if (slotIcon.className=="a7"){
			slotIcon.className = "a0";
		}
		sound++;
		if (sound==spinning.length){
			sound=0;
		}
		spinning[sound].play();
		slotIcon.className = "a"+(parseInt(slotIcon.className.substring(1))+1)
	}
}

button.addEventListener("click", performSlot)