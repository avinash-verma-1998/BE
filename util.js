module.exports.sieve = function(n) {
  var boolArr = [];
  for (var i = 0; i < n; i++) {
    boolArr.push(true);
  }

  for (var i = 2; i * i < n; i++) {
    if (boolArr[i] === true) {
      for (var j = i * i; j < n; j = j + i) {
        boolArr[j] = false;
      }
    }
  }
  primeArr = [];
  for (var i = 2; i < n; i++) {
    if (boolArr[i] === true) {
      primeArr.push(i);
    }
  }

  return primeArr;
};
