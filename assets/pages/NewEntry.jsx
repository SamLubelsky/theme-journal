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
    const [entryId, setEntryId] = useState(-1);
    const [title, setTitle] = useState("");
    const [seed, setSeed] = useState(1); //seed is used for creating a new-entry from /new-entry page
    const reset = () => {
        setSeed(Math.random());
    }
    function setNewId(id){
        setEntryId(id);
    }
    return (
        <div className="d-flex justify-content-between">
            <div className="entryDisplay">
                <EntryDisplay id={entryId} title={title}/>
            </div>
            <div className="entry">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>navigate("/new-entry")}>Create New Entry</button>
                </div>
                <CreatableEntry key={seed} setNewId={setNewId} setTitle={setTitle}/>
            </div>
            <div className="goalDisplay">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    )
    return (
    <div className="container-fluid">
        <div className="row row-cols-3">
            <div className="col-md-auto">
                <EntryDisplay id={entryId} title={title}/>
            </div>
            <div className="col-md-auto">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>{reset()}}>Create New Entry</button>
                </div>
                <CreatableEntry key={seed} setNewId={setNewId} setTitle={setTitle}/>
            </div>
            <div className="col-md-auto">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    </div>
    );
}
export default NewEntry;