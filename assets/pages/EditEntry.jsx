import React, { useState, useEffect } from "react";
import Entry from "../components/Entry.jsx";
import Cookies from 'js-cookie'
import { useParams } from "react-router-dom";
function EditEntry(props){
    const params = useParams();
    const csrftoken = Cookies.get('csrftoken');
    const [mode, setMode] = useState("Regular")
    return(
        <>  
        <h1> Edit Entry </h1>
        <Entry entryId={params.entryId} />
        </>
    )
}
export default EditEntry;