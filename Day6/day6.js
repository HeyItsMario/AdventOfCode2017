var memory_bank = require("./input").split("\t");
var hash = new Object();

memory_bank.forEach((num,index, arr) => {
	arr[index] = parseInt(num);
})

var input = memory_bank;
var flag = false

// Has our initial input
hash[input.join(" ")] = 1;

let count = 0;
let repeatKey;

while(flag === false){
 	var maxObject = findMax(input);
 	var key = distribute(input, maxObject);
 	count++;
 	if(hash[key] === undefined){
 		hash[key] = count
 	}else{
 		flag = true;
 		repeatKey = key;
 	}
}

console.log("After " + count + " redestribution cycles we found the repeat");
console.log("detected in " + (count - hash[repeatKey]) );


function findMax(input){
	var size = input.length;
	var index = size - 1;
	var max = input[size - 1];

	for(let i = size - 2; i >= 0; i--){
		if(input[i] >= max){
			index = i;
			max = input[i];
		}
	}
	return { index, max };
}

function distribute(input, maxObject){
	var count = maxObject.max;
	var index = maxObject.index === input.length - 1 ? 0 : maxObject.index + 1;
	input[maxObject.index] = 0;

	while(count > 0){

		input[index] = input[index] + 1;
		if(index + 1 === input.length){
			index = 0;
		}else{
			index = index + 1;
		}
		count--;
	}

	return input.join(" ");

}