var fs = require('fs');
var data = require("./input");

fs.readFile('./input.txt', (err,data) => {
	
	if(err) throw err;
	
	let rows = data.toString().match(/\n/g).length + 1;
	let arr = data.toString().split(/\n|\t/);
  let k = 1;
  let min = 999999;
  let max = -99999;
  let sum = 0;

  arr.forEach((currVal, currIndex, arr) => {
    var cv = parseInt(currVal);
    if(cv > max) {
      max = cv;
    } else if (cv < min) {
      min = cv;
    }

    if(k % 16 === 0){
      sum += (max - min);
      min = 9999999;
      max = -9999999;
    }
    k++;
  });  

  console.log(sum);

});

var sum = 0;

data.forEach(set => {
  set.sort((a,b) => a - b);
})

data.forEach(set => {
  let size = set.length;
  for(let i = 0; i < size; i++){
    let k = i + 1;
    while(k < size){
      if(set[k] % set[i] === 0){
        sum += (set[k] / set[i]);
      }
      k++;
    }
  }
});

console.log(sum);

