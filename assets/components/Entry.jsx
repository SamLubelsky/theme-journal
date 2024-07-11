import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
function Entry(props){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [savingText, setSavingText] = useState("");
    const date = new Date();
    const csrftoken = Cookies.get('csrftoken');
    async function populateEntry(id){
        const response = await fetch(`/home/entries/${id}/`,{
            method: "GET",
            headers: {'X-CSRFToken': csrftoken,
              'Content-Type':'application/json'
            },
            credentials: "include",
          });
        const entryData = await response.json();
        setTitle(entryData.title);
        setBody(entryData.body);
    }
    function handleChange(title, body){
        fetch(`/home/entries/${props.entryId}/`,{
            method: "PATCH",
            body:`{"id":"${props.entryId}", "title":"${title}", "body":"${body}"}`,
            headers: {'X-CSRFToken': csrftoken,
              'Content-Type':'application/json'
            },
            credentials: "include",
          });
    }
    function resolveAfter1Second() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('resolved');
          }, 1000);
        });
      }
    async function changeTitle(e){
        setSavingText("saving...");
        setTitle(e.target.value)
        handleChange(e.target.value, body);
        await resolveAfter1Second();
        setSavingText("saved to the cloud");
    }
    async function changeBody(e){
        setSavingText("saving...");
        setBody(e.target.value)
        handleChange(title, e.target.value);
        await resolveAfter1Second();
        setSavingText("saved to the cloud");
    }
    useEffect(()=>{
        populateEntry(props.entryId);
    }, []);
    return (

        <>
            <h1>Entry for {date.toDateString()}</h1>
            <form>
            <div className ="form-group">
                <label htmlFor="titleInput"> Title </label>
                <input type="text" className ="form-control" id="titleInput" value= {title} placeholder="Enter title" onChange = {changeTitle}/>
                <small id="savingText" className ="form-text text-muted">{savingText}</small>
            </div>
            <div className ="form-group">
                <label htmlFor="bodyInput"> Entry </label>
                <textarea className ="form-control" id="bodyInput" value={body} placeholder="Your Entry here" rows="40" onChange = {changeBody}/>
                <small id="savingText" className ="form-text text-muted">All the text you enter here is automatically encrypted.</small>
            </div>
            </form>
        </>
    );
}
export default Entry;