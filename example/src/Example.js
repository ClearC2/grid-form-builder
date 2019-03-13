import React, {Component} from 'react'
import {Map, List} from 'immutable'
import {FormBuilder} from '../../src/index'
import DragUnit from './TestDraggableUnit'
import {ConditionalTable} from 'query-builder'

const TEST_SEARCH = false // for conditional search forms

export default class Example extends Component {
  state = {
    isInvalidWarning: false,
    formValues: Map({
      inputtest: 'Clear C2, Inc.',
      textareatest: '1234 Main Street',
      datetest: '65165165',
      meta_created_date: 'swiggity swoogity here comes the moogity',
      listselecttest: List(['Customer Service', 'Executive Meeting'])
    }),
    inline: false,
    draggable: false,
    resizeable: false,
    formSchema: {
      'form': {
        'name': 'Company 1',
        'description': 'Show company data on the screen.',
        'jsonschema': {
          'layout': [
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 0, 'h': 10, 'w': 6},
              'config': {
                'name': 'testerinput',
                'label': 'Input',
                'type': 'richtextarea',
                'icon': 'facebook',
                'iconStyle': {'color': 'blue'},
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 0, 'h': 1, 'w': 3},
              'config': {
                'name': 'unique-test-input',
                'label': 'Test Input',
                'type': 'input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 2},
              'config': {
                'name': 'price',
                'label': 'Price (Currency Input)',
                'type': 'currency'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 2},
              'config': {
                'name': 'quantity',
                'label': 'Quantity',
                'type': 'number'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 2},
              'config': {
                'name': 'discount',
                'label': 'Discount',
                'type': 'currency'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 2},
              'config': {
                'name': 'cfd_total',
                'label': 'Total Currency Input',
                'type': 'total',
                'formula': '(quantity x price) - (quantity x discount)'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 9, 'y': 0, 'h': 1, 'w': 3},
              'config': {
                'name': 'meta_universalid',
                'label': 'Field Typeahead',
                'type': 'typeahead',
                'typeahead': {
                  'fieldvalue': 'unique-test-input',
                  'fields': ['inputtest']
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 1, 'h': 1, 'w': 6},
              'config': {
                'name': 'phonetest',
                'label': 'Phone',
                'type': 'phone',
                'delimiter': '-',
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 1, 'h': 10, 'w': 6},
              'config': {
                'name': 'rich-text-input',
                'label': 'Rich Text Input',
                'type': 'richtextareaquill',
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'c_registerddate',
                'label': 'Registered',
                'type': 'conditionalInput',
                'inputType': 'input'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 6},
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
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'is_user_awesome',
                'label': 'Is Awesome',
                'type': 'checkbox',
                'onValue': 'cha',
                'offValue': 'nah bro'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'datetest',
                'label': 'Date',
                'type': 'date',
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 3, 'h': 1, 'w': 6},
              'config': {
                'name': 'datetimetest',
                'label': 'Date Time',
                'type': 'datetime',
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 4, 'h': 1, 'w': 6},
              'config': {
                'name': 'time',
                'label': 'Time',
                'type': 'time',
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 5, 'h': 5, 'w': 6},
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
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
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
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
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
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 5, 'h': 1, 'w': 6},
              'config': {
                'name': 'companyname',
                'label': 'Normal Typeahead',
                'required': true,
                'type': 'typeahead',
                'allowcreate': true,
                'typeahead': {
                  'key': 'c2_company',
                  'duplication': true,
                  'fields': [
                    'inputtest',
                    'textareatest'
                  ],
                  'fieldId': 'value',
                  'filter': {
                    'type': 'and',
                    'conditions': [
                      {
                        'type': 'or',
                        'conditions': [
                          {
                            'type': 'and',
                            'conditions': [
                              {
                                'name': 'inputtest',
                                'comparator': 'is equal to',
                                'values': []
                              },
                              {
                                'name': 'inputtest',
                                'comparator': 'is equal to',
                                'values': []
                              }
                            ]
                          },
                          {
                            'type': 'and',
                            'conditions': [
                              {
                                'name': 'inputtest',
                                'comparator': 'contains',
                                'values': []
                              },
                              {
                                'name': 'inputtest',
                                'comparator': 'is not equal to',
                                'values': []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        'name': 'inputtest',
                        'comparator': 'is equal to',
                        'values': [1]
                      }
                    ]
                  }
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 6, 'h': 1, 'w': 6},
              'config': {
                'name': 'typeaheadtest2',
                'label': 'Typeahead2',
                'required': true,
                'type': 'typeahead',
                'multi': true,
                'typeahead': {
                  'key': 'c2_company',
                  'duplication': true,
                  'fields': [
                    'inputtest',
                    'textareatest'
                  ],
                  'fieldId': 'value'
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
                'type': 'textarea',
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 15, 'h': 4, 'w': 6},
              'config': {
                'name': 'textareatest',
                'label': 'Textarea',
                'readonly': true,
                'type': 'textarea'
              }
            },
            {
              'type': 'header',
              'dimensions': {'x': 6, 'y': 2, 'h': 1, 'w': 3},
              'config': {
                'name': 'headertest',
                'label': 'Example Header',
                'type': 'header',
                'style': {
                  'color': 'grey'
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
                }
              }
            },
            {
              'type': 'header',
              'dimensions': {'x': 10, 'y': 2, 'h': 1, 'w': 3},
              'config': {
                'name': 'meta_created_date',
                'label': 'Last Did Something By:',
                'type': 'metadata'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 2, 'h': 1, 'w': 6},
              'config': {
                'name': 'selecttest',
                'label': 'Normal Select',
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
                },
                'cascade': {
                  'keyword': 'C2_PEOPLE_SOMETHING',
                  'icon': 'tree'
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
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 16, 'h': 1, 'w': 6},
              'config': {
                'type': 'number',
                'name': 'number',
                'label': 'Number Input',
                'required': true,
                'validation': {
                  'lowerBound': 0,
                  'upperBound': 100
                }
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 15, 'h': 1, 'w': 6},
              'config': {
                'type': 'email',
                'name': 'email',
                'label': 'Email Input',
                'required': true
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

  toggleDraggable = () => this.setState({draggable: !this.state.draggable})

  handleOnChange = e => {
    const input = e.target
    this.setState(s => {
      return {formValues: s.formValues.set(input.name, input.value)}
    })
  }

  handleOnClick = e => {
    // console.log(e)
  }

  onSubmit = () => {
    console.log(this.exampleForm.validate())
  }

  toggleValidation = () => {
    this.setState(s => ({isInvalidWarning: !s.isInvalidWarning}))
  }

  handleOnDrop = ({source, target}) => console.log(source, target)

  // componentDidMount = () => setTimeout(() => {debugger}, 3000)

  render = () => {
    const {formSchema, isInvalidWarning} = this.state
    if (TEST_SEARCH) {
      // will mode: TEST_SEARCH constant at top is true
      return (<div style={{display: 'flex'}}>
        <div style={{width: '66%'}}>
          <FormBuilder
            ref={ref => { this.exampleForm = ref }}
            formName={formSchema.form.name}
            formSchema={formSchema.form}
            formValues={this.state.formValues}
            handleOnChange={this.handleOnChange}
            inline={this.state.inline}
            conditionalSearch={TEST_SEARCH}
            handleOnDrop={this.handleOnDrop}
          />
        </div>
        <div style={{width: '33%', marginTop: '150px'}}>
          <ConditionalTable
            formName={formSchema.form.name}
            title={'Conditional Table Title'}
            searchFunction={(req) => { console.log(req, 'Search function not implemented yet') }} // eslint-disable-line
            formSchema={formSchema.form}
            handleFormValueChange={this.handleOnChange}
            formValues={this.state.formValues}
          />
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
            <button onClick={this.toggleDraggable} style={{marginRight: 10}}>{this.state.draggable ? 'Make Static' : 'Make Draggable'}</button>
            <button onClick={this.toggleInline}>{this.state.inline ? 'Toggle To Stacked' : 'Toggle to Inline'}</button>
            <button onClick={this.onSubmit} style={{marginLeft: 10}}>Submit</button>
            <button onClick={this.toggleValidation} style={{marginLeft: 10}}>Toggle Validation State</button>
            <DragUnit someProp='test' />
          </div>
          <FormBuilder
            ref={ref => { this.exampleForm = ref }}
            formName={formSchema.form.name}
            formSchema={formSchema.form}
            formValues={this.state.formValues}
            handleOnChange={this.handleOnChange}
            onClick={this.handleOnClick}
            inline={this.state.inline}
            conditionalSearch={TEST_SEARCH}
            handleOnDrop={this.handleOnDrop}
            draggable={this.state.draggable}
            validate={isInvalidWarning}
          />
        </div>
      )
    }
  }
}
