import React from "react";
import Entry from "../components/Entry.jsx";
import {useNavigate, useParams} from 'react-router-dom'
import GoalDisplay from "../components/GoalDisplay.jsx";
import EntryDisplay from "../components/EntryDisplay.jsx";
import '../../static/css/home.css'
function EditEntry(props){
    const params = useParams();
    const id = params.entryId;
    const navigate = useNavigate();
    return (
    <div className="container-fluid">
        <div className="row row-cols-3">
            <div className="col-md-auto">
                <EntryDisplay id={id}/>
            </div>
            <div className="col-md-auto">
                <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger btn-lg btn-primary" onClick={()=>navigate("/new-entry")}>Create New Entry</button>
                </div>
                <Entry key={id} entryId={id} />
            </div>
            <div className="col-md-auto">
                <GoalDisplay displayLength="week"/>
            </div>
        </div>
    </div>
    );
}
export default EditEntry;