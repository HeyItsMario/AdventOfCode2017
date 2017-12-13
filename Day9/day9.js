var data = require("./input");
var gbc = {
	count: 0
}
var test = filterStream(data, gbc);

// while(test.indexOf(',') !== -1){
// 	test = test.replace(',', '');
// }


const garbage = data.replace(/!./g, "").match(/<.*?>/g).map(str => str.length - 2);
const result = garbage.reduce((a, b) => a + b);

console.log("RESULT " + result);

getGroupCount(test);

getIgnoredChar(data,gbc)

console.log("GBC " + gbc.count);

function getIgnoredChar(line, gbc){
	let count = 0;
	let i = 0;
	
	while(i < line.length){
		if(line[i] === '!'){
			count += 2;
			i += 2;
		}else{
			i++;
		}
	}
	
	gbc.count -= count;

}

function getGroupCount(river){
  var river = river.split("");
	var group = [];
	var sum = 0;

  river.forEach((token, index, arr) => {
  	if(token === '{'){
  		group.push(token);
  	} else if(token === '}'){
  		sum += group.length;
  		group.pop();
  	}
  });
  console.log(sum);
}

function filterStream(streem, gbc){
	let begin = streem.indexOf('<');
	let end = streem.indexOf('>', begin);
	let flag = true;
	if(begin === -1){
		return streem;
	}
	// Keep looking for the index of '>' that doesn't have a '!' b4 it
	while(streem.charAt(end - 1) === '!' && flag === true){
		if(ignoreEx(streem, end - 1)){
			flag = false;
		}else {
			end = streem.indexOf('>', end + 1);	
		}
		
	}

	let beforeGarbage = streem.slice(0, begin);
	let afterGarbage = streem.slice(end + 1);
	let newStream = beforeGarbage + afterGarbage;
	let garbageCount = streem.length - newStream.length - 2;
	
	gbc.count += garbageCount;
	
	
	// if there a '<' character this mean theres more trash
	if(newStream.indexOf('<') === -1){
		return newStream;
	}else{
		return filterStream(newStream, gbc);
	}	
}

function ignoreEx(test, index){
	let count = 1;
	let flag = true;
	
	while(flag){
		if(test[index] === test[index - 1]){
			count++;
			index = index - 1;
		}else{
			flag = false;
		}
	}

	return count % 2 === 0 ? true: false;

}