import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap' 
import { Outlet, Link } from 'react-router-dom'
import logo from '../assets/acl_logo.webp'
import routes from '../auth/helpers/routes';

const NavbarExample = () => {

    //TODO: Cambiar para que dependiendo del rol del usuario, muestre unas rutas u otras
    const [user, setUser] = useState()

    return (
        <>
            <Navbar className="navBg nav-links" bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={routes.home}><img className='logo' src={logo} alt="ACL" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={routes.users}>Usuarios</Nav.Link>
                            <Nav.Link as={Link} to={routes.plan}>Administración</Nav.Link>
                            <Nav.Link as={Link} to={routes.planes}>Planes de estudio</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={routes.login}>Login</Nav.Link>
                            {user && <Nav.Text>{user.name}</Nav.Text> }
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