import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";
import Sidebar from "./components/Sidebar.jsx"
import {useState} from "react";
import {nanoid} from "nanoid";
import React from "react";
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Goals from "./pages/Goals.jsx"
import Theme from "./pages/Theme.jsx"
import Home from "./pages/Home.jsx"
import Settings from "./pages/Settings.jsx"
import NewEntry from "./pages/NewEntry.jsx"
import EditEntry from "./pages/EditEntry.jsx";
import 'bootstrap/dist/css/bootstrap.css'
function App(props) {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/goals' element={<Goals goals={props.goals}/>}/>
        <Route path='/theme' element={<Theme theme={props.theme}/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/new-entry' element={<NewEntry/>}/>
        <Route path='/entry' element={<EditEntry/>} />
        <Route path='/entry/:entryId' element={<EditEntry/>} />
      </Routes>
    </Router>
  );
}

export default App;