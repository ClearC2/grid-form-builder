import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map, fromJS} from 'immutable'
import sizeMe from 'react-sizeme'
import {Responsive} from 'react-grid-layout'
import CustomGridWidthProvider from './CustomGridWidthProvider'

import {setComponentLayouts} from './redux'

const GridLayout = CustomGridWidthProvider(Responsive)
const SizeMeHOC = sizeMe({monitorHeight: true})
const SizedWidgetWrapper = SizeMeHOC(WidgetWrapper)

export class Grid extends Component {
  static propTypes = {
    setComponentLayouts: PropTypes.func.isRequired,
    handleRemoveWidgetClick: PropTypes.func,
    onResizeStop: PropTypes.func,

    compName: PropTypes.string.isRequired,
    saveLayout: PropTypes.bool.isRequired,
    verticalCompact: PropTypes.bool.isRequired,
    layouts: PropTypes.object,
    children: PropTypes.node,
    appState: PropTypes.object.isRequired
  }

  static defaultProps = {
    saveLayout: true,
    verticalCompact: true
  }

  constructor (props) {
    super(props)
    this.determineBreakpoint = this.determineBreakpoint.bind(this)
  }

  handleLayoutChange = (currentLayout, allLayouts) => {
    if (!this.props.saveLayout) return

    const {appState, compName, dashboard = false, location = {pathname: '/'}} = this.props
    let keyPath = [compName]
    const pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage'
    if (dashboard) {
      keyPath = Array.isArray(compName) ? compName : [pathDashboard, compName]
    }
    keyPath.push('layouts')
    const savedLayouts = appState.getIn(keyPath, Map())

    let layouts = {...allLayouts}

    const bp = this.determineBreakpoint() || 'xxl'

    layouts[bp] = currentLayout

    keyPath.pop()
    const name = dashboard ? keyPath : compName
    if (!fromJS(layouts).equals(savedLayouts)) {
      this.props.setComponentLayouts(name, allLayouts, true)
    }
  }

  handleRemoveWidgetClick = id => {
    const bp = this.determineBreakpoint() || 'xxl'
    const layout = this.props.layouts[bp] || []
    const {compName, location = {pathname: '/'}, dashboard = false} = this.props

    let newLayouts = {
      ...this.props.layouts,
      [bp]: layout.filter(l => l.i !== id)
    }

    if (this.props.handleRemoveWidgetClick) {
      newLayouts = this.props.handleRemoveWidgetClick(id, {...newLayouts}, bp)
    }

    let name = compName
    if (dashboard) {
      const pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage'
      name = Array.isArray(compName) ? compName : [pathDashboard, compName]
    }

    this.props.setComponentLayouts(name, newLayouts, true)
  }

  determineBreakpoint () {
    let breakpoint

    if (this.grid) {
      for (let key in this.breakpoints) {
        if (this.breakpoints[key] < this.grid.state.width) {
          breakpoint = key
          break
        }
      }
    } else {
      let breakpoints = Object.entries(this.breakpoints)

      breakpoints = breakpoints.reverse()

      const breakpointTuple = breakpoints.find(b => b[1] >= window.innerWidth)

      breakpoint = breakpointTuple ? breakpointTuple[0] : breakpoint
    }

    return breakpoint
  }

  // must be from largest to smallest
  breakpoints = {xxl: 2200, xl: 1920, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}
  // all forms and dashboards use these breakpoints, if you change this there will be a cascade issue with sizing throughout the app
  cols = {xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}

  componentDidMount = () => {
    const {compName, location = {pathname: '/'}, dashboard = false} = this.props
    let name = compName
    if (dashboard) {
      const pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage'
      name = Array.isArray(compName) ? compName : [pathDashboard, compName]
    }
    if (!this.props.appState.get(name, null)) { // if current component has no layouts in redux, add this one
      let layout = []
      const breakpoint = this.determineBreakpoint() || 'xxl'

      React.Children.forEach(this.props.children, (child, i) => {
        const key = child.props.gridId || (child.props.defaultDataGrid ? child.props.defaultDataGrid.i : i)
        let dataGrid
        if (this.props.layouts) {
          const layout = this.props.layouts[breakpoint] || []
          dataGrid = layout.find(item => item.i === key)
        }
        if (!dataGrid) dataGrid = child.props.defaultDataGrid
        if (dataGrid) layout.push(dataGrid)
      })

      this.props.setComponentLayouts(name, {[breakpoint]: layout}, true)
    }
  }

