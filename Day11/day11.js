let data = require("./input").split(",");
let honeyComb = {
	source: {
		x: 0,
		y: 0
	}

}

let flag = false;
let max = 0;
data.forEach(val => {
	move(honeyComb, val);
	let value = getDistance(honeyComb);
	if(flag === false){
		max = value;
		flag = true;
	}
	if(value > max){
		max = value;
	}
	
});

console.log(honeyComb.source);

console.log(max);
console.log(getDistance(honeyComb));



// Receives the honeycomb and a direction
function move(hc, dir){
	
	switch(dir) {
		case 'n': {
			hc.source.y += 2;
			break;
		}
		case 'ne': {
			hc.source.x += 1;
			hc.source.y += 1;
			break;
		}
		case 'se': {
			hc.source.x += 1;
			hc.source.y -= 1;
			break;
		}
		case 's': {
			hc.source.y -= 2;
			break;
		}
		case 'sw': {
			hc.source.x -= 1;
			hc.source.y -= 1;
			break;
		}
		case 'nw': {
			hc.source.x -= 1;
			hc.source.y += 1;
			break;
		}
	}
}

function getDistance(hc){
	let xSteps = 0;
	let ySteps = 0;
	if(hc.source.y === 0)
		return Math.abs(hc.source.x)/ 2;
	if(hc.source.x === 0)
		return Math.abs(hc.source.y)/ 2;

	if(hc.source.y > 0){
		ySteps = hc.source.y - 1;
	}else{
		ySteps = hc.source.y + 1;
	}
	
	if(hc.source.x > 0){
		xSteps = hc.source.x - 1;
	}else{
		xSteps = hc.source.x + 1;
	}

	return ((Math.abs(ySteps) / 2) + (Math.abs(xSteps) / 2) + 1);
}

