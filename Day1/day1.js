const input = require("./input.js");

function partOne(input) {
	let inputArray = input.split('');
  let sum = 0;

	if(inputArray[0] === inputArray[inputArray.length - 1]) {
		sum += parseInt(inputArray[0]);
	}

	inputArray.forEach((currVal, currIndex, arr) => {
		let index = arr.indexOf(currVal, currIndex + 1);
		if( index === currIndex + 1 ){
			sum += parseInt(currVal);
		}
	});
  console.log(sum);	
}

function partTwo(input) {
  let inputArray = input.split('');
  let sum = 0;

  inputArray.forEach((currVal, currIndex, arr) => {
    let halfWay = arr.length / 2;

    if(arr[currIndex] === arr[currIndex + halfWay]){
      sum += parseInt(currVal);
    } else if(arr[currIndex] === arr[currIndex - halfWay]) {
      sum += parseInt(currVal);
    }

  });
  console.log(sum);
}

partOne(input);
partTwo(input);