function getRandomIntegerNumber(MIN, MAX) {
  if (MIN < 0 || MAX < 0) { return NaN; }
  if (MIN < MAX) {
    MIN = Math.ceil(MIN);
    MAX = Math.floor(MAX);
    return `целое число из диапазона "от ${MIN} до ${MAX}": ${Math.floor(Math.random() * (MAX - MIN + 1) + MIN)}`;
  }
  return 'Поменяйте границы диапазона!';
}
getRandomIntegerNumber();


function getRandomFloatingPointNumber(MIN, MAX, AMOUNT_CHARACTERS_AFTER_POINT) {
  if (MIN < 0 || MAX < 0 || AMOUNT_CHARACTERS_AFTER_POINT < 0) { return NaN; }

  if (MIN < MAX) {
    return `число с плавающей точкой из диапазона "от ${MIN} до ${MAX}": ${+(Math.random() * (MAX - MIN) + MIN).toFixed(AMOUNT_CHARACTERS_AFTER_POINT)} с указанным количеством знаков после запятой ${AMOUNT_CHARACTERS_AFTER_POINT}`;
  }
  return 'Поменяйте границы диапазона!';
}

getRandomFloatingPointNumber();

