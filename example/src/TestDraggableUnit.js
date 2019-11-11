import React from 'react'
import PropTypes from 'prop-types'
import {FormDroppable} from '../../src/index'

class TestDraggableUnit extends React.Component {
  static propTypes = {
    droppable: PropTypes.bool
  }
  render = () => {
    const {droppable} = this.props
    return (
      <div
        style={{
          marginLeft: 10,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          border: '2px solid black',
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        {droppable
          ? 'When Droppable: Drag Me To Create New Input'
          : 'When Not Droppable: Drag Me Over Existing Input'
        }
      </div>
    )
  }
}

export default FormDroppable(TestDraggableUnit)
