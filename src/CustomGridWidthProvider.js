import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const WidthProvider = ComposedComponent => class extends React.Component { // eslint-disable-line
  static defaultProps = {
    measureBeforeMount: false
  }

  static propTypes = {
    measureBeforeMount: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string
  }

  state = {
    width: 1280
  }

  mounted = false

  // making these class variables rather than state variables to cut down on renders (performance)
  parent = null
  parentWidth = 0

  componentDidMount = () => {
    // mounted bool causes first render to be correct size, rather than initial render being the wrong size then correcting itself
    this.mounted = true
    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.onResize)
    this.onResize(true)
  }

  componentWillUnmount = () => {
    clearTimeout(this.debounce)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousemove', this.onResize)
    this.mounted = false
  }

  debounce = null
  onResize = bypass => {
    if (!this.mounted) return
    if (bypass === true) {
      const node = ReactDOM.findDOMNode(this)
      if (node instanceof window.HTMLElement) this.setState({width: node.offsetWidth})
    } else {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        const node = ReactDOM.findDOMNode(this)
        if (node instanceof window.HTMLElement) this.setState({width: node.offsetWidth})
      }, 25)
    }
  }

  render = () => {
    if (this.props.measureBeforeMount && !this.mounted) {
      return <div className={this.props.className} style={this.props.style} />
    }

    return <ComposedComponent {...this.props} {...this.state} />
  }
}

// export default WidthProvider
