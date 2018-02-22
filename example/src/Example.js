import React, {Component} from 'react'
import {Map} from 'immutable'
import {FormBuilder, updateFormValues} from '../../src/index'

export default class Example extends Component {
  state = {
    formValues: Map({
      companyname: 'Clear C2, Inc.',
      address: '1234 Main Street'
    }),
    inline: false,
    formSchema: {
      'form': {
        'name': 'Company 1',
        'description': 'Show company data on the screen.',
        'jsonschema': {
          'layout': [
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 0, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input',
                'type': 'input',
                'icon': 'facebook',
                'iconStyle': {'color': 'blue'}
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 1, 'h': 1, 'w': 6},
              'config': {
                'name': 'selecttest',
                'label': 'Select',
                'type': 'select',
                'keyword': {
                  'category': 'TASKS',
                  'options': [
                    {
                      'label': 'Contract Signing',
                      'value': 'Contract Signing'
                    },
                    {
                      'label': 'Customer Service',
                      'value': 'Customer Service'
                    },
                    {
                      'label': 'Demonstration',
                      'value': 'Demonstration'
                    },
                    {
                      'label': 'Executive Meeting',
                      'value': 'Executive Meeting'
                    },
                    {
                      'label': 'Initial Meeting',
                      'value': 'Initial Meeting'
                    },
                    {
                      'label': 'Kick Off Meeting',
                      'value': 'Kick Off Meeting'
                    },
                    {
                      'label': 'Internet Hub',
                      'value': 'Internet Hub'
                    }
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'checkboxtest',
                'label': 'Checkbox',
                'type': 'checkbox',
                'required': true
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 3, 'h': 1, 'w': 6},
              'config': {
                'name': 'datetest',
                'label': 'Date',
                'type': 'date'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 3, 'h': 1, 'w': 6},
              'config': {
                'name': 'datetimetest',
                'label': 'Date Time',
                'type': 'datetime'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 5, 'h': 5, 'w': 6},
              'config': {
                'name': 'listselecttest',
                'label': 'List Select',
                'type': 'listselect',
                'keyword': {
                  'category': 'TASKS',
                  'options': [
                    {
                      'label': 'Contract Signing',
                      'value': 'Contract Signing'
                    },
                    {
                      'label': 'Customer Service',
                      'value': 'Customer Service'
                    },
                    {
                      'label': 'Demonstration',
                      'value': 'Demonstration'
                    },
                    {
                      'label': 'Executive Meeting',
                      'value': 'Executive Meeting'
                    },
                    {
                      'label': 'Initial Meeting',
                      'value': 'Initial Meeting'
                    },
                    {
                      'label': 'Kick Off Meeting',
                      'value': 'Kick Off Meeting'
                    },
                    {
                      'label': 'Internet Hub',
                      'value': 'Internet Hub'
                    }
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 10, 'h': 4, 'w': 6},
              'config': {
                'name': 'multicheckboxtest',
                'label': 'Multi-Checkbox',
                'type': 'multicheckbox',
                'keyword': {
                  'category': 'TASKS',
                  'options': [
                    {
                      'label': 'Contract Signing',
                      'value': 'Contract Signing'
                    },
                    {
                      'label': 'Customer Service',
                      'value': 'Customer Service'
                    },
                    {
                      'label': 'Demonstration',
                      'value': 'Demonstration'
                    },
                    {
                      'label': 'Executive Meeting',
                      'value': 'Executive Meeting'
                    },
                    {
                      'label': 'Initial Meeting',
                      'value': 'Initial Meeting'
                    }
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 5, 'h': 1, 'w': 6},
              'config': {
                'name': 'multiselecttest',
                'label': 'Multiselect',
                'type': 'multiselect',
                'keyword': {
                  'category': 'TASKS',
                  'options': [
                    {
                      'label': 'Contract Signing',
                      'value': 'Contract Signing'
                    },
                    {
                      'label': 'Customer Service',
                      'value': 'Customer Service'
                    },
                    {
                      'label': 'Demonstration',
                      'value': 'Demonstration'
                    },
                    {
                      'label': 'Executive Meeting',
                      'value': 'Executive Meeting'
                    },
                    {
                      'label': 'Initial Meeting',
                      'value': 'Initial Meeting'
                    }
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 10, 'h': 4, 'w': 6},
              'config': {
                'name': 'radiotest',
                'label': 'Radio',
                'type': 'radio',
                'keyword': {
                  'category': 'TASKS',
                  'options': [
                    {
                      'label': 'Contract Signing',
                      'value': 'Contract Signing'
                    },
                    {
                      'label': 'Customer Service',
                      'value': 'Customer Service'
                    },
                    {
                      'label': 'Demonstration',
                      'value': 'Demonstration'
                    },
                    {
                      'label': 'Executive Meeting',
                      'value': 'Executive Meeting'
                    },
                    {
                      'label': 'Initial Meeting',
                      'value': 'Initial Meeting'
                    }
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 14, 'h': 4, 'w': 6},
              'config': {
                'name': 'textareatest',
                'label': 'Textarea',
                'type': 'textarea'
              }
            },
            {
              'type': 'header',
              'dimensions': {'x': 6, 'y': 2, 'h': 4, 'w': 6},
              'config': {
                'name': 'headertest',
                'label': 'Example Header',
                'type': 'header',
                'style': {
                  'color': 'grey'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 2, 'h': 4, 'w': 6},
              'config': {
                'name': 'typeaheadtest',
                'label': 'Typeahead',
                'type': 'typeahead'
              }
            }
          ]
        },
        'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
        'lastUpdateDate': '2018-02-05 08:04:14',
        'lastUpdateBy': 'kevin bull',
        'createdDate': '2018-02-05 08:04:14',
        'createdBy': 'kevin bull'
      }
    }
  }

  toggleInline = () => this.setState({inline: !this.state.inline})

  handleOnChange = e => this.setState({formValues: updateFormValues(e, this.state.formValues)})

  render = () => {
    const {formSchema} = this.state
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
          <button onClick={this.toggleInline}>{this.state.inline ? 'Toggle To Stacked' : 'Toggle to Inline'}</button>
        </div>
        <FormBuilder
          formName={formSchema.form.name}
          formSchema={formSchema.form}
          formValues={this.state.formValues}
          handleOnChange={this.handleOnChange}
          draggable
          inline={this.state.inline}
        />
      </div>
    )
  }
}
