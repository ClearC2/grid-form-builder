import React from 'react'
import {FormDroppable} from '../../src/index'

class TestDraggableUnit extends React.Component {
  render = () => {
    return (
      <div style={{marginLeft: 10, height: 30, display: 'flex', alignItems: 'center', border: '2px solid black', paddingLeft: 10, paddingRight: 10}}>
        Drag Me
      </div>
    )
  }
}

export default FormDroppable(TestDraggableUnit)
