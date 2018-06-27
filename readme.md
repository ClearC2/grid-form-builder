# Grid Form Builder

Grid Form Builder is a component that accepts JSON to generate forms on a [react-grid-layout](https://github.com/STRML/react-grid-layout) and stores the layouts in the redux store. 

[Grid Form Builder Demo](https://i.imgur.com/yrJ3PR6.mp4)

**Installation:**


* Install grid-form-builder by adding the following to your package.json file:

```
"grid-form-builder": "git+ssh://git@github.com:ClearC2/grid-form-builder.git",
```

# Important - Grid Form Builder now requires react-dnd@2.5.4 and react-dnd-html5-backend@2.5.4 to be installed as peer dependencies.

Your project will need to set up the html5 backend context in the root of your application.
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Application from './Application'
import ajax from './ajax'

import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'


const render = (props = {}) => {
  ReactDOM.render(
    <Provider store={store}>
      <HTML5BackendProvider {...props} />
    </Provider>,
    document.getElementById('app')
  )
}

const HTML5BackendProvider = DragDropContext(HTML5Backend)(Application)

render()
```

* react-grid-layout, react-datetime, and react-select are peer dependencies of grid-form-builder. If your project uses css, import the react-grid-layout css style sheets below where your other css files are being imported. 

```
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-select/dist/react-select.css'
import 'react-datetime/css/react-datetime.css'
import 'grid-form-builder/styles/grid-form-builder.css'
```

* Import the reducer from grid-form-builder and add it to your project's combineReducers method. (example below)

```javascript
import { combineReducers } from 'redux-immutable'
import app, {dialogs} from '../app/reducer'
import auth from '../app/auth/redux'
import {reducer as formLayoutReducer} from 'grid-form-builder'

export default combineReducers({
  app,
  dialogs,
  [auth.key]: auth,
  [formLayoutReducer.key]: formLayoutReducer
})
```

You are now ready to import the FormBuilder to start creating forms.

### Icons
grid-form-builder allows you to initialize your own custom icons to be used in field labels. These icons should be React Components and will be accessable through the `icon` prop in the jsonschema for each field. (Note: The names are not case sensitive but they should still be spelled exactly as they are initialized in order to be usable)
```javascript
import {initComponentIconLibrary} from 'grid-form-builder'
import Calendar from 'react-icons/lib/fa/calendar'
import LinkedIn from 'react-icons/lib/fa/linkedin-square'
import Facebook from 'react-icons/lib/fa/facebook-square'
import Twitter from 'react-icons/lib/fa/twitter-square'

initComponentIconLibrary({
  Calendar,
  LinkedIn,
  Facebook,
  Twitter
})
```

### AJAX Client
grid-form-builder allows you to pass down your project's axios client to handle async data fetches for things like typeahead options. To initialize your axios client in grid-form-builder, import the initFormBuilderAjax function from 'grid-form-builder' in the root of your application and pass in a config.ajax assignment like below.
```javascript
import {initFormBuilderAjax} from 'grid-form-builder'
import axiosClient from './axiosClient'

initFormBuilderAjax(config => { config.ajax = axiosClient })

render(
  (
    <Provider store={store}>
      <Example />
    </Provider>
  ),
  document.getElementById('app')
)

```


### FormBuilder

```javascript
import React, {Component} from 'react'
import {Map} from 'immutable'
import {FormBuilder} from 'grid-form-builder'

export default class Example extends Component {
  state = {
    formValues: Map({
        physicaladdress: '1234 Main Street',
        pacity: 'Townsville',
        pastate: 'Texas'
    }),
    inline: false,
    formSchema: {
      'form': {
        'name': 'Company 1',
        'description': 'Show company data on the screen.',
        'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
        'lastUpdateDate': '2018-02-05 08:04:14',
        'lastUpdateBy': 'kevin bull',
        'createdDate': '2018-02-05 08:04:14',
        'createdBy': 'kevin bull',
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
                'iconStyle': {'color': 'blue'},
                'readonly': true
              }
            },
            {
              'type': 'field',
              'dimensions': {'x': 6, 'y': 0, 'h': 1, 'w': 6},
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
                'required': true,
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
              'dimensions': {'x': 0, 'y': 4, 'h': 5, 'w': 6},
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
              'dimensions': {'x': 0, 'y': 15, 'h': 4, 'w': 6},
              'config': {
                'name': 'textareatest',
                'label': 'Textarea',
                'required': true,
                'type': 'textarea'
              }
            }
          ]
        }
      }
    }
  }

  handleOnChange = e => this.setState({formValues: this.state.formValues.set(e.target.name, e.target.value)})


  render = () => <FormBuilder
    formName="ExampleForm"
    formSchema={this.state.formSchema}
    formValues={this.state.formValues}
    handleOnChange={this.handleOnChange}
    inline={this.state.inline}
    draggable
  />
}
```

## Props
#### `formName?: string` 
formName should be unique as it is the namespace in redux in which the layouts for this form will be stored. If there are collisions you will lose layouts for other forms with the same name.

#### `formSchema?: object`
formSchema is the JSON object that represents the initial (default) layout of this form. After the initial render, the layout is stored in the redux store. All subsequent renders will use the redux version of the layout schema as long as the layout still exists in the redux store.

At minimum, the shape of the formSchema must have a jsonschema object, with a layout array nested within jsonschema. The layout array will contain the element definitions for each item in the form. Example:
```json
{
    "name": "Company 1",
    "description": "Show company data on the screen.",
    "jsonschema": {
        "layout": [
            {
              "type": "field",
              "dimensions": {"x": 0, "y": 0, "h": 1, "w": 6},
              "config": {
                "name": "person_facebook",
                "label": "Facebook URL",
                "type": "input",
                "icon": "facebook",
                "iconStyle": {"color": "blue"},
                "readonly": true
              }
            }
        ]
    }
}
```

The shape of each layout object should have a type to indicate what type of element it is (Field and Header are the current supported types), dimensions to indicate where on the grid this element should be rendered, and a config object for the element.
For fields, the config object must contain at minimum the field name and field type.

##### Layout Object Shape:
```
type?:       string    // required: field | header

