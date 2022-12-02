const fs = require('fs');
const input = fs.readFileSync('aoc-2.txt', 'utf8');
const data = input.split('\n')
const sum = (values) => values.reduce((sum, score) => sum += score)

const WIN = 6
const DRAW = 3
const LOSS = 0

const ROCK = 1
const PAPER = 2
const SCISSOR = 3

const ROCK_LEFT = 'A'
const PAPER_LEFT = 'B'
const SCISSOR_LEFT = 'C'

const X = 'X'
const Y = 'Y'
const Z = 'Z'

const A_PLAYS = {
  [ROCK_LEFT]: {
    [X]: DRAW + ROCK,
    [Y]: WIN + PAPER,
    [Z]: LOSS + SCISSOR
  },
  [PAPER_LEFT]: {
    [X]: LOSS + ROCK,
    [Y]: DRAW + PAPER,
    [Z]: WIN + SCISSOR
  },
  [SCISSOR_LEFT]: {
    [X]: WIN + ROCK,
    [Y]: LOSS + PAPER,
    [Z]: DRAW + SCISSOR
  },
}

const B_PLAYS = {
  [ROCK_LEFT]: {
    [X]: LOSS + SCISSOR,
    [Y]: DRAW + ROCK,
    [Z]: WIN + PAPER
  },
  [PAPER_LEFT]: {
    [X]: LOSS + ROCK,
    [Y]: DRAW + PAPER,
    [Z]: WIN + SCISSOR
  },
  [SCISSOR_LEFT]: {
    [X]: LOSS + PAPER,
    [Y]: DRAW + SCISSOR,
    [Z]: WIN + ROCK
  },
}

const a_result = data.reduce((acc, row) => {
  const [left, right] = row.split(' ')
  return [...acc, A_PLAYS[left][right]]
}, [])

const b_result = data.reduce((acc, row) => {
  const [left, right] = row.split(' ')
  return [...acc, B_PLAYS[left][right]]
}, [])

console.log('A result:', sum(a_result));
console.log('B result:', sum(b_result));
