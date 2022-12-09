const fs = require('fs')
const input = fs.readFileSync('aoc-9.txt', 'utf8')
const sleep = ms => new Promise(r => setTimeout(r, ms));

const L = 'L'
const R = 'R'
const U = 'U'
const D = 'D'

const document = input.split('\n')

const instructions = document.map(row => {
  const [direction, amount] = row.split(' ')
  return [direction, Number(amount)]
})

const skipRender = true
const timeout = 60
const size = 300
const startPosX = size/2
const startPosY = size/2
const grid = new Array(size)
  .fill(0)
  .map(() => new Array(size*2)
    .fill('.'))

async function start(snakesize) {
  const snake = {
    head: {x: startPosX, y: startPosY},
    tail: new Array(snakesize - 1).fill(0)
      .map(() => ({x: startPosX, y: startPosY})),
    visitedCords: []
  }

  const renderGrid = async (instruction) => {
    if (skipRender) return
    console.clear()
    console.log(instruction)
    lines = ''
    for (y = 0; y < size; y++) {
      for (x = 0; x < size; x++) {
        lines += grid[x][y]
        snake.tail.forEach((tail, num) => {
          if (tail.x === x && tail.y === y) {
            lines = lines.slice(0, -1)
            lines += num
          }
        })
        if (snake.head.x === x && snake.head.y === y) {
          lines = lines.slice(0, -1)
          lines += 'H'
        }
      }
      lines += '\n'
    }
    console.log(lines)
    await sleep(timeout)
  }

  const moveSnake = async () => {
    const {head, tail} = snake
    for (const instruction of instructions) {
      const [direction, amount] = instruction
  
      for (let step = 0; step < amount; step++) {
        
        if (direction === R) {
          head.x += 1
        } else if (direction === L) {
          head.x -= 1
        } else if (direction === U) {
          head.y -= 1
        } else if (direction === D) {
          head.y += 1
        }

        await renderGrid(instruction)

        const moveTail = async (tailhead, index) => {
          const tail = snake.tail[index]
          if (tailhead.x + 1 < tail.x) { // left
            within = false
            tail.x -= 1
            if (tail.y < tailhead.y) {
              tail.y += 1
            } else if (tail.y > tailhead.y) {
              tail.y -= 1
            }
          } 
          if (tailhead.x - 1 > tail.x) { // right
            within = false
            tail.x += 1
            if (tail.y < tailhead.y) {
              tail.y += 1
            } else if (tail.y > tailhead.y) {
              tail.y -= 1
            }
          } 
          if (tailhead.y + 1 < tail.y) { // up
            within = false
            tail.y -= 1
            if (tail.x < tailhead.x) {
              tail.x += 1
            } else if (tail.x > tailhead.x) {
              tail.x -= 1
            }
          } 
          if (tailhead.y - 1 > tail.y) { // down
            within = false
            tail.y += 1
            if (tail.x < tailhead.x) {
              tail.x += 1
            } else if (tail.x > tailhead.x) {
              tail.x -= 1
            }
          }

          if (index === snake.tail.length - 1) {
            snake.visitedCords.push('' + tail.x + tail.y)
          }

          if (index < snake.tail.length - 1) {
            moveTail(tail, ++index)
          }
        }

        await moveTail(snake.head, 0)
        await renderGrid(instruction)
      }
    }
  }

  await moveSnake()
  return snake
}

start(2)
  .then((snake) => {
    const filtered = [...new Set(snake.visitedCords)]
    console.log('a: ',filtered.length)
  })

start(10)
  .then((snake) => {
    const filtered = [...new Set(snake.visitedCords)]
    console.log('b: ',filtered.length)
  })

