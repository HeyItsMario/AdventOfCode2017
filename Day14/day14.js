var knotSparse = require("../Day10/day10");
var lengths = createLengths("wenycdww");
var list = new Array(256);
let infoObj = {
  currPosition: 0,
  skip: 0
};

initializeList(list);
var hash;
var hashes = [];
var grid = [];

for (let i = 0; i < 128; i++) {
  hash = knotSparse.sparse([lengths[i]], list, infoObj);
  infoObj.currPosition = 0;
  infoObj.skip = 0;
  initializeList(list);
  hashes.push(hash);
}

var bin = "";

hashes.forEach((hsh, index, arry) => {
  hsh.split("").forEach((chr, i, a) => {
    bin += hexToBin(chr);
  });
  grid.push(bin);
  bin = "";
});
let sum = 0;
grid.forEach((bin, i, arr) => {
  sum += bin.match(/1/g).length;
});
//console.log(sum);

//console.log(grid);

grid.forEach((bin, i, arr) => {
  var bitMap = [];
  bin.split("").forEach((bit, index) => {
    let bitObj = {
      bit: bit,
      group: undefined
    };
    bitMap.push(bitObj);
  });
  arr[i] = bitMap;
});

getGroupCount(grid);

console.log(grid[0]);

function getGroupCount(grid) {
  for (let i = 0; i < grid.length; i++) {
    let bitMap = grid[i];
    for (let j = 0; j < bitMap.length; j++) {
      let upBit;
      if (grid[i - 1] === undefined) {
        upBit = undefined;
      } else {
        upBit = grid[i - 1][j];
      }
      let leftBit = bitMap[j - 1];
      let currentBit = bitMap[j];
      if (upBit === undefined && leftBit === undefined) {
        currentBit.group = 1;
      } else if (upBit === undefined) {
        if (currentBit.bit === leftBit.bit) {
          currentBit.group = leftBit.group;
        }
      } else if (leftBit === undefined) {
        if (currentBit.bit === upBit.bit) {
          currentBit.group = upBit.group;
        }
      } else {
        if (currentBit.bit === upBit.bit || currentBit.bit === leftBit.bit) {
          currentBit.group = upBit.group || leftBit.group;
        }
      }
    }
  }
}

function hexToBin(value) {
  return ("0000" + parseInt(value, 16).toString(2)).slice(-4);
}

function initializeList(list) {
  for (let i = 0; i < list.length; i++) list[i] = i;
}

function createLengths(input) {
  let length = [];
  for (let i = 0; i <= 127; i++) {
    length.push(`${input}-${i}`);
  }
  return length;
}
