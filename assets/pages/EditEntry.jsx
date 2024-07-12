import React, { useEffect, useState } from "react";
import Entry from "../components/Entry.jsx";
import {nanoid} from "nanoid";
import Cookies from 'js-cookie'
import { json } from "react-router-dom";
import { Link , useNavigate, useParams } from 'react-router-dom'
import EntryPreview from "../components/EntryPreview.jsx";
import GoalDisplay from "../components/GoalDisplay.jsx";
import CreatableEntry from "../components/CreatableEntry.jsx"
import '../../static/css/home.css'
import {takeRight} from 'lodash';
function EditEntry(props){
    const csrftoken = Cookies.get('csrftoken');
    const params = useParams();
    const [mode, setMode] = useState("Not Received")
    const [entries, setEntries] = useState({});
    const [nearbyEntries, setNearbyEntries] = useState({});
    const [oldId, setOldId] = useState(-1);
    const id = params.entryId;
    useEffect(()=>{
        GetNearbyEntries();
    });
    async function GetNearbyEntries(){
        const entries = await getEntries();
        if(entries === undefined){
            return;
        }
        const currentEntry = entries.filter((entry)=>id==entry.id)[0];
        const currentEntryTime = new Date(currentEntry.time_created)
        const moreRecentEntries = entries.filter((entry)=>{
            const entryTime = new Date(entry.time_created)
            return entryTime > currentEntryTime;
        })
        const lessRecentEntries = entries.filter((entry)=>{
            const entryTime = new Date(entry.time_created)
            return entryTime <= currentEntryTime;
        })
        let moreRecentCount;
        if(moreRecentEntries.length >= 5){
            moreRecentCount = 5;
        } else{
            moreRecentCount = moreRecentEntries.length;
        }
        const lessRecentCount = 11 - moreRecentCount;
        const aboveElements = takeRight(moreRecentEntries, moreRecentCount);
        const belowElements = lessRecentEntries.slice(0, lessRecentCount);
        const nearbyEntries = aboveElements.concat(belowElements);
        setNearbyEntries(nearbyEntries);
        //setMode("Fully Received");

    }
    async function getEntries(){
        if(mode === "Received" && id == oldId){
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
        setEntries(entries);
        setMode("Received");
        setOldId(id);
        return entries;
    }
    function DisplayEntries(){
        if(Object.keys(nearbyEntries).length === 0){
            return;
        }
        const listItems = nearbyEntries.map((entry) =>{
            if(entry.id == id) return <EntryPreview key={entry.id} title={entry.title} body={entry.body} id={entry.id} active={true} />
            return <EntryPreview key={entry.id} title={entry.title} body={entry.body} id={entry.id} active={false}/>;
        }); 
        return <div className="btn-group-vertical">{listItems}</div>
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
                <Entry key={id} entryId={id} />
            </div>
            <div className="col-md-auto">
                <GoalDisplay />
            </div>
        </div>
    </div>
    );
}
export default EditEntry;