dimensions?: object    // required, shape:
                x?: number             // required, indicate horizontal position on the grid (0 - 11)
                y?: number             // required, indicate veritcal position on the grid (0 - infinity)
                w?: number             // required, indicate the number of horizontal grid slots the element will occupy (1 - 12)
                h?: number             // required, indicate the number of veritcal grid slots the element will occupy (1 - infinity)
                minH?: number           // optional, if resizable, this specifices the smallest grid unit height this element can be shrunk to
                minW?: number           // optional, if resizable, this specifices the smallest grid unit width this element can be shrunk to
                                           
config?:     object    // required, configuration options for the element, shape:
                name?:       string    // required, name of the field, the value for this input is held under this key
                style?:      object    // optional, this adds additional custom styling to the input element
                label?:      string    // optional, if no label provided label will equal name
                labelStyle?: object    // optional, this adds additional custom styling to the label of the input
                type?:       string    // optional, if no type specified input is assumed: input | select | multiselect | checkbox | multicheckbox | date | datetime | header | listselect | phone | radio | textarea | typeahead
                icon?:       string    // optional, this should be the string name of an icon that was initialized by the initComponentIconLibrary method
                iconStyle?:  object    // optional, this adds additional custom styling to the icon node if one was specified
                readonly?:   bool      // optional, this will grey out the input and disallow users from editing this field
                disabled?:   bool      // optional, this is an alias for readonly
                keyword? :   object    // optional, this object will populate selectable options for inputs that have options, shape:
                                category?:  string   // required, name of the keyword in c2 (this is optional if the form is going to be written by hand)
                                options?:   array    // required, array of option objects. Option objects have the shape:
                                                value?:  string   // required, this is the value of the option
                                                label?:  string   // optional, this is the value displayed on the UI, if undefined it will equal the value
```


#### `formValues?: object`
This is an object (usually an immutable map) that is key:value pairs where the key is the field name and the value is the field value. The value can either be a string (for regular inputs) or an array of strings (for input types that have multiselect capabilities).

#### `handleOnChange?: function`
handleOnChange is the handler called any time a field is changed. Use this handler to update your formValues object. At minimum this method will provide you an object with the following structure (this is usually the entire event object, but not always).

```json
{
    "target": {
        "name": "",
        "value": ""
    }
}
```

#### `draggable?: bool`
This bool indicates weather or not the user should be able to drag fields around the grid on the screen. Default is false.

#### `inline?: bool`
This bool sets the layout of the labels. If you wish the field labels to be inline with the form inputs and the form inputs only have an underline, set this to true. Otherwise, field labels will be stacked on top of the field inputs. Default is false.
