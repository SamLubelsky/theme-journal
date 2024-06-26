import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../static/css/index.css'
import {useId} from 'react'
const DATA = JSON.parse(document.getElementById('goals').textContent)
const theme = JSON.parse(document.querySelector('#theme').textContent);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App goals={DATA} theme={theme}/>
  </React.StrictMode>,
)
