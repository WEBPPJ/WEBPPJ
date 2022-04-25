import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap' 
import { Outlet, Link, useParams } from 'react-router-dom'
import logo from '../assets/acl_logo.webp'
import routes from '../auth/helpers/routes';

const NavbarExample = () => {

    //TODO: Cambiar para que dependiendo del rol del usuario, muestre unas rutas u otras
    const [user, setUser] = useState({})
    
    const {code} = useParams()
    const loadUserData = () => {
        fetch(`http://localhost:3001/api/users/data/${code}`)
            .then(response => response.json())
            .then(user => setUser(user))
    }
    
    if(code){
        loadUserData()
    }
    
    
    return (
        <>
            <Navbar className="navBg nav-links" bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={routes.home}><img className='logo' src={logo} alt="ACL" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {code && user.role=='support' && <Nav.Link as={Link} to={`users/${code}`}>Usuarios</Nav.Link>}
                            {code && user.role=='admin' && <Nav.Link as={Link} to={`plan/${code}`}>Administración</Nav.Link>}
                            {code && user.role=='admin'&&<Nav.Link as={Link} to={`plans/${code}`}>Planes de estudio</Nav.Link>}
                            {code && user.role=='user'&&<Nav.Link as={Link} to={`plans/${code}`}>Planes de estudio</Nav.Link>}
                        </Nav>
                        <Nav>
                            {!code && <Nav.Link as={Link} to={routes.login}>Iniciar Sesión</Nav.Link>}

                            {code && <Nav.Link as={Link} to={`account/${code}`}>Perfil</Nav.Link>}
                            {code && <Nav.Link as={Link} to={`/`}>Salir</Nav.Link>}
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