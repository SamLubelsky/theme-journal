import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";
import Sidebar from "./components/Sidebar.jsx"
import {useState} from "react";
import {nanoid} from "nanoid";
import React from "react";
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
function App(props) {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/home' element={<Home goals={props.goals}/>}/>
      </Routes>
    </Router>
  );
}

export default App;