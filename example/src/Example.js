import React, {Component} from 'react'
import {Map} from 'immutable'
import {FormBuilder} from '../../src/index'

export default class Example extends Component {
  state = {
    formValues: Map({
      inputtest: 'Clear C2, Inc.',
      textareatest: '1234 Main Street'
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
              'dimensions': {'x': 0, 'y': 0, 'h': 1, 'w': 3},
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
              'dimensions': {'x': 3, 'y': 0, 'h': 1, 'w': 3},
              'config': {
                'name': 'requiredTestField',
                'label': 'Name',
                'type': 'phone',
                'required': true
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 0, 'h': 1, 'w': 3},
              'config': {
                'name': 'inputtest',
                'label': 'Input',
                'type': 'input',
                'disabled': true
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 9, 'y': 0, 'h': 1, 'w': 3},
              'config': {
                'name': 'inputtest',
                'label': 'Input',
                'type': 'input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 6},
              'config': {
                'name': 'phonetest',
                'label': 'Phone',
                'type': 'phone',
                'delimiter': '-'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 1, 'h': 1, 'w': 6},
              'config': {
                'name': 'c_registerddate',
                'label': 'Registered',
                'type': 'conditionalInput',
                'inputType': 'input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 1, 'h': 1, 'w': 6},
              'config': {
                'name': 'multiselecttest',
                'label': 'Multiselect',
                'required': true,
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
              'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'checkboxtest',
                'label': 'Checkbox',
                'type': 'checkbox'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 3, 'h': 1, 'w': 6},
              'config': {
                'name': 'datetest',
                'label': 'Date',
                'type': 'date',
                'disabled': true
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
              'dimensions': {'x': 0, 'y': 4, 'h': 5, 'w': 6},
              'config': {
                'name': 'listselecttest',
                'label': 'List Select',
                'type': 'listselect',
                'required': true,
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
                'required': true,
                'keyword': {
                  'category': 'TASKS',
                  'options': [
                    {
                      'label': 'Contract Signing',
                      'value': 1
                    },
                    {
                      'label': 'Customer Service',
                      'value': 2
                    },
                    {
                      'label': 'Demonstration',
                      'value': 3
                    },
                    {
                      'label': 'Executive Meeting',
                      'value': 'N/A'
                    },
                    {
                      'label': 'Initial Meeting',
                      'value': 'Exception'
                    }
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 2, 'h': 2, 'w': 6},
              'config': {
                'name': 'Detail/Summary',
                'label': 'Detail/Summary',
                'type': 'radio',
                'boxed': true,
                'required': true,
                'keyword': {
                  'options': [
                    {'label': 'Detail Only', 'value': 'Detail Only'},
                    {'label': 'Summary Only', 'value': 'Summary Only'},
                    {'label': 'Both', 'value': 'Both'}
                  ]
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 5, 'h': 1, 'w': 6},
              'config': {
                'name': 'typeaheadtest',
                'label': 'Typeahead',
                'required': true,
                'type': 'typeahead',
                'typeahead': {
                  'key': 'c2_company',
                  'duplication': true,
                  'fields': [
                    'inputtest',
                    'textareatest'
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
                'required': true,
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
              'dimensions': {'x': 0, 'y': 15, 'h': 2, 'w': 6},
              'config': {
                'name': 'textareatest',
                'label': 'Textarea',
                'required': true,
                'type': 'textarea'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 15, 'h': 4, 'w': 6},
              'config': {
                'name': 'textareatest',
                'label': 'Textarea',
                'type': 'textarea'
              }
            },
            {
              'type': 'header',
              'dimensions': {'x': 6, 'y': 2, 'h': 1, 'w': 6},
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
              'dimensions': {'x': 6, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'selecttest',
                'label': 'Select',
                'type': 'select',
                'required': true,
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
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 6, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 7, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 8, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 9, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 9, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 14, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 14, 'h': 1, 'w': 6},
              'config': {
                'name': 'inputtest',
                'label': 'Input'
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

  handleOnChange = e => {
    const input = e.target
    this.setState(s => {
      return {formValues: s.formValues.set(input.name, input.value)}
    })
  }

  onSubmit = () => {
    console.log(this.exampleForm.validate())
  }

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
          <button onClick={this.onSubmit} style={{marginLeft: 10}}>Submit</button>
        </div>
        <FormBuilder
          ref={ref => { this.exampleForm = ref }}
          formName={formSchema.form.name}
          formSchema={formSchema.form}
          formValues={this.state.formValues}
          handleOnChange={this.handleOnChange}
          inline={this.state.inline}
          conditionalSearch={false}
        />
      </div>
    )
  }
}
