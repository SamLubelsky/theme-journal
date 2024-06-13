import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";
import {useState} from "react";
import {nanoid} from "nanoid";
import React from "react";
import Cookies from 'js-cookie'
const FILTER_MAP = {
  Current: (goal) => !goal.archived,
  All: () => true,
  Archived: (goal) => goal.archived,
};
const currentLocation = window.location.host;
const FILTER_NAMES = Object.keys(FILTER_MAP);
function App(props) {
  const [goals, setGoals] = useState(props.goals);
  const [filter, setFilter] = useState("Current");
  const csrftoken = Cookies.get('csrftoken');
  function toggleGoalArchived(id){
    let newStatus;
    const updatedGoals = goals.map((goal)=>{
      if(id == goal.id){
        newStatus = !goal.archived;
        return {...goal, archived: !goal.archived};
      }
      return goal;
    });
    setGoals(updatedGoals);
    fetch(`/mainpage/goals/${id}/`,{
      method: "PATCH",
      body:`{"archived":${newStatus}}`,
      headers: {'X-CSRFToken': csrftoken,
        'Content-Type':'application/json'
      },
      credentials: "include",
    });
  }
  function deleteGoal(id){
    const remainingGoals = goals.filter((goal)=> id != goal.id);
    setGoals(remainingGoals);
    fetch(`/mainpage/goals/${id}/`,{
      method: "DELETE",
      headers: {'X-CSRFToken': csrftoken,
        'Content-Type':'application/json'
      },
      credentials: "include",
    });
  }
  function editGoal(id, newName){
    const updatedGoals = goals.map((goal) =>{
      if(id === goal.id){
        return {...goal, name : newName};
      }
      return goal;
    });
    setGoals(updatedGoals);
    fetch(`/mainpage/goals/${id}/`,{
      method: "PATCH",
      body:`{"name":"${newName}"}`,
      headers: {'X-CSRFToken': csrftoken,
        'Content-Type':'application/json'
      },
      credentials: "include",
    });
  }
  function addGoal(name){
    const newGoal = {id: `${nanoid()}`, name, archived: false}
    setGoals([...goals, newGoal]);
    fetch(`/mainpage/goals/`,{
      method: "POST",
      body:`{"id":"${newGoal.id}", "name":"${name}", "archived":"FALSE"}`,
      headers: {'X-CSRFToken': csrftoken,
        'Content-Type':'application/json'
      },
      credentials: "include",
    });
  }
  const goalList = goals.filter(FILTER_MAP[filter])
  .map((goal) => (
    <Todo 
    id={goal.id} 
    name = {goal.name} 
    completed={goal.archived}
    key = {goal.id}
    toggleGoalCompleted={toggleGoalArchived}
    deleteGoal={deleteGoal}
    editGoal={editGoal}
    />
  ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed={name === filter}
    setFilter={setFilter} />
  ));
  const goalsNoun = goalList.length !== 1 ? "goals" : "goal";
  const headingText = `${goalList.length} ${goalsNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addGoal={addGoal}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {goalList}
      </ul>
    </div>
  );
}

export default App;