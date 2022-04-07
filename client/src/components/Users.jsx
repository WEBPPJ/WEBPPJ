import React from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import logo from '../assets/acl_logo.webp'
import { RiAdminFill } from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'
import { BiSupport } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'

//* Usuarios de Prueba
const users = [
    {
        code: 20,
        _id: "04324242F",
        rol: 0
    },
    {
        code: 21,
        _id: "043324242F",
        rol: 1
    },
    {
        code: 22,
        _id: "043324242F",
        rol: 2
    },
]

/* 
*       Roles
*   0: Usuario Regular
*   1: Usuario Soporte
*   2: Usuario Administrador
*/

const rolIcon = (rol) => {
    if(rol === 2) {
        return <IconContext.Provider value={{ color: "black", size: "2em"}}>
                    <RiAdminFill/>
                </IconContext.Provider>
    } else if (rol === 1) {
        return <IconContext.Provider value={{ color: "black", size: "2em"}}>
                    <BiSupport/>
                </IconContext.Provider>
    } else {
        return <IconContext.Provider value={{ color: "black", size: "2em"}}>
                    <FaUserAlt/>
                </IconContext.Provider>
    }
  };

const Users = () => {

    return (
        <Container className="d-flex justify-content-center pt-4">
            <Col xs={8}>
                <Card className=''>
                    <Card.Body>
                        <Card.Img className="logo" variant='top' src={logo} />
                            <Card.Title>
                                <Row>
                                <h5>Usuarios</h5>
                                <div className="d-flex justify-content-end px-4">
                                <Button variant="success"><IconContext.Provider value={{ color: "white"}}><MdAdd/></IconContext.Provider></Button>
                                </div>
                                </Row>
                            </Card.Title>
                            <div className="">
                                <Table striped bordered hover size='sm'>
                                    <thead>
                                        <tr>
                                            <th>Rol</th>
                                            <th>Código</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map(user => (
                                                <tr>
                                                    <td>{rolIcon(user.rol)}</td>
                                                    <td>{user.code}</td>
                                                    <td>
                                                        <Button className='mx-2' variant="primary"><AiFillEdit/></Button>
                                                        <Button variant="danger"><AiFillDelete/></Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}

export default Users