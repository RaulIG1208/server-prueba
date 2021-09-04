const palindrome = (string) => {
  if (string === undefined) return;
  return string.split('').reverse().join('');
};

const average = (array) => {
  if (array.length < 1) return 0;
  return array.reduce((a, b) => a + b) / array.length;
};

module.exports = { palindrome, average };
