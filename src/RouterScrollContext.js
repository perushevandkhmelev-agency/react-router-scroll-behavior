import React, { Component, PropTypes } from 'react'
import RouterContext from 'react-router/lib/RouterContext'
import off from 'dom-helpers/events/off'
import on from 'dom-helpers/events/on'
import scrollLeft from 'dom-helpers/query/scrollLeft'
import scrollTop from 'dom-helpers/query/scrollTop'
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame'
import { readState, saveState } from 'history/lib/DOMStateStorage'
import setScrollRestoration from './setScrollRestoration'

let savePositionHandle = null
let unsetScrollRestoration, unlistenScroll, currentKey

export default class RouterScrollContext extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }

  static defaultProps = {
    render(props) {
      return <RouterContext {...props} />
    }
  }

  componentDidMount() {
    currentKey = this.props.location.key
    this.start()
  }

  componentWillReceiveProps(nextProps) {
    if (savePositionHandle !== null) {
      requestAnimationFrame.cancel(savePositionHandle)
      savePositionHandle = null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    currentKey = this.props.location.key
    this.updateScroll()
  }

  componentWillUnmount() {
    this.stop()
  }

  getScrollPosition() {
    const state = readState(currentKey)
    if (!state) {
      return null
    }

    return state.scrollPosition
  }

  start() {
    // This helps avoid some jankiness in fighting against the browser's
    // default scroll behavior on `POP` transitions.
    unsetScrollRestoration = setScrollRestoration('manual')

    function onScroll() {
      if (savePositionHandle !== null) {
        return
      }

      savePositionHandle = requestAnimationFrame(() => {
        savePositionHandle = null

        const state = readState(currentKey)
        const scrollPosition = [ scrollLeft(window), scrollTop(window) ]

        saveState(currentKey, { ...state, scrollPosition })
      })
    }

    on(window, 'scroll', onScroll)
    unlistenScroll = () => off(window, 'scroll', onScroll)
  }

  stop() {
    /* istanbul ignore if: not supported by any browsers on Travis */
    if (unsetScrollRestoration) {
      unsetScrollRestoration()
    }

    unlistenScroll()
  }

  updateScroll() {
    const [ x, y ] = this.getScrollPosition() || [ 0, 0 ]
    window.scrollTo(x, y)
  }

  render() {
    const { render, ...passedProps } = this.props
    return render(passedProps)
  }
}
