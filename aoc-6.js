const fs = require('fs')
const input = fs.readFileSync('aoc-6.txt', 'utf8')
const data = Array.from(input)

const findMarker = (size) => {
  let position = 0
  data.some((_, index) => {
    position = index
    const section = data.slice(index, index + size)
    return section.every((char, subIndex) =>
      !section.slice(subIndex + 1, size).includes(char))
  })
  return position + size
}

console.log('a:', findMarker(4))
console.log('b:', findMarker(14))
