import React, { useEffect, useState } from "react";
import Entry from "../components/Entry.jsx";
import {nanoid} from "nanoid";
import Cookies from 'js-cookie'
import { json } from "react-router-dom";
import { Link , useNavigate } from 'react-router-dom'
import EntryPreview from "../components/EntryPreview.jsx";
import GoalDisplay from "../components/GoalDisplay.jsx";
import CreatableEntry from "../components/CreatableEntry.jsx"
import '../../static/css/home.css'
import EntryDisplay from "../components/EntryDisplay.jsx";
function Home(props){
    const csrftoken = Cookies.get('csrftoken');
    const [mode, setMode] = useState("Not Received")
    const [entries, setEntries] = useState({});
    useEffect(()=>{
        getEntries();
    });
    async function getEntries(){
        if(mode === "Received"){
            return;
        }
        const response = await fetch(`/home/entries/`,{
            method: "GET",
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const entries = await response.json();
        //entries);
        setEntries(entries);
        setMode("Received");
        return entries;
    }
    function DisplayEntries(){
        if(Object.keys(entries).length === 0){
            return;
        }
        return <EntryDisplay key={entries[0].id} id={entries[0].id}/>
    }
    function GetTodayEntryOrNew(){
        if(mode==="Received" && entries.length > 0){
            const mostRecentEntry = entries[0];
            const today = new Date();
            const mostRecentDate = new Date(mostRecentEntry.time_created);
            if(mostRecentDate.toDateString() === today.toDateString()){ //check if the two dates are from the same day)
                return <Entry entryId={mostRecentEntry.id} />
            }
        }
        return <CreatableEntry />
    }
    const navigate = useNavigate();
    return (
    <div className="container-fluid">
        <div className="row row-cols-3">
            <div className="col-md-auto">
                <DisplayEntries />
            </div>
            <div className="col-md-auto">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>navigate("/new-entry")}>Create New Entry</button>
                </div>
                {/* <CreatableEntry /> */}
                <GetTodayEntryOrNew />
            </div>
            <div className="col-md-auto">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    </div>
    );
}
export default Home;