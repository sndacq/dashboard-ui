import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";

function Header() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand>
            <Link className="link" to="/">Dashboard</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="link" to="/expenses">Expenses</Link>                    
                <Link className="link" to="/nutrition">Nutrition</Link>
                <Link className="link" to="/mood">Mood</Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    ); 
}

export default Header;