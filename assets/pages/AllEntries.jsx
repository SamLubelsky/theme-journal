import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import EntryPreview from "../components/EntryPreview.jsx";
function AllEntries(){
    const [mode, setMode] = useState("Not Received");
    const [entries, setEntries] = useState([]);
    const params = useParams();
    const pagination_num = 10;
    const csrftoken = Cookies.get('csrftoken');
    useEffect(()=>
        {
            getEntries();
        });
    async function getEntries(){
        if(mode === "Received"){
            return;
        }
        const response = await fetch(`/home/entries/`,{
            method: "GET",
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const entries = await response.json();
        setEntries(entries);
        setMode("Received");
        return entries;
    }
    function getPageNum(){
        if(Object.hasOwn(params, "page")){
            return params.page;
        } else{
            return 1;
        }
    }
    function getEntriesOnPage(){
        const page = getPageNum();
        return entries.slice((page - 1) * 10, page * 10);
    }
    function DisplayEntries(){
        const entries = getEntriesOnPage();
        if(Object.keys(entries).length === 0){
            return;
        }
        const listItems = entries.map((entry) =>{
            return <EntryPreview key={entry.id} title={entry.title} body={entry.body} id={entry.id} active={false} includeBody/>;
        }); 
        return <div className="btn-group-vertical btn-group-lg">{listItems}</div>
    }
    function getNumPages(){
        return Math.ceil(entries.length / 10);
    }
    function PaginateNavbar(){
        const currentPage = getPageNum();
        const numPages = getNumPages();
        const pageItems = Array.from({length: numPages}, (_, i) => i + 1).map((num)=>
        {
            if(num == currentPage) return <li key={num} className="page-item active"><Link className="page-link" to={`/all-entries/${num}`}>{num}</Link></li>
            return <li key={num} className="page-item"><Link className="page-link" to={`/all-entries/${num}`}>{num}</Link></li>
        });
        return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination-lg justify-content-center">
                {pageItems}
            </ul>
        </nav>
        );
    }
    return (<>
    <DisplayEntries />
    <PaginateNavbar />
    </>
    );
}
export default AllEntries;