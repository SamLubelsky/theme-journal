import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import {takeRight} from 'lodash';
import EntryPreview from "./EntryPreview.jsx";
import {Link} from "react-router-dom";
function EntryDisplay(props){
    const csrftoken = Cookies.get('csrftoken');
    const [mode, setMode] = useState("Not Received")
    const [nearbyEntries, setNearbyEntries] = useState({});
    const [oldId, setOldId] = useState(-1);
    const id = props.id;
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
        listItems.push(<Link key={-1} className="btn btn-secondary" to='/all-entries'> See all entries</Link>)
        return <div className="btn-group-vertical btn-group-lg">{listItems}</div>
    }
    return DisplayEntries();
}
export default EntryDisplay;