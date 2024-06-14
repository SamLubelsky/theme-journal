import React from "react";
import Cookies from 'js-cookie'
import {useState} from "react";
import Form from "../components/Form.jsx";
function Theme(props){
    let noThemeText = "";
    const csrftoken = Cookies.get('csrftoken');
    const [theme, setTheme] = useState(props.theme);
    function addTheme(name){
        const newTheme = name
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
    const noThemeTemplate = (
        <div className="todoapp stack-large">
            <h1>You have not selected a theme yet.</h1>
            <Form addItem={addTheme}/>
        </div>
    );
    const themeTemplate = (
        <div className="todoapp stack-large">
            <h1>Your theme is: {theme}</h1>
        </div>
    );
    return theme===""? noThemeTemplate: themeTemplate;
}
export default Theme;