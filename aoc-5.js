const fs = require('fs')
const input = fs.readFileSync('aoc-5.txt', 'utf8')

const stuff = input.split('\n\n')
const crates = stuff[0].split('\n').slice(0, -1)
const document = stuff[1].split('\n')
const instructions = document.map((line) => line.match(/[0-9]+/g).map(Number))

const columns = crates.reduce((acc, row) => {
  let column = 0
  for (let i = 0; i < row.length; i += 4) {
    const item = row.slice(i, i + 4).trim()
    item && acc[column].unshift(item)
    column++
  }
  return acc;
}, [[],[],[],[],[],[],[],[],[]])

let a_columns = structuredClone(columns)
let b_columns = structuredClone(columns)

instructions.forEach(([quantity, from, to]) => {
  const a_movingItems = a_columns[from - 1].splice(-quantity, quantity)
  a_columns[to - 1] =  [...a_columns[to - 1], ...a_movingItems.reverse()]
  const b_movingItems = b_columns[from - 1].splice(-quantity, quantity)
  b_columns[to - 1] =  [...b_columns[to - 1], ...b_movingItems]
})

console.log('a:', a_columns.map((column) => column.at(-1)[1]).join(''))
console.log('b:', b_columns.map((column) => column.at(-1)[1]).join(''))
