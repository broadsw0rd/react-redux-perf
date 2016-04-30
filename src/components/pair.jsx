import React from 'react'

class Pair extends React.Component {
  constructor () {
    super()
    this.state = {
      direction: 'up'
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      direction: nextProps.value > this.props.value ? 'up' : 'down'
    })
  }

  shouldComponentUpdate (nextProps) {
    return this.props.value !== nextProps.value
  }

  render () {
    return (
      <li className='list-group-item'>
        <span>{this.props.name}</span>
        <span className={'pull-right ' + (this.state.direction === 'up' ? 'text-success' : 'text-warning')}>
          <span className={'glyphicon ' + (this.state.direction === 'up' ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down')}></span>
          <span>{this.props.value}</span>
        </span>
      </li>
    )
  }
}

export default Pair
