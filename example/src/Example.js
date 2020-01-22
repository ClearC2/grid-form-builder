import React, {Component} from 'react'
import {Map, List, fromJS} from 'immutable'
import {ConditionalTable} from '../../src/index'
import DragUnit from './TestDraggableUnit'
import FormBuilder from '../../src/FormBuilder'
import schema from './formSchema'

const TEST_SEARCH = true // for conditional search forms

export default class Example extends Component {
  state = {
    isInvalidWarning: false,
    formValues: Map({
      inputtest: 'Clear C2, Inc.',
      textareatest: '1234 Main Street',
      datetest: '12/12/12',
      meta_created_date: 'swiggity swoogity here comes the moogity',
      listselecttest: List(['Customer Service', 'Executive Meeting']),
      multiselecttest: ['Contract Signing', 'Customer Service', 'Not A Value'],
      parentid: '00112233445566778899AABBCCEEFFFF',
      phonetest: '5554443333',
      price: '25.25'
    }),
    inline: false,
    draggable: false,
    droppable: false,
    resizeable: false,
    activeItem: null,
    colDefs: [],
    selectedColumns: [],
    availableColumns: [],
    formSchema: {
      form: {}
    },
    columns: [ // for column picker.
      {label: 'Account Manager', value: 'cfd_accountmanager', type: 'string', format: 'string'},
      {label: 'Account Manager Email', value: 'ups_am_email', type: 'string', format: 'string'},
      {label: 'Address', value: 'physicaladdress', type: 'string', format: 'string'},
      {label: 'Address 2', value: 'physicaladdress2', type: 'string', format: 'string'},
      {label: 'City', value: 'pacity', type: 'string', format: 'string'},
      {label: 'Company Account Manager Name', value: 'cfd_cmpyaccountmanager', type: 'string', format: 'string'},
      {label: 'Company Industry Category', value: 'cfd_companyindustrycategory', type: 'string', format: 'string'},
      {label: 'Company Location', value: 'cfd_companylocation', type: 'string', format: 'string'},
      {label: 'Company Marketing Categories', value: 'cfd_companymarketingcategories', type: 'string', format: 'string'}, // eslint-disable-line
      {label: 'Company Name', value: 'cfd_companyname', type: 'string', format: 'string'},
      {label: 'Company Number', value: 'cfd_companycustomernumber', type: 'string', format: 'string'},
      {label: 'Company Region', value: 'cfd_companyregion', type: 'string', format: 'string'},
      {label: 'Contact Type', value: 'functionalcategory', type: 'string', format: 'string'},
      {label: 'Country', value: 'pacountry', type: 'string', format: 'string'},
      {label: 'County', value: 'pacounty', type: 'string', format: 'string'},
      {label: 'Created By', value: 'meta_createdby', type: 'string', format: 'string'},
      {label: 'Date Created', value: 'meta_createddate', type: 'datetime', format: 'date'},
      {label: 'Ecast Do Not Send', value: 'ecastdonotsend', type: 'bool', format: 'number'},
      {label: 'Email', value: 'email1', type: 'string', format: 'string'},
      {label: 'Email 2', value: 'email2', type: 'string', format: 'string'},
      {label: 'Fax', value: 'personfaxnumber', type: 'string', format: 'string'},
      {label: 'First Name', value: 'firstname', type: 'string', format: 'string'},
      {label: 'Last Name', value: 'lastname', type: 'string', format: 'string'},
      {label: 'Mobile Phone', value: 'mobilephonenumber', type: 'string', format: 'phone'},
      {label: 'No Spam', value: 'nospam', type: 'bool', format: 'number'},
      {label: 'Optin', value: 'optin', type: 'bool', format: 'number'},
      {label: 'Original Lead Source', value: 'originalleadsource', type: 'string', format: 'string'},
      {label: 'Original Lead Source Detail', value: 'originalleadsourcedetail', type: 'string', format: 'string'},
      {label: 'Phone', value: 'personphonenumber', type: 'string', format: 'string'},
      {label: 'Reports To Name', value: 'cfd_reportstocontactname', type: 'string', format: 'string'},
      {label: 'Reports To Title', value: 'cfd_reportstojobtitle', type: 'string', format: 'string'},
      {label: 'State', value: 'pastate', type: 'string', format: 'string'},
      {label: 'Status', value: 'status', type: 'string', format: 'string'},
      {label: 'Title', value: 'jobtitle', type: 'string', format: 'string'},
      {label: 'Updated By', value: 'meta_lastupdateby', type: 'string', format: 'string'},
      {label: 'Updated On', value: 'meta_lastupdatedate', type: 'datetime', format: 'datetime'},
      {label: 'Zip Code', value: 'papostalcode', type: 'string', format: 'string'}
    ]
  }

