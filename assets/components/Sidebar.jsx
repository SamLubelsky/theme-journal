import React from 'react';
import '../../static/css/sidebar.css'
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import { useNavigate } from 'react-router-dom';
function Sidebar(props){
    const navigate = useNavigate();
    return (
        <SideNav 
        onSelect={selected=>{
            console.log(selected);
            navigate('/'+selected);
        }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon><i className="fa-solid fa-house" style={{fontSize: "1.5em"}}/></NavIcon>
                    <NavText>Home</NavText>
                </NavItem>
                <NavItem eventKey="theme">
                    <NavIcon><i className="fa-solid fa-lightbulb" style={{fontSize: "1.5em"}}/></NavIcon>
                    <NavText>Theme</NavText>
                </NavItem>
                <NavItem eventKey="goals">
                    <NavIcon><i className="fa-solid fa-list-check"style={{fontSize: "1.5em"}}/></NavIcon>
                    <NavText>Goals</NavText>
                </NavItem>
                <NavItem eventKey="settings">
                    <NavIcon><i className="fa-solid fa-gear"style={{fontSize: "1.5em"}}/></NavIcon>
                    <NavText>Settings</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>


      );
}
export default Sidebar;