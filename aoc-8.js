
const fs = require('fs')
const input = fs.readFileSync('aoc-8.txt', 'utf8')
const trees = input.split('\n')
const treesRows = trees.map(row => row.split('').map(Number))

const [width, height] = [treesRows[0].length, treesRows.length]

const calc = (rows) => {
  const visibleTrees =  new Array(width).fill(0).map(() => [])
  rows.forEach((row, y) => {
    row.forEach((tree, x) => {
      let visible = []
      let scenic = 0
      for (left = x - 1; left >= 0; left--) {
        visible.push(row[left] < tree)
        scenic++
        if (row[left] >= tree) break
      }
      visibleTrees[y].push([scenic, visible.every((v) => v)])
    })
  })
  return visibleTrees
}

const rotate = (rows, num=1) => {
  const rotated = new Array(width).fill(0).map(() => [])
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      rotated[x].unshift(rows[y][x])
    }
  }
  return num > 1 ? rotate(rotated, --num) : rotated
}

let visibleTrees1 = calc(treesRows)
let rotated1 = rotate(treesRows)
let visibleTrees2 = calc(rotated1)
let rotated2 = rotate(rotated1)
let visibleTrees3 = calc(rotated2)
let rotated3 = rotate(rotated2)
let visibleTrees4 = calc(rotated3)
visibleTrees2 = rotate(visibleTrees2, 3)
visibleTrees3 = rotate(visibleTrees3, 2)
visibleTrees4 = rotate(visibleTrees4)

let sum = 0
let num = 0
for (x = 0; x < width; x++) {
  for (y = 0; y < height; y++) {
    const mul =
      visibleTrees1[x][y][1] || visibleTrees2[x][y][1] ||
      visibleTrees3[x][y][1] || visibleTrees4[x][y][1]
    mul && num++
    sum = Math.max(
      visibleTrees1[x][y][0] * visibleTrees2[x][y][0] *
      visibleTrees3[x][y][0] * visibleTrees4[x][y][0], sum)
  }
}

console.log('a:',num)
console.log('b:',sum)
