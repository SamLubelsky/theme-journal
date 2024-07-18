import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
function Entry(props){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [savingText, setSavingText] = useState("");
    const [mode, setMode] = useState("Not Created")
    const [id, setId] = useState(-1)
    const date = new Date();
    const csrftoken = Cookies.get('csrftoken');
    function handleChange(title, body){
        fetch(`/home/entries/${id}/`,{
            method: "PATCH",
            body:`{"id":"${id}", "title":"${title}", "body":"${body}"}`,
            headers: {'X-CSRFToken': csrftoken,
              'Content-Type':'application/json'
            },
            credentials: "include",
          });
    }
    async function createEntry(title, body){
        if(mode === "Created"){
            return;
        }
        const response = await fetch(`/home/entries/`,{
            method: "POST",
            body:`{"title":"${title}", "body":"${body}"}`,
            headers: {'X-CSRFToken': csrftoken,
            'Content-Type':'application/json'
            },
            credentials: "include",
        });
        const json = await response.json()
        if(Object.hasOwn(props, "setNewId")){
            props.setNewId(json.id);
        }
        setId(json.id);
        setMode("Created")
    }
    function resolveAfter1Second() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('resolved');
          }, 1000);
        });
      }
    async function changeTitle(e){
        if(mode === "Not Created"){
            createEntry(e.target.value, body)
        } else{
            if(e.target.value !== ""){
                handleChange(e.target.value, body);
            }
        }
        setSavingText("saving...");
        setTitle(e.target.value)
        props.setTitle(e.target.value)
        await resolveAfter1Second();
        setSavingText("saved to the cloud");
    }
    async function changeBody(e){
        if(mode === "Not Created"){
            const date = new Date();
            const newTitle = date.toDateString();
            createEntry(newTitle, e.target.value)
            setTitle(newTitle)
            props.setTitle(newTitle)
        } else{
            handleChange(title, e.target.value);
        }
        setSavingText("saving...");
        setBody(e.target.value)
        await resolveAfter1Second();
        setSavingText("saved to the cloud");
    }
    return (
        <>
            <h1>Entry for {date.toDateString()}</h1>
            <form>
            <div className ="form-group">
                <label htmlFor="titleInput"> Title </label>
                <input type="text" className ="form-control form-control-lg" id="titleInput" value= {title} placeholder="Enter title" onChange = {changeTitle}/>
                <small id="savingText" className ="form-text text-muted">{savingText}</small>
            </div>
            <div className ="form-group">
                <label htmlFor="bodyInput"> Entry </label>
                <textarea className ="form-control form-control-lg" id="bodyInput" value={body} placeholder="Your Entry here" rows="30" onChange = {changeBody}/>
                <small id="savingText" className ="form-text text-muted">All the text you enter here is automatically encrypted.</small>
            </div>
            </form>
        </>
    );
}
export default Entry;