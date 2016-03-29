# react-router-scroll-behavior

Scroll behaviors for use with [react-router](https://github.com/reactjs/react-router).

## Installation

```
$ npm i react-router-scroll-behavior --save
```

## Usage

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { RouterScrollContext } from 'react-router-scroll-behavior'

// Render `Router` with RouterScrollContext
render((
  <Provider store={store} key="provider">
    <Router render={(props) => <RouterScrollContext {...props}/>} history={browserHistory}>
      ...routes
    </Router>
  </Provider>
), dest)
```
