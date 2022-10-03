function getRandomFloatingPointNumber(min, max, amountCharactersAfterPoint) {
  if (min < 0 || max < 0 || amountCharactersAfterPoint < 0) {
    return NaN;
  }

  if (min < max) {
    return +(Math.random() * (max - min) + min).toFixed(amountCharactersAfterPoint);
  }
  return getRandomFloatingPointNumber(max, min, amountCharactersAfterPoint);
}

getRandomFloatingPointNumber();

function getRandomintegerNumber(min, max) {
  return getRandomFloatingPointNumber(min, max, 0);
}

getRandomintegerNumber();
