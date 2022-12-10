const fs = require('fs')
const input = fs.readFileSync('aoc-9.txt', 'utf8')
const document = input.split('\n')

const instructions = document.map(row => {
  const [direction, amount] = row.split(' ')
  return [direction, Number(amount)]
})

function start(snakesize) {
  const rope = new Array(snakesize).fill(0)
    .map(() => ({x: 300 / 2, y: 300 / 2}))
  rope.visited = new Set()
  const knot = rope[0]

  for (const [direction, amount] of instructions) {
    for (let step = 0; step < amount; step++) {
      
      if (direction === 'R') {
        knot.x += 1
      } else if (direction === 'L') {
        knot.x -= 1
      } else if (direction === 'U') {
        knot.y -= 1
      } else if (direction === 'D') {
        knot.y += 1
      }

      const moveTail = (prevKnot, index) => {
        const knot = rope[index]
        if (prevKnot.x + 1 < knot.x) { // left
          knot.x -= 1
          if (knot.y < prevKnot.y) {
            knot.y += 1
          } else if (knot.y > prevKnot.y) {
            knot.y -= 1
          }
        } 
        if (prevKnot.x - 1 > knot.x) { // right
          knot.x += 1
          if (knot.y < prevKnot.y) {
            knot.y += 1
          } else if (knot.y > prevKnot.y) {
            knot.y -= 1
          }
        } 
        if (prevKnot.y + 1 < knot.y) { // up
          knot.y -= 1
          if (knot.x < prevKnot.x) {
            knot.x += 1
          } else if (knot.x > prevKnot.x) {
            knot.x -= 1
          }
        } 
        if (prevKnot.y - 1 > knot.y) { // down
          knot.y += 1
          if (knot.x < prevKnot.x) {
            knot.x += 1
          } else if (knot.x > prevKnot.x) {
            knot.x -= 1
          }
        }

        if (index === rope.length - 1) {
          rope.visited.add('' + knot.x + knot.y)
        }

        if (index < rope.length - 1) {
          moveTail(knot, ++index)
        }
      }

      moveTail(knot, 0)
    }
  }
  return rope
}

console.log('a: ',start(2).visited.size)
console.log('b: ',start(10).visited.size)
