import React, { useState, useEffect } from "react";
import Entry from "../components/Entry.jsx";
import CreatableEntry from "../components/CreatableEntry.jsx";
import Cookies from 'js-cookie'
function NewEntry(props){
    const csrftoken = Cookies.get('csrftoken');
    const [id, setId] = useState(-1);
    const [mode, setMode] = useState("Loading")
    function EntryDisplay(){
        if(mode == "Loaded"){
            return <Entry entryId={id} />;
        } else{
            return <DummyEntry createEntry={createEntry}/>
        }
    }
    return(
        <CreatableEntry/>
    )
}
export default NewEntry;