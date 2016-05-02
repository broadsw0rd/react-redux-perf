# [react-redux](https://github.com/reactjs/react-redux) performance test
Dead simple performance test of the official React bindings for Redux

- [Sync](http://broadsw0rd.github.io/react-redux-perf/sync.html)
- [Async](http://broadsw0rd.github.io/react-redux-perf/async.html)

## Results

Sync | Async
--------| -----------
[DevTools Profiler Result](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-profiler.cpuprofile) | [DevTools Profiler Result](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-profiler.cpuprofile)
![Flame chart](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-chart.png) | ![Flame chart](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-chart.png) 
![Task Manager](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-task-manager.png) | ![Task Manager](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-task-manager.png)
![Chrome for android](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-mobile-2.png) | ![Chrome for android](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-mobile-2.png)
![IE mobile](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/sync-mobile-1.png) | ![IE mobile](https://raw.githubusercontent.com/broadsw0rd/react-redux-perf/master/perf-results/async-mobile-1.png)



## Abount Async

Although `react-redux` positioning itself like performant solution for connecting react components to the redux store,
However it rerender components on each store state changes [synchronously](https://github.com/reactjs/react-redux/blob/master/src/components/connect.js#L199), 
that can be an issue, if store changes very frequently. 
So instead of that we can put component, which should be updated, to the queue and with 60 FPS frequency update each component in queue:

```js 
var components = [] // list of all connected components(containers)

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
