import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import '../../static/css/svg.css'
function SingleGoalDisplay(props){
    const [clickStatus, setClickStatus] = useState(props.days);
    const csrftoken = Cookies.get('csrftoken');
    function getMonday(d) {
        let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    const monday = getMonday(new Date());
    function registerHalfClick(day){
        let key = day.toDateString();
        let updatedVal = {}
        if(clickStatus[key] == 1 || clickStatus[key] == 2){
            updatedVal[key] = 0;
        } else{
            updatedVal[key] = 1 ;
        }
        const newClickStatus = {
            ...clickStatus,
            ...updatedVal
        }
        setClickStatus(newClickStatus);
        fetch(`/home/goals/${props.id}/`,{
            method: "PATCH",
            body:`{"days":${JSON.stringify(newClickStatus)}}`,
            headers: {'X-CSRFToken': csrftoken,
              'Content-Type':'application/json'
            },
            credentials: "include",
          });
    }
    function registerFullClick(day){
        let key = day.toDateString();
        let updatedVal = {}
        if(clickStatus[key] === 2){ //button is already fully clicked
            updatedVal[key] = 0; 
        } else{
            updatedVal[key] = 2;
        }
        const newClickStatus = {
            ...clickStatus,
            ...updatedVal
        }
        setClickStatus(newClickStatus);
        fetch(`/home/goals/${props.id}/`,{
            method: "PATCH",
            body:`{"days":${JSON.stringify(newClickStatus)}}`,
            headers: {'X-CSRFToken': csrftoken,
              'Content-Type':'application/json'
            },
            credentials: "include",
          });
    }
    function createButton(day){
        const size = props.displayLength === "week" ? 50: 40
        let leftHalf = <path className="cls-2" d="M753.86,693.79c-45.43-45.78-70.41-106.49-70.35-171.01.05-64.69,25.28-125.51,71.02-171.26,45.8-45.8,106.7-71.02,171.47-71.02s125.08,24.98,170.8,70.35l-342.94,342.94Z"/>
        let rightHalf = <path className="cls-3" d="M926,765.5c-64.76,0-125.64-25.21-171.44-71l342.95-342.95c45.78,45.8,71,106.68,71,171.44s-25.22,125.67-71.03,171.47c-45.8,45.8-106.7,71.03-171.47,71.03Z"/>
        const dateString = day.toDateString();
        if(day < new Date(props.time_created)){
            return;
        }
        if(day > new Date()){
            return;
        }
        if(clickStatus[dateString] == 1){
            leftHalf = <path style={{fill: "gray"}} className="cls-2" d="M753.86,693.79c-45.43-45.78-70.41-106.49-70.35-171.01.05-64.69,25.28-125.51,71.02-171.26,45.8-45.8,106.7-71.02,171.47-71.02s125.08,24.98,170.8,70.35l-342.94,342.94Z"/>
        }
        if(clickStatus[dateString] == 2){
            leftHalf = <path style={{fill: "gray"}} className="cls-2" d="M753.86,693.79c-45.43-45.78-70.41-106.49-70.35-171.01.05-64.69,25.28-125.51,71.02-171.26,45.8-45.8,106.7-71.02,171.47-71.02s125.08,24.98,170.8,70.35l-342.94,342.94Z"/>
            rightHalf = <path style={{fill: "gray"}} className="cls-3" d="M926,765.5c-64.76,0-125.64-25.21-171.44-71l342.95-342.95c45.78,45.8,71,106.68,71,171.44s-25.22,125.67-71.03,171.47c-45.8,45.8-106.7,71.03-171.47,71.03Z"/>
        }
        return (
                <svg width={size} height={size} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="683 280 486 486">
                    <g className="hell">
                        <a href="#" onClick={()=>registerHalfClick(day)}>
                        {leftHalf}
                        </a>
                        <path className="cls-1" d="M925.99,281c31.35,0,61.93,5.94,90.87,17.64,29.65,11.99,56.3,29.56,79.22,52.21l-342.23,342.23c-22.68-22.95-40.26-49.63-52.25-79.32-11.71-28.98-17.63-59.59-17.6-90.98.03-31.4,6-62,17.76-90.95,12.17-29.98,30.04-56.88,53.12-79.95,23.1-23.1,50.04-40.99,80.05-53.16,28.99-11.76,59.63-17.72,91.06-17.72M925.99,280c-62.19,0-124.37,23.72-171.82,71.17-94.79,94.79-94.89,248.4-.32,343.33l343.65-343.65c-47.4-47.23-109.46-70.85-171.51-70.85h0Z"/>
                        <a href="#" onClick={()=>registerFullClick(day)}>
                        {rightHalf}
                        </a>
                        <path className="cls-1" d="M1097.5,352.27c22.92,23.02,40.67,49.82,52.78,79.67,11.76,29,17.72,59.63,17.72,91.07s-5.96,62.07-17.72,91.07c-12.17,30.02-30.06,56.95-53.16,80.05-23.1,23.1-50.04,40.99-80.05,53.16-29,11.76-59.63,17.72-91.07,17.72s-62.07-5.96-91.07-17.72c-29.85-12.11-56.65-29.86-79.67-52.78l342.24-342.24M1097.5,350.85l-343.65,343.65c.11.11.21.22.32.33,47.45,47.45,109.64,71.17,171.83,71.17s124.38-23.72,171.83-71.17c94.9-94.9,94.9-248.76,0-343.65-.11-.11-.22-.21-.33-.32h0Z"/>
                    </g>
                </svg>      
        );
    }
    const days = []
    if(props.displayLength === "week"){
        for(let i = -1; i < 6; i++){
            const curDate = new Date();
            curDate.setDate(monday.getDate() + i);
            days.push(curDate);
        }
    }
    if(props.displayLength === "month"){
        let curDate = new Date(props.year, props.month, 1);
        const endDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
        while(curDate <= endDate){
            days.push(curDate);
            curDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1);
        }
    }
    //console.log(props.days);
    const buttons = days.map((day)=>{
        if(!(day.toDateString() in clickStatus)) return <td key={`${day}_${props.id}_${0}`}>{createButton(day)}</td>;
        return  <td key={`${day}_${props.month}_${props.year}_${props.id}_${clickStatus[day.toDateString()]}`}>{createButton(day)}</td>;
    });
    //console.log(buttons);
    return (
    <>
    <th scope="row" key={props.days}>{props.name}</th>
    {buttons}
    </>
    );
    }
    //console.log("ending print");
    //<input type="image" src="/static/images/not-filled.svg" name="progressButton" className="btTxt submit" id="progressButton"/>

export default SingleGoalDisplay;