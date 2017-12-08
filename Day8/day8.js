var data = require("./input");

var arr = data.split("\n");
var hash = new Object();
var maxEver = undefined;

arr.forEach((val, index, myArray) => {
  var instructionSet = val.split(" ");
  var register = instructionSet[0];
  var value = parseInt(instructionSet[2]);
  var condReg = instructionSet[4];
  var condNum = parseInt(instructionSet[6]);
  var condition = instructionSet[5];

  setRegisters(register, condReg);
  if (testConditional(condReg, condition, condNum)) {
    if (instructionSet[1] == "inc") {
      hash[register] += value;
    } else {
      hash[register] -= value;
    }
  }
  if (maxEver === undefined) {
    maxEver = hash[register];
  } else {
    if (hash[register] > maxEver) {
      maxEver = hash[register];
    }
  }
});
var max = undefined;

for (key in hash) {
  let value = hash[key];
  if (max === undefined) {
    max = value;
  } else {
    if (value > max) {
      max = value;
    }
  }
}
console.log(maxEver);
console.log(max);

function setRegisters(regA, regB) {
  if (hash[regA] === undefined) {
    hash[regA] = 0;
  }
  if (hash[regB] === undefined) {
    hash[regB] = 0;
  }
}

function testConditional(register, condition, condNum) {
  let num = parseInt(condNum);
  switch (condition) {
    case ">": {
      return hash[register] > num ? true : false;
    }
    case "<": {
      return hash[register] < num ? true : false;
    }
    case ">=": {
      return hash[register] >= num ? true : false;
    }
    case "<=": {
      return hash[register] <= num ? true : false;
    }
    case "==": {
      return hash[register] == num ? true : false;
    }
    case "!=": {
      return hash[register] != num ? true : false;
    }
  }
}
