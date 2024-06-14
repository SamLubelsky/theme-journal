import Todo from "./components/Goal.jsx";
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
function App(props) {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/goals' element={<Goals goals={props.goals}/>}/>
        <Route path='/theme' element={<Theme theme={props.theme}/>}/>
      </Routes>
    </Router>
  );
}

export default App;