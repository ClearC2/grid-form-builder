import React, {Component} from 'react'
import {Map, List} from 'immutable'
import {FormBuilder, updateFormValues} from '../../src/index'

export default class Example extends Component {
  state = {
    formValues: Map({
      'physicaladdress': '724 Canyon Drive',
      'Secondary Roles': List(['Admin', 'Manager']),
      'cfd_reportsto': 'Jacob Allen',
      'pacity': 'Coppell',
      'pastate': 'Texas',
      'papostalcode': '75019',
      'pacountry': 'Denton',
      'mobilephonenumber': '555-555-5544',
      'asdfasfdag': '75019',
      'asdfasfdagds': '75019',
      'asdfassfdfdag': '75019',
      'sffvsfd': '75019',
      'sdfgsvs': '75019',
      'regsfdgvs': '75019',
      'email2': 'email@clearc2.com',
      'cfd_companyname': 'Clear C2, Inc.',
      'Roles': List(['Admin', 'Manager']),
      'Status': 'Active',
      c2_contact_pa: 'Qualified',
      c2_contact_city: 'Customer',
      'cfd_accountmanager': 'Jacob Allen',
      'status': 'Active',
      'Tags': 'N/A',
      'description': 'This is a mock record',
      'priornotes': 'Last time on grid form builder, everything was status quo',
      OrgInfo: 'Best Organization Ever!',
      'cfd_companyphone': '555-444-5544',
      'cfd_companyaddress': '724 Canyon Drive',
      'cfd_companycity': 'Coppell',
      'cfd_companystate': 'Texas',
      'cfd_companycountry': 'USA',
      'cfd_fax': '555-444-5545',
      'cfd_companylinkedin': 'linkedin.com/clearc2',
      'cfd_companyfacebook': 'facebook.com/clearc2',
      'cfd_companytwitter': 'twitter.com/clearc2',
      'cfd_companypriornotes': 'Best Company on the planet'
    }),
    inline: false
  }

  toggleInline = () => this.setState({inline: !this.state.inline})

  handleOnChange = e => this.setState({formValues: updateFormValues(e, this.state.formValues)})

  formSchema = () => ({
    'Secondary Roles': {
      dimensions: {x: 0, y: 5, h: 1, w: 6},
      type: 'multiselect',
      options: ['Manager', 'Admin', 'Tech', 'Network Operations']
    },
    'cfd_reportsto': {
      label: 'Contact',
      dimensions: {x: 6, y: 5, h: 1, w: 6},
      type: 'typeahead',
      props: {
        url: '/typeahead/person',
        cfd: ['cfd_contactphone', 'cfd_companyname', 'cfd_contactemail']
      }
    },
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
      label: 'Active',
      dimensions: {x: 0, y: 4, h: 1, w: 6},
      type: 'checkbox'
    },
    'mobilephonenumber': {
      label: 'Join Date',
      dimensions: {x: 0, y: 6, h: 1, w: 6},
      type: 'date'
    },
    'asdfasfdag': {
      label: 'Zip Code',
      dimensions: {x: 0, y: 7, h: 1, w: 6}
    },
    'asdfasfdagds': {
      label: 'Zip Code',
      dimensions: {x: 6, y: 7, h: 1, w: 6}
    },
    'asdfassfdfdag': {
      label: 'Zip Code',
      dimensions: {x: 0, y: 10, h: 1, w: 6}
    },
    'sffvsfd': {
      label: 'Zip Code',
      dimensions: {x: 6, y: 10, h: 1, w: 6}
    },
    'sdfgsvs': {
      label: 'Zip Code',
      dimensions: {x: 0, y: 15, h: 1, w: 6}
    },
    'regsfdgvs': {
      label: 'Zip Code',
      dimensions: {x: 6, y: 15, h: 1, w: 6}
    },
    'email2': {
      label: 'Leave Date',
      dimensions: {x: 6, y: 6, h: 1, w: 6},
      type: 'datetime'
    },
    'cfd_companyname': {
      label: 'Organization',
      dimensions: {x: 0, y: 11, h: 5, w: 6},
      type: 'listselect',
      options: ['Option 1', 'Option 2', 'Option 3']
    },
    'Roles': {
      dimensions: {x: 6, y: 11, h: 4, w: 6},
      type: 'multicheckbox',
      options: ['Manager', 'Admin', 'Tech', 'Network Operations']
    },
    'Status': {
      dimensions: {x: 0, y: 20, h: 1, w: 6},
      type: 'radio',
      options: ['Active', 'Inactive', 'Cancelled', 'Closed']
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
    'cfd_accountmanager': {
      label: 'Account Manager',
      dimensions: {x: 6, y: 2, h: 1, w: 6}
    },
    'status': {
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive'],
      dimensions: {x: 6, y: 3, h: 1, w: 6}
    },
    'Tags': {
      dimensions: {x: 6, y: 4, h: 1, w: 6}
    },
    'description': {
      label: 'Notes',
      type: 'textarea',
      dimensions: {x: 0, y: 8, h: 1, w: 12}
    },
    'priornotes': {
      label: 'Prior Notes',
      type: 'textarea',
      dimensions: {x: 0, y: 23, h: 1, w: 12}
    },
    OrgInfo: {
      label: 'Organization Information',
      type: 'header',
      dimensions: {x: 0, y: 24, h: 1, w: 12},
      labelStyle: {width: 85, minWidth: 85, fontSize: '16pt', color: '#a0a0a0'}
    },
    'cfd_companyphone': {
      label: 'Phone',
      dimensions: {x: 0, y: 25, h: 1, w: 6}
    },
    'cfd_companyaddress': {
      label: 'Address',
      dimensions: {x: 0, y: 26, h: 1, w: 6}
    },
    'cfd_companycity': {
      label: 'City',
      dimensions: {x: 0, y: 27, h: 1, w: 6}
    },
    'cfd_companystate': {
      label: 'State',
      dimensions: {x: 0, y: 28, h: 1, w: 6}
    },
    'cfd_companycountry': {
      label: 'Country',
      dimensions: {x: 0, y: 29, h: 1, w: 6}
    },
    'cfd_fax': {
      label: 'Fax',
      dimensions: {x: 6, y: 25, h: 1, w: 6}
    },
    'cfd_companylinkedin': {
      label: 'LinkedIn',
      dimensions: {x: 6, y: 26, h: 1, w: 6}
    },
    'cfd_companyfacebook': {
      label: 'Facebook',
      dimensions: {x: 6, y: 27, h: 1, w: 6}
    },
    'cfd_companytwitter': {
      label: 'Twitter',
      dimensions: {x: 6, y: 28, h: 1, w: 6}
    },
    'cfd_companypriornotes': {
      label: 'Notes',
      type: 'textarea',
      dimensions: {x: 0, y: 29, h: 1, w: 12}
    }
  })

  render = () => (
    <div style={{width: '100%', height: '100%'}}>
      <div style={{width: '100%', height: 30, marginTop: 20, marginBottom: 20, display: 'flex', justifyContent: 'center'}}>
        <button onClick={this.toggleInline}>{this.state.inline ? 'Toggle To Stacked' : 'Toggle to Inline'}</button>
      </div>
      <FormBuilder
        formName='ExampleForm'
        formSchema={this.formSchema()}
        formValues={this.state.formValues}
        handleOnChange={this.handleOnChange}
        draggable
        inline={this.state.inline}
      />
    </div>
  )
}
