/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {FaImage as Image} from 'react-icons/fa'

const Toolbar = ({id}) => (
  <div id={id} style={{backgroundColor: '#fafafa'}}>
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
    <button className='ql-insertImage' >
      <Image />
    </button>
  </div>
)

export default Toolbar

Toolbar.propTypes = {
  id: PropTypes.string
}
