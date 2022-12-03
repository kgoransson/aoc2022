const fs = require('fs')
const input = fs.readFileSync('aoc-3.txt', 'utf8')
const bags = input.split('\n')

const sum = (values) => values.reduce((sum, score) => sum += score)
const charCode = (char) => {
  const code = char.charCodeAt(0) - 96
  return code < 0 ? code + 58 : code
}

// a
const a_codes = bags.reduce((acc, items) => {
  const left = items.slice(0, items.length / 2).split('')
  const right = items.slice(items.length / 2).split('')

  const code = left.reduce((acc, char) => {
    return right.includes(char) ? charCode(char) : acc
  }, 0)

  return [...acc, code]
}, [])

console.log('a:', sum(a_codes))

let b_codes = 0

// b
for (let index = 0; index < bags.length; index += 3) {
  const chars = bags[index].split('')
  const first = chars.filter((char) => bags[index + 1].includes(char))
  const second = first.filter((char) => bags[index + 2].includes(char))
  b_codes += charCode(second[0]);
}

console.log('b:', b_codes);
