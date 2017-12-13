var data = require("./input");
var fireWall = data.split("\n");
var layers = [];

fireWall.forEach((info) => {
	let depthRange = info.match(/\d+/g);
	let depth = parseInt(depthRange[0]);
	let range = parseInt(depthRange[1]);
	layers.push({depth, range});
});

getDelay();

function getDelay(){
	let delay = 0;
	let flag = true;
	
	while(flag){
		flag = false
		layers.forEach(layer => {
			let index = getIndex(layer.range, layer.depth + delay);
			if( index === 0 ){
				flag = true;
			}
		});
		delay++;
	}
	console.log(delay - 1);	
}

function getIndex(range, steps){
	let index = steps % (range * 2 - 2);
	let limit = range - 1;
	return index < range ? index : limit * 2 - 2;
}
