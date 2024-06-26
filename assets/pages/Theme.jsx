import React from "react";
import Cookies from 'js-cookie'
import {useState} from "react";
import Form from "../components/Form.jsx";
import EditableItem from "../components/EditableItem.jsx";
import {nanoid} from "nanoid";
function Theme(props){
    let noThemeText = "";
    const csrftoken = Cookies.get('csrftoken');
    const [theme, setTheme] = useState(props.theme);
    function addTheme(name){
      const newTheme = {'id': `${nanoid()}`, 'name': name}
      setTheme(newTheme);
      fetch(`/home/themes/`,{
        method: "POST",
        body:`{"name":"${name}"}`,
        headers: {'X-CSRFToken': csrftoken,
          'Content-Type':'application/json'
        },
        credentials: "include",
        });
      }
    function deleteTheme(id){
      setTheme({name: "", id: 0});
      fetch(`/home/themes/${id}/`,{
        method: "DELETE",
        headers: {'X-CSRFToken': csrftoken,
          'Content-Type':'application/json'
        },
        credentials: "include",
      });
    }
    function editTheme(id, newName){
      setTheme({name: newName, id: theme.id})
      fetch(`/home/themes/${id}/`,{
        method: "PATCH",
        body:`{"name":"${newName}"}`,
        headers: {'X-CSRFToken': csrftoken,
          'Content-Type':'application/json'
        }, 
        credentials: "include",
      });
    }
    const noThemeTemplate = (
        <div className="todoapp stack-large">
            <h1>You have not selected a theme yet.</h1>
            <Form addItem={addTheme} formText="Get started with Themes and add your own!"/>
        </div>
    );
    const themeTemplate = (
        <div className="todoapp stack-large">
            <EditableItem 
            name={`Theme: ${theme.name}`}
            id={theme.id}
            key={theme.id}
            deleteItem={deleteTheme}
            editItem={editTheme}
            />
        </div>
    );
    return theme.name === ""? noThemeTemplate: themeTemplate;
}
export default Theme;