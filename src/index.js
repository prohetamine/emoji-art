import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, dispatch } from 'redux'
import start from './assets/start.png'
import styled from 'styled-components'
import './index.css'
import App from './app'

const reducer = (state = {}, action) => {
  if (action.type === 'hidden-layer') {
    return {
      ...state,
      hiddenLayer: !state.hiddenLayer,
    }
  }

  if (action.type === 'upload-file') {
    return {
      ...state,
      uploadFile: action.payload,
    }
  }

  if (action.type === 'progress') {
    return {
      ...state,
      progress: action.payload,
    }
  }

  if (action.type === 'save-file') {
    return {
      ...state,
      saveFile: action.payload,
    }
  }

  if (action.type === 'alert') {
    return {
      ...state,
      alert: {
        isShow: true,
        message: action.payload
      }
    }
  }

  if (action.type === 'hidden-alert') {
    return {
      ...state,
      alert: {
        ...state.alert,
        isShow: false
      }
    }
  }

  if (action.type === 'share') {
    return {
      ...state,
      share: true
    }
  }

  if (action.type === 'hidden-share') {
    return {
      ...state,
      share: false
    }
  }

  return state
}

const store = createStore(reducer, {
  hiddenLayer: false,
  uploadFile: null,
  saveFile: null,
  progress: 0,
  alert: {
    isShow: false,
    message: 'Done!'
  },
  share: false
})

store.dispatch({ type: 'upload-file', payload: start })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
