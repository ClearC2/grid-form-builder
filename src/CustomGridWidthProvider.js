import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const WidthProvider = ComposedComponent => class extends React.Component {
  static defaultProps = {
    measureBeforeMount: false
  }

  static propTypes = {
    measureBeforeMount: PropTypes.bool
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
    this.onResize()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mouseenter', this.onResize)
    this.mounted = false
  }

  onResize = () => {
    if (!this.mounted) return
    const node = ReactDOM.findDOMNode(this)
    if (node instanceof window.HTMLElement) this.setState({width: node.offsetWidth})
  }

  render = () => {
    if (this.props.measureBeforeMount && !this.mounted) {
      return <div className={this.props.className} style={this.props.style} />
    }

    return <ComposedComponent {...this.props} {...this.state} />
  }
}

export default WidthProvider
