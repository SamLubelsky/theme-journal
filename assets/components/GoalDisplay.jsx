import Cookies from 'js-cookie'
import React, { useEffect, useState } from "react";
import SingleGoalDisplay from "./SingleGoalDisplay.jsx";
import ReactDOMServer from 'react-dom/server';
function GoalDisplay(){
    const csrftoken = Cookies.get('csrftoken');
    let listItems = "";
    const [goalList, setGoalList] = useState("Goals Loading...");
    let goalTable = "";
    useEffect(()=>  {
        async function getGoalItems(){
            const activeGoals = await getActiveGoals();
            if(activeGoals !== undefined){
                listItems = activeGoals.map((goal)=>{
                    return (<tr key={goal.id}>
                        <SingleGoalDisplay id={goal.id} name={goal.name} days={goal.days} />
                            </tr>);
                })
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
    function getGoalTable(){
        if(goalList === "Goals Loading..."){
            return "";
        }
        return (<table>
            <thead>
            <tr key="-1"><th scope="col">Goal</th><th scope="col">Sun</th><th scope="col">Mon</th><th scope="col">Tue</th><th scope="col">Wed</th><th scope="col">Thu</th><th scope="col">Fri</th><th scope="col">Sat</th></tr>
            </thead>
            <tbody>
            {goalList}
            </tbody>
            </table>);
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