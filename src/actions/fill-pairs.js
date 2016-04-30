import store from '../store.js'
import chance from '../chance.js'
import * as c from '../constants.js'

var count = 60

function createPairs () {
  var pairs = []
  for (var i = 0; i < count; i++) {
    var pair = chance.currency_pair()
    pairs.push({
      id: i,
      value: Math.random(),
      name: pair[0].code + pair[1].code
    })
  }
  return pairs
}

function fillPairs () {
  store.dispatch({
    type: c.FILL_PAIRS,
    pairs: createPairs()
  })
}

export default fillPairs
