import React, {Component} from 'react'
import {Map} from 'immutable'
import {FormBuilder} from '../../src/index'

export default class Example extends Component {
  state = {
    formValues: Map()
  }

  handleOnChange = e => this.setState({formValues: this.state.formValues.set(e.target.name, e.target.value)})

  formSchema = () => ({
    'physicaladdress': {
      label: 'Address',
      dimensions: {x: 0, y: 0, h: 1, w: 6}
    },
    'pacity': {
      label: 'City',
      dimensions: {x: 0, y: 1, h: 1, w: 6}
    },
    'pastate': {
      label: 'State',
      dimensions: {x: 0, y: 2, h: 1, w: 6}
    },
    'papostalcode': {
      label: 'Zip Code',
      dimensions: {x: 0, y: 3, h: 1, w: 6}
    },
    'pacountry': {
      label: 'Country',
      dimensions: {x: 0, y: 4, h: 1, w: 6}
    },
    'mobilephonenumber': {
      label: 'Mobile Phone',
      dimensions: {x: 0, y: 5, h: 1, w: 6}
    },
    'email2': {
      label: 'Secondary Email',
      dimensions: {x: 0, y: 6, h: 1, w: 6}
    },
    'LinkedIn': {
      dimensions: {x: 0, y: 7, h: 1, w: 6}
    },
    'Facebook': {
      dimensions: {x: 0, y: 8, h: 1, w: 6},
    },
    'Twitter': {
      dimensions: {x: 0, y: 9, h: 1, w: 6},
    },
    c2_contact_pa: {
      label: 'Marketing Stage',
      type: 'select',
      options: ['Lead', 'Qualified', 'Opportunity', 'Customer', 'Not Interested', 'Disqualified'],
      dimensions: {x: 6, y: 0, h: 1, w: 6}
    },
    c2_contact_city: {
      label: 'Classification',
      type: 'select',
      options: ['Customer', 'Vendor', 'Competitor', 'Partner'],
      dimensions: {x: 6, y: 1, h: 1, w: 6}
    },
    'cfd_reportsto': {
      label: 'Reports To',
      dimensions: {x: 6, y: 2, h: 1, w: 6}
    },
    'cfd_accountmanager': {
      label: 'Account Manager',
      dimensions: {x: 6, y: 3, h: 1, w: 6}
    },
    'status': {
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive'],
      dimensions: {x: 6, y: 4, h: 1, w: 6}
    },
    'Tags': {
      dimensions: {x: 6, y: 5, h: 1, w: 6}
    },
    'description': {
      label: 'Notes',
      type: 'textarea',
      dimensions: {x: 0, y: 10, h: 1, w: 12}
    },
    'priornotes': {
      label: 'Prior Notes',
      type: 'textarea',
      dimensions: {x: 0, y: 11, h: 1, w: 12}
    },
    OrgInfo: {
      label: 'Organization Information',
      type: 'header',
      dimensions: {x: 0, y: 12, h: 1, w: 12},
      labelStyle: {width: 85, minWidth: 85, fontSize: '16pt', color: '#a0a0a0'}
    },
    'cfd_companyname': {
      label: 'Organization',
      dimensions: {x: 0, y: 13, h: 1, w: 6}
    },
    'cfd_companyphone': {
      label: 'Phone',
      dimensions: {x: 0, y: 14, h: 1, w: 6}
    },
    'cfd_companyaddress': {
      label: 'Address',
      dimensions: {x: 0, y: 15, h: 1, w: 6}
    },
    'cfd_companycity': {
      label: 'City',
      dimensions: {x: 0, y: 16, h: 1, w: 6}
    },
    'cfd_companystate': {
      label: 'State',
      dimensions: {x: 0, y: 17, h: 1, w: 6}
    },
    'cfd_companycountry': {
      label: 'Country',
      dimensions: {x: 0, y: 18, h: 1, w: 6}
    },
    'cfd_fax': {
      label: 'Fax',
      dimensions: {x: 6, y: 13, h: 1, w: 6}
    },
    'cfd_companylinkedin': {
      label: 'LinkedIn',
      dimensions: {x: 6, y: 14, h: 1, w: 6},
    },
    'cfd_companyfacebook': {
      label: 'Facebook',
      dimensions: {x: 6, y: 15, h: 1, w: 6},
    },
    'cfd_companytwitter': {
      label: 'Twitter',
      dimensions: {x: 6, y: 16, h: 1, w: 6},
    },
    'cfd_companypriornotes': {
      label: 'Notes',
      type: 'textarea',
      dimensions: {x: 0, y: 19, h: 1, w: 12}
    }
  })

  render = () => <FormBuilder
    formName="ExampleForm"
    formSchema={this.formSchema()}
    formValues={this.state.formValues}
    handleOnChange={this.handleOnChange}
    draggable
  />
}
