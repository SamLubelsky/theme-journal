import React, {useState} from "react";
import Entry from "../components/Entry.jsx";
import {useNavigate, useParams} from 'react-router-dom'
import GoalDisplay from "../components/GoalDisplay.jsx";
import EntryDisplay from "../components/EntryDisplay.jsx";
import '../../static/css/home.css'
function EditEntry(props){
    let id;
    const params = useParams();
    if(Object.hasOwn(props, "id")){
        id = props.id;
    } else{
        id = params.entryId;
    }
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    return (
        <div className="d-flex justify-content-between">
            <div className="entryDisplay">
                <EntryDisplay id={id} title={title}/>
            </div>
            <div className="entry">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>navigate("/new-entry")}>Create New Entry</button>
                </div>
                <Entry key={id} entryId={id} setTitle={setTitle}/>
            </div>
            <div className="goalDisplay">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    )
    return (
    <div className="container-fluid">
        <div className="row row-cols-3">
            <div className="col-2">
                <EntryDisplay id={id} title={title}/>
            </div>
            <div className="col-4">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>navigate("/new-entry")}>Create New Entry</button>
                </div>
                <Entry key={id} entryId={id} setTitle={setTitle}/>
            </div>
            <div className="col-4 col-auto">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    </div>
    );
}
export default EditEntry;