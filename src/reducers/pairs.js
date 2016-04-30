import * as c from '../constants.js'

var initialState = []

function pairs (state = initialState, action) {
  switch (action.type) {
    case c.FILL_PAIRS: {
      return action.pairs.concat()
    }
    case c.UPDATE_PAIR: {
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          state[i].value = action.value
        }
      }
      return state.concat()
    }
    default: {
      return state
    }
  }
}

export default pairs
