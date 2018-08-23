import React, {Component} from 'react'
import {Map} from 'immutable'
import {FormBuilder} from '../../src/index'
import DragUnit from './TestDraggableUnit'
import ConditionTable from 'query-builder'

const TEST_SEARCH = false // for conditional search forms

export default class Example extends Component {
  state = {
    loop: [],
    formValues: Map({
      inputtest: 'Clear C2, Inc.',
      textareatest: '1234 Main Street'
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
              'dimensions': {'x': 0, 'y': 0, 'h': 1, 'w': 12},
              'config': {
                'name': 'input 11'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 1, 'h': 1, 'w': 12},
              'config': {
                'name': 'input 12'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 12},
              'config': {
                'tabindex': 4,
                'name': 'input 13'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 3, 'h': 1, 'w': 12},
              'config': {
                'name': 'input 14'
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 0, 'y': 4, 'h': 1, 'w': 12},
              'config': {
                'name': 'input 15'
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

  handleOnClick = (config, e) => {
    console.log('clicked', config.name)
  }

  onSubmit = () => {
    console.log(this.exampleForm.validate())
  }

  handleOnDrop = ({source, target}) => console.log(source, target)

  render = () => {
    const {formSchema} = this.state
    if (TEST_SEARCH) {
      // will mode: TEST_SEARCH constant at top is false
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
          <ConditionTable
            formName={formSchema.form.name}
            title={'Conditional Table Title'}
            searchFunction={(req) => { console.log(req, 'Search function not implemented yet') }} // eslint-disable-line
            formSchema={formSchema.form}
            handleOnChange={this.handleOnChange}
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
          />
          <FormBuilder
            ref={ref => { this.exampleForm = ref }}
            formName='form 2'
            formSchema={{
              'name': 'Company 2',
              'description': 'Show company data on the screen.',
              'jsonschema': {
                'layout': [
                  {
                    'type': 'field',
                    'dimensions': {'x': 0, 'y': 0, 'h': 1, 'w': 12},
                    'config': {
                      'name': 'input 21'
                    }
                  },
                  {
                    'type': 'field',
                    'dimensions': {'x': 0, 'y': 1, 'h': 1, 'w': 12},
                    'config': {
                      'name': 'input 22'
                    }
                  },
                  {
                    'type': 'field',
                    'dimensions': {'x': 0, 'y': 2, 'h': 1, 'w': 12},
                    'config': {
                      'name': 'input 23'
                    }
                  },
                  {
                    'type': 'field',
                    'dimensions': {'x': 0, 'y': 3, 'h': 1, 'w': 12},
                    'config': {
                      'name': 'input 24'
                    }
                  },
                  {
                    'type': 'field',
                    'dimensions': {'x': 0, 'y': 4, 'h': 1, 'w': 12},
                    'config': {
                      'name': 'input 25'
                    }
                  }
                ]
              },
              'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
              'lastUpdateDate': '2018-02-05 08:04:14',
              'lastUpdateBy': 'kevin bull',
              'createdDate': '2018-02-05 08:04:14',
              'createdBy': 'kevin bull'
            }}
            formValues={this.state.formValues}
            handleOnChange={this.handleOnChange}
            onClick={this.handleOnClick}
            inline={this.state.inline}
            conditionalSearch={TEST_SEARCH}
            handleOnDrop={this.handleOnDrop}
            draggable={this.state.draggable}
          />
          {this.state.loop.map((n, i) => (
            <FormBuilder
              ref={ref => { this.exampleForm = ref }}
              key={i}
              formName={formSchema.form.name}
              formSchema={formSchema.form}
              formValues={this.state.formValues}
              handleOnChange={this.handleOnChange}
              onClick={this.handleOnClick}
              inline={this.state.inline}
              conditionalSearch={TEST_SEARCH}
              handleOnDrop={this.handleOnDrop}
              draggable={this.state.draggable}
            />
          ))}
        </div>
      )
    }
  }
}
