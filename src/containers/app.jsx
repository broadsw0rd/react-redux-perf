import React from 'react'
import { connect } from 'react-redux'

import fillPairs from '../actions/fill-pairs.js'
import simulate from '../actions/simulate.js'
import selector from '../selectors/pair-selector.js'
import Pair from '../components/pair.jsx'

class App extends React.Component {
  componentWillMount () {
    fillPairs()
    simulate()
  }

  render () {
    return (
      <div className='row'>
        {this.props.groups.map((group, idx) => {
          return (
            <div className='col-lg-4' key={idx}>
              <ul className='list-group'>
                {group.map((pair) => {
                  return (
                    <Pair key={pair.id} name={pair.name} value={pair.value} />
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(selector)(App)
