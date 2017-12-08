var data = require("./input");

var procArr = data.split("\n");
var hash = new Object();
var weightHash = new Object();
var reg = /\(([^)]+)\)/;
var bottom;
var bottomIndex;
var results = [[]];

procArr.forEach((proc, index, arr) => {
  var weight = proc.match(reg)[1];
  var line = proc.split(/\s|,/);
  var key = line[0];

  if (hash[key] === undefined) {
    hash[key] = {
      w: weight,
      flag: 1,
      index: index,
      parent: ""
    };
  } else {
    if (hash[key].w === undefined) {
      hash[key].w = weight;
      hash[key].index = index;
    }
  }

  if (line.includes("->")) {
    let index = line.indexOf("->");
    for (let i = index + 1; i < line.length; i++) {
      if (line[i] !== "") {
        let hashKey = line[i];
        if (hash[hashKey] === undefined) {
          hash[hashKey] = {
            w: undefined,
            flag: 0,
            parent: key
          };
        } else {
          hash[hashKey].flag = 0;
          hash[hashKey].parent = key;
        }
      }
    }
  }
});

for (key in hash) {
  if (hash[key].flag !== 0) {
    console.log(key + " with index " + hash[key].index);
    bottom = key;
    bottomIndex = hash[key].index;
  }
}
let test = total(bottomIndex, 0, bottom);

getDiff(results[3]);

function total(index, level, parent) {
  let currWeight = parseInt(procArr[index].match(reg)[1]);
  let line = procArr[index].split(/\s|,/);
  let parentt = line[0];
  let i = line.indexOf("->");
  let sums = [];
  let totalSum = 0;
  let test = [];
  if (i !== -1) {
    for (i = i + 1; i < line.length; i++) {
      if (line[i] !== "") {
        var newIndex = hash[line[i]].index;
        sums.push(total(newIndex, level + 1, parentt));
      }
    }
    totalSum += currWeight;

    for (let j = 0; j < sums.length; j++) {
      totalSum += parseInt(sums[j]);
    }
    if (results[level] === undefined) {
      results[level] = [];
      let info = { sum: totalSum, parent: parent, curr: currWeight };
      results[level].push(info);
    } else {
      let info = { sum: totalSum, parent: parent, curr: currWeight };
      results[level].push(info);
    }

    return totalSum;
  } else {
    return parseInt(currWeight);
  }
}

function getDiff(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].parent === arr[i + 1].parent) {
      if (arr[i].sum !== arr[i + 1].sum) {
        console.log(arr[i].sum + " Does not match with " + arr[i + 1].sum);
        console.log(arr[i]);
        console.log(arr[i + 1]);
      }
    }
  }
}
