import { createStore } from 'redux'

import pairs from './reducers/pairs.js'

var store = createStore(pairs)

export default store
