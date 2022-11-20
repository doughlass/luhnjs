export const validate = (num: string | number): boolean => {
  const arr = (num.toString().replace(/[\s]/g, '') + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x))
  const lastDigit = arr.splice(0, 1)[0]
  let sum: number = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  )
  sum += lastDigit
  return sum % 10 === 0
}

export const generate = (
  input: number | string,
  inputOptions?: InputOptions
): string => {
  let string = input.toString()
  const options = { pad: 0, weightFactor: 2 }

  if (typeof inputOptions !== 'undefined') {
    if (typeof inputOptions.pad !== 'undefined') {
      options.pad = inputOptions.pad

      if (options.pad > string.length) {
        string = Array(options.pad - String(string).length).join('0') + string
      }
    }
  }

  return `${string}${checksum(string)}`
}

export const random = (input: number, inputOptions?: InputOptions): string => {
  return generate(getRandomStringOfNumbers(input - 1), inputOptions)
}

const checksum = (input: number | any): number => {
  const string: string = input.toString()
  let sum = 0
  let parity = 2

  for (let i = string.length - 1; i >= 0; i--) {
    const digit = Math.max(parity, 1) * Number(string[i])

    sum +=
      digit > 9
        ? digit
            .toString()
            .split('')
            .map(Number)
            .reduce((a, b) => a + b, 0)
        : digit
    parity *= -1
  }

  sum %= 10

  return sum > 0 ? 10 - sum : 0
}

const getRandomStringOfNumbers = (length: number): string => {
  let randomStringOfNumbers = ''

  while (randomStringOfNumbers.length < length) {
    const random: string = Math.random().toString()

    randomStringOfNumbers += random.substring(2, random.length)

    if (randomStringOfNumbers.length > length) {
      randomStringOfNumbers = randomStringOfNumbers.substring(0, length)
    }
  }

  return randomStringOfNumbers
}

export interface InputOptions {
  pad?: number
  weightFactor?: number
}
