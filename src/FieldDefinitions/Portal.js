import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createPortal} from 'react-dom'

let portal

class Portal extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    id: PropTypes.string,
    portalTarget: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ])
  }

  static defaultProps = {
    id: 'portal',
    portalTarget: 'body'
  }

  state = {
    id: ''
  }

  element = document.createElement('div')

  componentDidMount () {
    const {portalTarget} = this.props
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    this.element.style.cssText = 'position: absolute;z-index: 10000'
    this.element.id = id

    portal = document.getElementsByTagName(portalTarget)[0]
    if (portal) {
      portal.appendChild(this.element)
    }

    this.setState({id})
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.portalTarget && !prevProps.portalTarget) {
      portal = document.getElementsByTagName(this.props.portalTarget)[0]
      portal.appendChild(this.element)
    }
  }

  componentWillUnmount () {
    portal.removeChild(this.element)
  }

  setStyles = () => {
    const {style = {}} = this.props

    // setting position to place portal
    let offset = {}
    let target = document.getElementById(this.props.id)
    if (this.props.id && target) {
      target = target.getBoundingClientRect()

      offset['marginLeft'] = target.x
      offset['marginTop'] = target.top + target.height

      if (style.portalLeft) {
        offset.marginLeft += style.portalLeft
      }

      if (style.portalTop) {
        offset.marginTop += style.portalTop
      }
      // eslint-disable-next-line
      const cssText = `position: absolute;z-index: 10000;margin-left:${offset.marginLeft}px;margin-top:${offset.marginTop}px`

      this.element.setAttribute('style', cssText)
    }

    return {
      ...style
    }
  }

  render () {
    const {children, className} = this.props

    return createPortal(
      <div style={{...this.setStyles()}} className={className}>{children}</div>, this.element)
  }
}

export default Portal
