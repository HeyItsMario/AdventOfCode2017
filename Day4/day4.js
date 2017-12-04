var data = require("./input");

var valid = data.length;
console.log(valid);
var anagramCount = 0

data.forEach((passphrase) => {
	var arr = passphrase.split(" ");
	var repeated = false;
	arr.forEach((word) => {
		let start = 0;
		let count = 0;
		while(arr.indexOf(word, start) != -1){
			start = arr.indexOf(word, start) + 1;
			count++;
		}

		if(count > 1){
		  repeated = true;
		}
		  

	});

	if(repeated === true){
		valid--;
		repeated = false;
	}
});
console.log(valid);
valid = data.length;

data.forEach((passphrase) => {
	var wordArray = passphrase.split(" ");
	var wordCount = wordArray.length;
	var count = 0;
	var flag = false;
	for(let i = 0; i < wordCount - 1; i++){
		for(let j = i + 1; j < wordCount; j++){
			if(compareWords(wordArray[i], wordArray[j])){
			  count++;
			  flag = true;
			}

		}
	}

	if(flag === true){
		valid--;
		flag = false;
	}




})

function compareWords(wordA, wordB) {
	let a = wordA.split("").sort().join("");
	let b = wordB.split("").sort().join("");

	return a === b ? true : false;
}

console.log(valid);