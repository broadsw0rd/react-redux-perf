import { createStore } from 'redux'
import { batchedSubscribe } from 'redux-batched-subscribe'

import pairs from './reducers/pairs.js'

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame

var lazyNotify = function () {}
var noop = function () {}

function digest () {
  lazyNotify()
  lazyNotify = noop
  requestAnimationFrame(digest)
}

digest()

var store = createStore(pairs, [], batchedSubscribe((nofity) => { lazyNotify = nofity }))

export default store
