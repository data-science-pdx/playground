import React from "react";
import {Navbar, Nav} from 'react-bootstrap'
import './stylesheet.css'

export const Header = () => {
    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                Freeway Analysis
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#Date">Date</Nav.Link>
                    <Nav.Link href="#Map">Map</Nav.Link>
                    <Nav.Link href="#Pie">Analysis</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}