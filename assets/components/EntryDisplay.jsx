import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import {takeRight} from 'lodash';
import EntryPreview from "./EntryPreview.jsx";
import {Link} from "react-router-dom";
const num_entries = 20;
function EntryDisplay(props){
    const csrftoken = Cookies.get('csrftoken');
    const [entries, setEntries] = useState("Entries Loading...");
    const id = props.id;
    useEffect(()=>{
        getEntries();
    }, [props.title]);
    function getNearbyEntries(){
        const currentEntry = entries.filter((entry)=>id==entry.id)[0];
        let currentEntryTime;
        if(currentEntry === undefined){
            currentEntryTime = new Date();
        } else{
            currentEntryTime = new Date(currentEntry.time_created)
        }
        const moreRecentEntries = entries.filter((entry)=>{
            const entryTime = new Date(entry.time_created)
            return entryTime > currentEntryTime;
        })
        const lessRecentEntries = entries.filter((entry)=>{
            const entryTime = new Date(entry.time_created)
            return entryTime <= currentEntryTime;
        })
        let moreRecentCount;
        if(moreRecentEntries.length >= Math.floor(num_entries / 2)){
            moreRecentCount = Math.floor(num_entries / 2);
        } else{
            moreRecentCount = moreRecentEntries.length;
        }
        const lessRecentCount = num_entries + 1 - moreRecentCount;
        const aboveElements = takeRight(moreRecentEntries, moreRecentCount);
        const belowElements = lessRecentEntries.slice(0, lessRecentCount);
        const nearbyEntries = aboveElements.concat(belowElements);
        return nearbyEntries;
    }
    function getEntries(){
        fetchEntries().then(entries=>setEntries(entries))
    }
    async function fetchEntries(){
        const response = await fetch(`/home/entries/`,{
            method: "GET",
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const entries = await response.json();
        return entries;
    }
    function DisplayEntries(){
        const nearbyEntries = getNearbyEntries();
        const listItems = nearbyEntries.map((entry) =>{
            if(entry.id == id) return <EntryPreview key={entry.id} title={entry.title} body={entry.body} id={entry.id} active={true} />
            return <EntryPreview key={entry.id} title={entry.title} body={entry.body} id={entry.id} active={false}/>;
        }); 
        listItems.push(<Link key={-1} className="btn btn-secondary" to='/all-entries'> See all entries</Link>)
        return <div className="btn-group-vertical btn-group-lg">{listItems}</div>
    }
    return entries === "Entries Loading..." ? entries : DisplayEntries();
}
export default EntryDisplay;