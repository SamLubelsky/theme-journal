import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router-dom';
function EntryPreview(props){
    const navigate = useNavigate();
    //<button type="button" className="btn btn-danger btn-lg" onClick={()=>navigate(`/entry`)}>{props.title}</button>
    const ellipses = props.title.length > 40 ? "..." : ""
    const previewText = props.title.substring(0,40) + ellipses;
        // <div id = 'entryPreview' style={{border: "solid black"}}>
        //     <Link to={`/entry/${props.id}`}>{props.title}</Link>
        //     <p>{`${bodyText} ${ellipses} `}</p>
        // </div>
    if(props.active === true){
         return <Link className="btn btn-primary active" to={`/entry/${props.id}`}> {previewText} </Link>
    }
    return <Link className="btn btn-danger btn-primary" to={`/entry/${props.id}`}> {previewText} </Link>
}
export default EntryPreview;