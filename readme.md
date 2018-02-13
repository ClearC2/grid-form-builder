# Grid Form Builder

Grid Form Builder is a component that accepts JSON to generate forms on a [react-grid-layout](https://github.com/STRML/react-grid-layout) and stores the layouts in the redux store. 

[Grid Form Builder Demo](https://i.imgur.com/yrJ3PR6.mp4)

**Installation:**


* Install grid-form-builder by adding the following to your package.json file:

```
"grid-form-builder": "git+ssh://git@github.com:ClearC2/grid-form-builder.git",
```

* react-grid-layout is a peer dependency of grid-form-builder. If your project uses css, import the react-grid-layout css style sheets below where your other css files are being imported. 

```
/node_modules/react-grid-layout/css/styles.css
/node_modules/react-resizable/css/styles.css
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

### FormBuilder

```javascript
import React, {Component} from 'react'
import {Map} from 'immutable'
import {FormBuilder} from '../../src/index'

export default class Example extends Component {
  state = {
    formValues: Map({
        physicaladdress: '1234 Main Street',
        pacity: 'Townsville',
        pastate: 'Texas'
    })
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
```

## Props
#### `formName?: string` 
formName should be unique as it is the namespace in redux in which the layouts for this form will be stored. If there are collisions you will lose layouts for other forms with the same name.

#### `formSchema?: object` !REFACTORING (Will update documentation when final design is implemented)
formSchema is the JSON object that represents the initial (default) layout of this form. After the initial render, the layout is stored in the redux store. All subsequent renders will use the redux version of the layout schema as long as the layout still exists in the redux store.

#### `prepops?: object` !REFACTORING (Will update documentation when final design is implemented)
prepops is an object whose keys are field names and their values are an array of select options. This should be used if a typeahead/keyword/select option is going to load in its valid options asynchronously seperate from the main form.

#### `formValues?: object`
This is an object (usually an immutable map) that is key:value pairs where the key is the field name and the value is the field value. The value can either be a string (for regular inputs) or an array of strings (for input types that have multiselect capabilities).

#### `handleOnChange?: function`
handleOnChange is the handler called any time a field is changed. Use this handler to update your formValues object. At minimum this method will provide you an object with the following structure (this is usually the entire event object, but not always).

```javascript
{
    target: {
        name: '',
        value: ''
    }
}
```

#### `draggable?: bool`
This bool indicates weather or not the user should be able to drag fields around the grid on the screen. Default is false.
