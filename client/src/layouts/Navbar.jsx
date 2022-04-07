import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap' 
import { Outlet, Link } from 'react-router-dom'
import logo from '../assets/acl_logo.webp'

const NavbarExample = () => {

    const [user, setUser] = useState()

    return (
        <>
            <Navbar className="navBg" bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/"><img className='logo' src={logo} alt="ACL" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user && <Nav.Link as={Link} to="/users">Users</Nav.Link> }
                            {user && <Nav.Link as={Link} to="/plan">Plan de estudio</Nav.Link> }
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/users/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/users/register">Register</Nav.Link>
                            {user && <Nav.Link as={Link} to="/user/profile">Profile</Nav.Link> }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <section>
                <Outlet></Outlet>
            </section>
        </>
    )
}

export default NavbarExample