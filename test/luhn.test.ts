import { generate, random, validate } from '../src/luhn';

test('Validate Luhn to be true', () => {
  const card = '4012111111111111';
  expect(validate(card)).toBeTruthy();
  expect(validate(`${card}    `)).toBeTruthy();
});

test('Validate Luhn to be false', () => {
  const card = '4012111111111111';
  expect(validate(`${card}z`)).toBeFalsy();
});

test('Generate a new Luhn', () => {
  expect(generate(1, { pad: 12 })).toEqual('000000000018');
  expect(generate(1, { pad: 10 })).toEqual('0000000018');
  expect(generate(1)).toEqual('18');
});

test('Generate a random Luhn', () => {
  expect(random(12, { pad: 12 })).toHaveLength(12);
  expect(random(12)).toHaveLength(12);
});
