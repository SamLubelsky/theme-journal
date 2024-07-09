import EditableItem from "../components/EditableItem.jsx";
import Form from "../components/Form.jsx";
import FilterButton from "../components/FilterButton.jsx";
import Sidebar from "../components/Sidebar.jsx"
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
function Goals(props){
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
      fetch(`/home/goals/${id}/`,{
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
      fetch(`/home/goals/${id}/`,{
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
      fetch(`/home/goals/${id}/`,{
        method: "PATCH",
        body:`{"name":"${newName}"}`,
        headers: {'X-CSRFToken': csrftoken,
          'Content-Type':'application/json'
        },
        credentials: "include",
      });
    }
    function addGoal(newName){
      const oldGoals = goals.filter((goal)=>goal.name.toUpperCase()===newName.toUpperCase());
      if(oldGoals.length >= 1){
        const newGoals = goals.map((goal)=>{
          if(goal.name.toUpperCase() === newName.toUpperCase()){
              fetch(`/home/goals/${goal.id}/`,{
                method: "PATCH",
                body:`{"name":"${newName}", "archived":false}`,
                headers: {'X-CSRFToken': csrftoken,
                  'Content-Type':'application/json'
                },
                credentials: "include",
              });
            return {id: goal.id, name: newName, archived: false}
          }
          return goal;
        });
        setGoals(newGoals);
        return;
      }
      const newGoal = {id: `${nanoid()}`, name: newName, archived: false}
      setGoals([...goals, newGoal]);
      fetch(`/home/goals/`,{
        method: "POST",
        body:`{"id":"${newGoal.id}", "name":"${newName}", "archived":"FALSE"}`,
        headers: {'X-CSRFToken': csrftoken,
          'Content-Type':'application/json'
        },
        credentials: "include",
      });
    }
    const goalList = goals.filter(FILTER_MAP[filter])
    .map((goal) => (
      <EditableItem
      id={goal.id} 
      name = {goal.name} 
      key = {goal.id}
      deleteItem={toggleGoalArchived}
      editItem={editGoal}
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
        <h1>Manage Goals</h1>
        <Form addItem={addGoal} formText="Add a new goal"/>
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
export default Goals;