let lengths = ["AoC 2017"]; //[106,16,254,226,55,2,1,166,177,247,93,0,255,228,60,36];
let list = new Array(256);
let infoObj2 = {
  currPosition: 0,
  skip: 0
};
Array.prototype.rotate = function(n) {
  if (n > 0) {
    let index = n * -1;
    let firstPart = this.slice(0, this.length - n);
    let secondPart = this.slice(index);
    return secondPart.concat(firstPart);
  } else if (n < 0) {
    let index = -1 * n;
    let firstPart = this.slice(0, index);
    let secondPart = this.slice(-1 * (this.length - index));
    return secondPart.concat(firstPart);
  } else {
    return this;
  }
};

function initializeList(list) {
  for (let i = 0; i < list.length; i++) list[i] = i;
}

function knotHash(lengths, list, infoObj) {
  lengths.forEach(length => {
    let rotCount = (infoObj.currPosition - 0) * -1;
    let endIndex = 0 + length - 1;
    // rotate to make the selection start at index 0.
    // EX: 2,1),0,([3],4 -> ([3],4,2,1)0
    list = list.rotate(rotCount);
    // (3,4,2,1)
    let selectedPortion = list.slice(0, endIndex + 1);
    // (1,2,4,3)
    selectedPortion.reverse();
    // (0,1,2,4,3)
    list.splice(0, selectedPortion.length, ...selectedPortion);
    // (2,4,3,0,1)
    list = list.rotate(-1 * rotCount);
    infoObj.currPosition =
      (infoObj.currPosition + length + infoObj.skip) % list.length;
    infoObj.skip = infoObj.skip + 1;
  });

  return list;
}

function sparseHash(lengths, list, infoObj) {
  let ascArr = lengths
    .join()
    .split("")
    .map(val => val.charCodeAt(0));
  let suffix = [17, 31, 73, 47, 23];
  let hash = [];
  ascArr = ascArr.concat(suffix);
  let round = 63;
  while (round >= 0) {
    list = knotHash(ascArr, list, infoObj);
    round--;
  }
  let size = 1;
  let xor = list[0];
  while (size < list.length) {
    xor = xor ^ list[size];
    size++;

    if (size % 16 === 0) {
      hash.push(xor);
      xor = list[size];
      size++;
    }
  }

  hash.forEach((val, index, arr) => {
    arr[index] = ("00" + Number(val).toString(16)).slice(-2);
  });

  return hash.join("");
}

module.exports = {
  sparse: sparseHash
};
