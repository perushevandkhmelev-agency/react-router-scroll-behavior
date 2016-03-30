import React, { Component, PropTypes } from 'react'
import RouterContext from 'react-router/lib/RouterContext'
import standard from './behaviors/standard'

export default class RouterScrollContext extends Component {
  static propTypes = {
    behavior: PropTypes.func,
    render: PropTypes.func.isRequired
  }

  static defaultProps = {
    behavior: standard,
    shouldUpdateScroll() {
      return true
    },
    render(props) {
      return <RouterContext {...props} />
    }
  }

  constructor(props) {
    super(props)

    this.scrollBehavior = props.behavior()
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
