import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import EntryPreview from "../components/EntryPreview.jsx";
import { nanoid } from 'nanoid'
function AllEntries(){
    const [entries, setEntries] = useState("Entries Loading...");
    const params = useParams();
    const pagination_num = 10;
    const csrftoken = Cookies.get('csrftoken');
    let key = -1;
    useEffect(()=>
        {
            getEntries();
        }, [key]);
    function getEntries(){
        fetchEntries().then(entries=>setEntries(entries))
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
    function getPageNum(){
        if(Object.hasOwn(params, "page")){
            return params.page;
        } else{
            return 1;
        }
    }
    function deleteEntry(id){
        fetch(`/home/entries/${id}/`,{
            method: "DELETE",
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        getEntries();
        key = nanoid();
    }
    function getEntriesOnPage(){
        const page = getPageNum();
        return entries.slice((page - 1) * pagination_num, page * pagination_num);
    }
    function DisplayEntries(){
        if(entries === "Entries Loading..."){
            return entries;
        }
        console.log(entries);
        const pageEntries = getEntriesOnPage();
        const listItems = pageEntries.map((entry) =>{
            return <EntryPreview deleteEntry={deleteEntry} key={entry.id} title={entry.title} body={entry.body} id={entry.id} active={false} time_created={entry.time_created} includeExtra/>;
        }); 
        return <div className="d-flex justify-content-center"><div className="btn-group-vertical btn-group-lg ">{listItems}</div></div>
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
    return (
    <>
    <DisplayEntries key={key}/>
    <PaginateNavbar />
    </>
    );
}
export default AllEntries;