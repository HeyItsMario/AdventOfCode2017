var data = require("./input");
var numArray = data.split("\n");
var length = numArray.length;
var nextIndex = 0;
var currIndex = 0;
var count = 0;


while(nextIndex < length && nextIndex >= 0){

	nextIndex = currIndex + parseInt(numArray[currIndex]);
	if(Math.abs(nextIndex - currIndex) >= 3){
		if(parseInt(numArray[currIndex]) >= 0){
			numArray[currIndex] = parseInt(numArray[currIndex]) - 1;	
		}else{
			numArray[currIndex] = parseInt(numArray[currIndex]) + 1; 
		}
		
	}else{
		numArray[currIndex] = parseInt(numArray[currIndex]) + 1; 	
	}
	
	currIndex = nextIndex;
	count++;
	
}

console.log(count);