# [react-redux](https://github.com/reactjs/react-redux) performance test
Dead simple performance test for official React bindings for Redux

- [Sync](http://broadsw0rd.github.io/react-redux-perf/sync.html)
- [Async](http://broadsw0rd.github.io/react-redux-perf/async.html)

## Results

Sync | Async
--------| -----------
[DevTools Profiler Result](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-profiler.cpuprofile) | [DevTools Profiler Result](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-profiler.cpuprofile)
![](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-chart.png) | ![](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-chart.png) 
![](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-mobile-1.png) | ![](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-mobile-1.png)

## Abount Async

Instead of synchronously update components state on [each store state changes](https://github.com/reactjs/react-redux/blob/master/src/components/connect.js#L199) we can put component which should be updated to the queue and with 60 FPS frequency update each component in queue:

```js 
var components = []

function digest () {
  for (var i = 0; i < components.length; i++) {
    var component = components[i]
    if (component.shouldHandleStoreStateChange) {
      component.handleChange()
    }
  }
  requestAnimationFrame(digest)
}

digest()

// ...

trySubscribe() {
  if (shouldSubscribe && !this.unsubscribe) {
    this.unsubscribe = this.store.subscribe(this.queueChanges.bind(this))
    this.handleChange()
    components.push(this)
  }
}

queueChanges () {
  this.shouldHandleStoreStateChange = true
}

handleChange() {

  // ...
  
  this.hasStoreStateChanged = true
  this.shouldHandleStoreStateChange = false
  this.setState({ storeState })
}

```

## V8 Bailout reasons
