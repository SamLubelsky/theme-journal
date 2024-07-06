import React, { useEffect, useState } from "react";
import Entry from "../components/Entry.jsx";
import {nanoid} from "nanoid";
import Cookies from 'js-cookie'
import { json } from "react-router-dom";
import { Link , useNavigate } from 'react-router-dom'
import EntryPreview from "../components/EntryPreview.jsx";
function Home(props){
    const csrftoken = Cookies.get('csrftoken');
    const [mode, setMode] = useState("Not Received")
    const [id, setId] = useState(-1);
    const [entries, setEntries] = useState({});
    useEffect(()=>{
        getEntries();
    });
    async function getEntriesFromToday(){
        const entries = getEntries();
        const today = new Date();
        const entriesFromToday = entries.results.filter((entry)=> {
            const entryDate = new Date(entry.time_created);
            return entryDate.toDateString() === today.toDateString();
        });
        //console.log(entriesFromToday);
        return entriesFromToday;
    }
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
        setEntries(entries.results);
        setMode("Received");
    }
    function DisplayEntries(){
        //console.log(entries);
        if(Object.keys(entries).length === 0){
            //console.log("returning immediatly");
            return;
        }
        const listItems = entries.map((entry) =>{
            return (
            <li key={entry.id}>
            <EntryPreview title={entry.title} body={entry.body} id={entry.id}/>
            </li>
            );
        }); 
        //console.log(listItems);
        return <ul>{listItems}</ul>
    }
    //getEntriesFromToday();
    const navigate = useNavigate();
    return (
    <>
    <button type="button" className="btn btn-danger btn-lg btn-block" onClick={()=>navigate("/new-entry")}>Create New Entry</button>
    <hr />
    <DisplayEntries />
    </>
    );
}
export default Home;