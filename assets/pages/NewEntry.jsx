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
import EntryDisplay from "../components/EntryDisplay.jsx";
function NewEntry(props){
    const csrftoken = Cookies.get('csrftoken');
    const params = useParams();
    const navigate = useNavigate();
    const [mode, setMode] = useState("Not Received")
    const [entries, setEntries] = useState({});
    const id = nanoid();
    console.log(id);
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
        return <EntryDisplay id={entries[0].id}/>
    }
    return (
    <div className="container-fluid">
        <div className="row row-cols-3">
            <div className="col-md-auto">
                <DisplayEntries />
            </div>
            <div className="col-md-auto">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>{navigate("/new-entry")}}>Create New Entry</button>
                </div>
                <CreatableEntry key={id}/>
            </div>
            <div className="col-md-auto">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    </div>
    );
}
export default NewEntry;