  render () {
    let layout = []
    let children = []

    const breakpoint = this.determineBreakpoint() || 'xxl'

    React.Children.forEach(this.props.children, (child, i) => {
      const key = child.props.gridId || (child.props.defaultDataGrid ? child.props.defaultDataGrid.i : i)

      let dataGrid

      if (this.props.layouts) {
        const layout = this.props.layouts[breakpoint] || []
        dataGrid = layout.find(item => item.i === key)
      }

      if (!dataGrid) {
        const {compName, appState, location = {pathname: '/'}, dashboard = false} = this.props
        let name = [compName]
        if (dashboard) {
          const pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage'
          name = [pathDashboard, compName]
        }
        name.push('layouts')
        let currentLayout = appState.getIn(name, Map())
        if (currentLayout.size === 1) currentLayout = currentLayout.first()
        else if (currentLayout.get(breakpoint)) currentLayout = currentLayout.get(breakpoint)
        else currentLayout = null
        if (currentLayout) { // if we have the current layout in redux and have a handle for it, use it
          currentLayout.some(widget => {
            if (child.props.defaultDataGrid.i === widget.get('i')) {
              dataGrid = JSON.parse(JSON.stringify(widget.toJS())) // this shenanigans removes keys that have undefined values
              return true
            } else return false
          })
        } else {
          dataGrid = child.props.defaultDataGrid
        }
      }

      if (dataGrid) {
        // if component is explicitly passed a size prop, we don't want to overwrite it
        const Component = child.props.size ? WidgetWrapper : SizedWidgetWrapper

        layout.push(dataGrid)
        children.push(
          <div
            key={key}
            style={{background: 'white', overflow: 'visible', height: '100%'}}
          >
            <Component
              key={key}
              widgetKey={key}
              handleRemoveWidgetClick={this.handleRemoveWidgetClick}
              child={child}
            />
          </div>
        )
      }
    })

    let layouts = this.props.layouts

    if (layouts) {
      // make sure all layouts have the same number of widgets
      Object.keys(this.breakpoints).forEach(bp => {
        if ((layouts[bp] || []).length !== layout.length) {
          layouts[bp] = layout
        }
      })
    } else {
      const {compName, appState, location = {pathname: '/'}, dashboard = false} = this.props
      let name = [compName]
      if (dashboard) {
        const pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage'
        name = [pathDashboard, compName]
      }
      name.push('layouts')
      layouts = appState.getIn(name, Map({undef: true})).toJS() // if we have the current layout in redux and have a handle for it, use it
      if (layouts.undef) layouts = {[breakpoint]: layout}
    }

    const {verticalCompact = true, margin = [10, 10]} = this.props

    let rowHeight = 25
    if (this.props.rowHeight) {
      rowHeight = this.props.rowHeight
    } else {
      switch (breakpoint) {
        case 'xxs': rowHeight = 10; break
        case 'xs': rowHeight = 15; break
        case 'sm': rowHeight = 15; break
        case 'md': rowHeight = 15; break
        case 'lg': rowHeight = 20; break
        case 'xl': rowHeight = 25; break
        case 'xxl': rowHeight = 33; break
        default: rowHeight = 25
      }
    }

    return !(this.props.layouts || layout.length > 0) ? null : (
      <GridLayout
        ref={grid => { this.grid = grid }}
        {...this.props}
        className='layout'
        layouts={layouts}
        verticalCompact={verticalCompact}
        margin={margin}
        onLayoutChange={this.handleLayoutChange}
        breakpoints={this.breakpoints}
        cols={this.cols}
        rowHeight={rowHeight}
        onResizeStop={this.props.onResizeStop}
      >
        {children}
      </GridLayout>
    )
  }
}

WidgetWrapper.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  child: PropTypes.node.isRequired,
  widgetKey: PropTypes.string.isRequired,
  handleRemoveWidgetClick: PropTypes.func.isRequired
}

function WidgetWrapper ({size, child, widgetKey, handleRemoveWidgetClick}) {
  const handleClick = () => {
    // grid level function
    if (handleRemoveWidgetClick) {
      handleRemoveWidgetClick(widgetKey)
    }

    // // widget level function
    if (child.props.handleRemoveWidgetClick) {
      child.props.handleRemoveWidgetClick(widgetKey, child.props)
    }
  }

  return (
    <div style={{height: '100%', width: '100%', display: 'flex'}}>
      {size ? React.cloneElement(child, {size, removeSelf: handleClick}) : child}
    </div>
  )
}

const props = state => {
  return {
    appState: state.getIn(['form-layouts', 'layouts'], Map())
  }
}

export default connect(props, {setComponentLayouts}, null, {withRef: true})(Grid)
