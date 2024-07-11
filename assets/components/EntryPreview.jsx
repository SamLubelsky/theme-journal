import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router-dom';
function EntryPreview(props){
    const navigate = useNavigate();
    //<button type="button" className="btn btn-danger btn-lg" onClick={()=>navigate(`/entry`)}>{props.title}</button>
    const bodyText = props.body.substring(0,100);
    const ellipses = props.body.length > 100 ? "..." : ""
    return(
        // <div id = 'entryPreview' style={{border: "solid black"}}>
        //     <Link to={`/entry/${props.id}`}>{props.title}</Link>
        //     <p>{`${bodyText} ${ellipses} `}</p>
        // </div>
        <a href={`/entry/${props.id}`}> {props.title} </a>
    )
}
export default EntryPreview;