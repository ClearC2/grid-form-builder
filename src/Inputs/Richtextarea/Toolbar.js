/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {
  FaImage as Image,
  FaTable as Table,
  FaArrowUp as Up,
  FaArrowDown as Down,
  FaArrowLeft as Left,
  FaArrowRight as Right,
  FaTrash as Delete,
  FaCaretLeft as DeleteColumn,
  FaCaretUp as DeleteRow
} from 'react-icons/fa'
import {useRef, useState} from 'react'
import {randomId} from '../../utils'
import PortalTooltip from '../../Tooltip'

const Toolbar = ({
  id,
  addTable,
  removeTable,
  insertRowAbove,
  insertRowBelow,
  deleteRow,
  insertColumnLeft,
  insertColumnRight,
  deleteColumn
}) => {
  const tooltipId = useRef('gfb-' + randomId())
  const [message, setMessage] = useState('Table Controls')
  return (
    <div id={id} style={{backgroundColor: '#fafafa', display: 'flex'}}>
      <PortalTooltip id={tooltipId.current} message={message} />
      <select className='ql-header' defaultValue={'normal'} onChange={e => e.persist()}>
        <option value='1' />
        <option value='2' />
        <option value='3' />
        <option value='normal' />
      </select>
      <button className='ql-bold' />
      <button className='ql-italic' />
      <button className='ql-underline' />
      <button className='ql-strike' />
      <select className='ql-color' />
      <select className='ql-background' />
      <button className='ql-link' />
      <button className='ql-list' value='bullet' />
      <button className='ql-list' value='ordered' />
      <button className='ql-blockquote' />
      <button className='ql-insertImage'>
        <Image />
      </button>
      <button
        onClick={addTable}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Add Table')}
      >
        <Table />
      </button>
      <button
        onClick={insertRowAbove}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Insert Row Above Cursor')}
      >
        <Up />
      </button>
      <button
        onClick={insertRowBelow}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Insert Row Below Cursor')}
      >
        <Down />
      </button>
      <button
        onClick={insertColumnLeft}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Insert Column Left Of Cursor')}
      >
        <Left />
      </button>
      <button
        onClick={insertColumnRight}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Insert Column Right Of Cursor')}
      >
        <Right />
      </button>
      <button
        onClick={removeTable}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Delete Table')}
      >
        <Delete />
      </button>
      <button
        onClick={deleteRow}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Delete Row')}
      >
        <DeleteRow />
      </button>
      <button
        onClick={deleteColumn}
        data-tip
        data-for={tooltipId.current}
        onMouseOver={() => setMessage('Delete Column')}
      >
        <DeleteColumn />
      </button>
    </div>
  )
}

export default Toolbar

Toolbar.propTypes = {
  id: PropTypes.string,
  addTable: PropTypes.func,
  removeTable: PropTypes.func,
  insertRowAbove: PropTypes.func,
  insertRowBelow: PropTypes.func,
  deleteRow: PropTypes.func,
  insertColumnLeft: PropTypes.func,
  insertColumnRight: PropTypes.func,
  deleteColumn: PropTypes.func
}
