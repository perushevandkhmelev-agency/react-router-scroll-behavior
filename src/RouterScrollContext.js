import React, { Component, PropTypes } from 'react'
import RouterContext from 'react-router/lib/RouterContext'
import * as behaviors from 'behaviors'

export default class RouterScrollContext extends Component {
  static propTypes = {
    behavior: PropTypes.oneOf(['simple', 'standard', 'top']),
    render: PropTypes.func.isRequired
  }

  static defaultProps = {
    behavior: 'standard',
    render(props) {
      return <RouterContext {...props} />
    }
  }

  constructor(props) {
    super(props)

    this.scrollBehavior = behaviors[props.behavior]()
    this.updateScroll(props.location)
  }

  componentDidMount() {
    this.scrollBehavior.start()
  }

  componentWillReceiveProps() {
    this.scrollBehavior.cancel()
  }

  componentDidUpdate() {
    this.updateScroll(this.props.location)
  }

  updateScroll(location) {
    this.scrollBehavior.updateScroll(location)
  }

  componentWillUnmount() {
    this.scrollBehavior.stop()
  }

  render() {
    const { render, ...passedProps } = this.props
    return render(passedProps)
  }
}
