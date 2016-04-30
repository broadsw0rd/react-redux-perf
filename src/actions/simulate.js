import store from '../store.js'
import * as c from '../constants.js'

function getRandIndex () {
  return Math.floor(Math.random() * (store.getState().length - 1))
}

function updatePair () {
  store.dispatch({
    type: c.UPDATE_PAIR,
    id: getRandIndex(),
    value: Math.random()
  })
}

function simulate () {
  setInterval(updatePair, 21)

  setInterval(updatePair, 34)

  setInterval(updatePair, 55)
}

export default simulate
