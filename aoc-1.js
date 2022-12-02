const fs = require('fs');
const input = fs.readFileSync('aoc-1.txt', 'utf8');
const data = input.trim().split('\n\n')

array = data.map((values) =>
  values.split('\n')
  .reduce((acc, values) => acc + parseInt(values), 0))
.sort((a,b) => b - a)

console.log('a:', array[0]);
console.log('b:', array.slice(0, 3)
  .reduce((acc, values) => acc + parseInt(values), 0))
