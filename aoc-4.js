const fs = require('fs')
const input = fs.readFileSync('aoc-4.txt', 'utf8')
const rows = input.split('\n')

const overlaps = rows.reduce((acc, row) => {
  const [p1, p2] = row.split(',')
    .reduce((accPairs, pair) => [...accPairs, pair.split('-')], [])
    .map(([num1, num2]) => [parseInt(num1), parseInt(num2)])
  if (p1[0] <= p2[0] && p1[1] >= p2[1] ||
      p1[0] >= p2[0] && p1[1] <= p2[1]) {
    acc[0] += 1
  }
  if (p1[1] >= p2[0] && p1[0] <= p2[0] ||
    p2[1] >= p1[0] && p2[0] <= p1[0]) {
    acc[1] += 1
  }
  return acc
}, [0, 0])

console.log('a:', overlaps[0])
console.log('b:', overlaps[1])