  setActiveItem = activeItem => this.setState(() => ({activeItem}))

  //  colpicker functions:
  onColumnChange = (colList) => {
    this.setState({selectedColumns: colList})
  }

  onColDefChange = (colDefs) => {
    this.setState({colDefs: colDefs})
  }

  // end colpicker functions
  toggleInline = () => this.setState({inline: !this.state.inline})

  toggleDraggable = () => this.setState({draggable: !this.state.draggable})

  toggleDroppable = () => this.setState({droppable: !this.state.droppable})

  handleOnChange = e => {
    const input = e.target
    this.setState(s => {
      return {formValues: s.formValues.set(input.name, input.value)}
    })
  }

  handleOnClick = (config) => {
    this.setActiveItem(config.index)
  }

  onSubmit = () => {
    console.log(this.exampleForm.validate()) //eslint-disable-line
  }

  toggleValidation = () => {
    this.setState(s => ({isInvalidWarning: !s.isInvalidWarning}))
  }

  handleOnDrop = ({source, target}) => console.log(source, target) //eslint-disable-line

  handleLinkClick = link => {
    console.log(link) //eslint-disable-line
  }

  componentDidMount = () => {
    setTimeout(() => { // simulate getting schema from api
      this.setState(() => ({formSchema: schema}))
    }, 250)
    // setTimeout(() => {
    //   debugger
    // }, 2000)
  }

  handleOnDimensionChange = schema => {
    this.setState(() => ({formSchema: {form: fromJS(schema)}}))
  }

  render = () => {
    const {formSchema, isInvalidWarning, droppable, activeItem} = this.state
    // console.log(this.state.formValues)
    if (TEST_SEARCH) {
      // will mode: TEST_SEARCH constant at top is true
      console.log(formSchema.form, 'formschema logggggggggg gfb') // eslint-disable-line
      return (
        <div>
          <div style={{display: 'flex'}}>
            <div style={{width: '66%'}}>
              <FormBuilder
                ref={ref => { this.exampleForm = ref }}
                formSchema={formSchema.form}
                formValues={this.state.formValues}
                handleOnChange={this.handleOnChange}
                inline={this.state.inline}
                conditionalSearch={TEST_SEARCH}
                handleOnDrop={this.handleOnDrop}
                draggable={false}
              />
            </div>
            <div style={{width: '33%', marginTop: '150px'}}>
              {Object.keys(this.state.formSchema.form || {}).length > 0 && <ConditionalTable
                title={'Conditional Table Title'}
                searchFunction={(req) => { console.log(req, 'Search function not available in test mode') }} // eslint-disable-line
                formSchema={this.state.formSchema.form}
                handleFormValueChange={this.handleOnChange}
                formValues={this.state.formValues.toJS()}
                onNextClick={(e) => {
                  console.log(this.state.formValues, e, 'form val loggggggggg') // eslint-disable-line
                }}
                enableNextButton
                draggable={false}
              />}
            </div>
          </div>
        </div>)
    } else {
      // Jake mode: TEST_SEARCH constant at top is false
      return (
        <div style={{width: '100%', height: '100%'}}>
          <div style={{
            width: '100%',
            height: 30,
            marginTop: 20,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={this.toggleDraggable}
              style={{marginRight: 10}}
            >
              {this.state.draggable ? 'Make Static' : 'Make Draggable'}
            </button>
            <button onClick={this.onSubmit}>Submit</button>
            <button onClick={this.toggleValidation} style={{marginLeft: 10}}>Toggle Validation State</button>
            <button
              onClick={this.toggleDroppable}
              style={{marginLeft: 10}}
            >
              {this.state.droppable ? 'Make Not Droppable' : 'Make Droppable'}
            </button>
            <DragUnit someProp='test' droppable={this.state.droppable} />
          </div>
          <FormBuilder
            ref={ref => { this.exampleForm = ref }}
            formSchema={this.state.formSchema.form}
            formValues={this.state.formValues}
            handleOnChange={this.handleOnChange}
            onClick={this.handleOnClick}
            inline={this.state.inline}
            conditionalSearch={TEST_SEARCH}
            handleOnDrop={this.handleOnDrop}
            draggable={this.state.draggable}
            validate={isInvalidWarning}
            handleLinkClick={this.handleLinkClick}
            handleOnDimensionChange={this.handleOnDimensionChange}
            droppable={droppable}
            activeItem={activeItem}
          />
        </div>
      )
    }
  }
}
