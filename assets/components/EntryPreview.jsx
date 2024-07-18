import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router-dom';
function EntryPreview(props){
    const navigate = useNavigate();
    //<button type="button" className="btn btn-danger btn-lg" onClick={()=>navigate(`/entry`)}>{props.title}</button>
    const titleEllipses = props.title.length > 22 ? "..." : ""
    const previewTitle = props.title.substring(0,22) + titleEllipses;
    const bodyEllipses = props.body.length > 100 ? "..." : ""
    const previewBody = props.body.substring(0,100) + bodyEllipses;
    const previewTime = new Date(props.time_created).toDateString();
    if(props.includeExtra){
        return <div className="d-flex entry-flex">
                <Link className="btn btn-danger btn-entry flex-fill flex-grow-1" to={`/entry/${props.id}`}> 
                {previewTitle}  <p> {previewBody} </p> <aside> {previewTime} </aside>
                </Link>
                {/* <img src="/static/images/trash-solid.svg" /> */}
                <input type="image" className="btn-delete" src="/static/images/trash-solid.svg" onClick={()=>props.deleteEntry(props.id)}/>
                {/* <button id="delete-entry" className="btn btn-primary btn-delete" >Delete </button> */}
                </div>
    }
    if(props.active === true){
         return <Link className="btn btn-primary active" to={`/entry/${props.id}`}> {previewTitle} </Link>
    }
    return <Link className="btn btn-danger btn-primary" to={`/entry/${props.id}`}> {previewTitle} </Link>
}
export default EntryPreview;