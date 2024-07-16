import Cookies from 'js-cookie'
import React, { useEffect, useState } from "react";
import SingleGoalDisplay from "./SingleGoalDisplay.jsx";
import {Link} from "react-router-dom";
import { propTypes } from 'react-bootstrap/esm/Image.js';
function GoalDisplay(props){
    const csrftoken = Cookies.get('csrftoken');
    let listItems = "";
    const [goalList, setGoalList] = useState("Goals Loading...");
    let goalTable = "";
    console.log(props.month);
    useEffect(()=>  {
        async function getGoalItems(){
            const activeGoals = await getActiveGoals();
            if(activeGoals !== undefined){
                if(props.displayLength === "week"){
                    listItems = activeGoals.map((goal)=>{
                        return (<tr key={goal.id}>
                            <SingleGoalDisplay time_created={goal.time_created} id={goal.id} name={goal.name} days={goal.days} displayLength="week"/>
                                </tr>);
                    })
                } else{
                    listItems = activeGoals.map((goal)=>{
                        return (<tr key={`${goal.id}_${props.month}_${props.year}`}>
                            <SingleGoalDisplay time_created={goal.time_created} id={goal.id} name={goal.name} days={goal.days} displayLength="month" year={props.year} month={props.month}/>
                                </tr>);
                    });
                }   
                setGoalList(listItems);      
            }
        }
        getGoalItems();
        });
    async function getActiveGoals(){
        if (typeof goalList === 'object'){
            return;
        }
        const response = await fetch(`/home/goals/`,{
            method: "GET",
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const goals = await response.json();
        const activeGoals = goals.filter((goal)=>!goal.archived);
        //console.log(activeGoals.constructor === Array);
        return activeGoals;
    }
    function getTableHeading(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        if(props.displayLength === "week"){
            return <tr key="-1"><th scope="col">Goal</th><th scope="col">Sun</th><th scope="col">Mon</th><th scope="col">Tue</th><th scope="col">Wed</th><th scope="col">Thu</th><th scope="col">Fri</th><th scope="col">Sat</th></tr>
        } else{
            const day = new Date(props.year, props.month, 1);
            const days = []
            let curDate = new Date(props.year, props.month, 1);
            const endDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
            while(curDate <= endDate){
                days.push(curDate);
                curDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1);
            }
            listItems = days.map((day)=><th scope="col" key={`heading-${day.getDate()}`}>{day.getDate()}</th>)
            return (
            <tr key="-1">
            <th scope="col">{monthNames[day.getMonth()]}, {props.year}</th>
            {listItems}
            </tr>
            );
        }
    }
    function getGoalTable(){
        const tableHeading = getTableHeading();
        const goalHistory = props.displayLength === "week" ? <Link to="/all-goals" className="btn btn-danger btn-lg" role="button">See Goal History</Link>: "";
        if(goalList === "Goals Loading..."){
            return "";
        }
        return (
            <>
            <table>
            <thead>
            {tableHeading}           
            </thead>
            <tbody>
            {goalList}
            </tbody>
            </table>
            {goalHistory}
            </>);
    }

    //console.log(goalList);
    //console.log(typeof goalList);
    // console.log(ReactDOMServer.renderToStaticMarkup((<table>
    //     <tbody>
    //     <tr><th>Goal</th><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>
    //     {goalList}
    //     </tbody>
    //     </table>)));

    return goalList === "Goals Loading" ? goalList: getGoalTable();
}
export default GoalDisplay;