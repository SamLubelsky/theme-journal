import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../static/css/index.css'
import {useId} from 'react'
// const DATA = [
//   {id: "todo-0", name:"Eat", completed:true},
//   {id: "todo-1", name:"Sleep", completed:false},
//   {id: "todo-2", name:"Repeat", completed:false},
// ]
const DATA = JSON.parse(document.getElementById('goals').textContent)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App goals={DATA}/>
  </React.StrictMode>,
)
