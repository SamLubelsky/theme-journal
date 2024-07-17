import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {useNavigate } from 'react-router-dom'
import '../../static/css/home.css'
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
    return GetContent();
}
export default Home;