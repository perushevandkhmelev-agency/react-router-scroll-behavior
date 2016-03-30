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
    shouldUpdateScroll() {
      return true
    },
    render(props) {
      return <RouterContext {...props} />
    }
  }

  constructor(props) {
    super(props)

    this.scrollBehavior = behaviors[props.behavior]()
  }

  componentDidMount() {
    this.scrollBehavior.start()
  }

  componentWillReceiveProps() {
    this.scrollBehavior.cancel()
  }

  componentDidUpdate(prevProps) {
    if (shouldUpdateScroll(prevProps.location, this.props.location)) {
      this.updateScroll(this.props.location)
    }
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
