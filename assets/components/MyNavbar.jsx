import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
function MyNavbar(){
    return (
        // style={{backgroundColor:"#dc3545"}}
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" >
        <Container>
            <Navbar.Brand href="/home">Theme Journal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/goals">Goals</Nav.Link>
                    <Nav.Link href="/theme">Your Theme</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
export default MyNavbar;