const { palindrome } = require('../utils/for_testing');

test('palindrome of raul', () => {
  const result = palindrome('raul');
  expect(result).toBe('luar');
});

test('palindrome of empty string', () => {
  const result = palindrome('');
  expect(result).toBe('');
});

test('palindrome of undefined', () => {
  const result = palindrome();
  expect(result).toBeUndefined();
});
