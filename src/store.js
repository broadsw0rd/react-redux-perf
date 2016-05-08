import { createStore } from 'redux'
import { batchedSubscribe } from 'redux-batched-subscribe'

import pairs from './reducers/pairs.js'

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame

var lazyNotify = function () {}

function digest () {
  lazyNotify()
  requestAnimationFrame(digest)
}

digest()

var store = createStore(pairs, [], batchedSubscribe((nofity) => { lazyNotify = nofity }))

export default store
