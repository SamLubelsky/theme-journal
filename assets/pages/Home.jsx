import React, { useState } from "react";
import Entry from "../components/Entry.jsx";
import {nanoid} from "nanoid";
import Cookies from 'js-cookie'
import { json } from "react-router-dom";
function Home(props){
    const csrftoken = Cookies.get('csrftoken');
    const [mode, setMode] = useState("Regular")
    const [id, setId] = useState(-1);
    let entryDisplay = <></>;
    async function createEntry(){
        if(mode == "Writing"){
            return;
        }
        const response = await fetch(`/home/entries/`,{
            method: "POST",
            body:`{"title":"", "body":""}`,
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const json = await response.json()
        setId(json.id);
        setMode("Writing")
        entryDisplay = <Entry entryId={json.id} />
    }
    function EntryDisplay(){
        if(mode == "Writing"){
            return <Entry entryId={id} />;
        } else{
            return "";
        }
    }
    async function getEntriesFromToday(){
        const response = await fetch(`/home/entries/`,{
            method: "GET",
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const entries = await response.json();
        const today = new Date();
        const entriesFromToday = entries.results.filter((entry)=> {
            const entryDate = new Date(entry.time_created);
            return entryDate.toDateString() === today.toDateString();
        });
        console.log(entriesFromToday);
        return entriesFromToday;
    }
    getEntriesFromToday();
    return (
    <>
    <button type="button" className="btn btn-danger btn-lg" onClick={()=>createEntry()}>Create Entry</button>
    <EntryDisplay />
    </>
    );
}
export default Home;