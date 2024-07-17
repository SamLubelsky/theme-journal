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
import EditEntry from "./EditEntry.jsx";
import NewEntry from "./NewEntry.jsx";
function Home(props){
    const csrftoken = Cookies.get('csrftoken');
    const [entries, setEntries] = useState("Entries Loading...");
    useEffect(()=>{
        getEntries();
    });
    async function getEntries(){
        if(entries !== "Entries Loading..."){
            return;
        }
        fetchEntries().then(entries=>setEntries(entries));
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
    function GetContent(){
        if(entries === "Entries Loading..."){
            return entries;
        }
        if(entries.length === 0){
            return <NewEntry />
        } else{
            return <EditEntry id={entries[0].id} />
        }
    }
    const navigate = useNavigate();
    return GetContent();
}
export default Home;