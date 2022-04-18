import React, { useState } from 'react'
import { Button, Card, Col, Container, Row, Table, Modal, Form, Toast, ToastContainer } from 'react-bootstrap'
import logo from '../assets/acl_logo.webp'
import { RiAdminFill } from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'
import { BiSupport } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'

//* Usuarios de Prueba
const dataUsers = [
    {
        code: 20,
        _id: "04324242F",
        rol: 'user',
        password: 'asdadad'
    },
    {
        code: 21,
        _id: "04332432242F",
        rol: 'support',
        password: 'asdadad'
    },
    {
        code: 22,
        _id: "04334124242F",
        rol: 'admin',
        password: 'asdadad'
    },
]

const initialUser = {
    _id: 0,
    code: 0,
    rol: 'user'
}

/* 
*       Roles
*   0: Usuario Regular
*   1: Usuario Soporte
*   2: Usuario Administrador
*/

const roles = [
    {
        en: 'user',
        es: 'Usuario'
    },
    {
        en: 'support',
        es: 'Soporte'
    },
    {
        en: 'admin',
        es: 'Administrador'
    },
]

const rolIcon = (rol) => {
    if (rol === 'admin') {
        return <IconContext.Provider value={{ color: "black", size: "2em" }}>
            <RiAdminFill />
        </IconContext.Provider>
    } else if (rol === 'support') {
        return <IconContext.Provider value={{ color: "black", size: "2em" }}>
            <BiSupport />
        </IconContext.Provider>
    } else {
        return <IconContext.Provider value={{ color: "black", size: "2em" }}>
            <FaUserAlt />
        </IconContext.Provider>
    }
};

const Users = () => {

    const [users, setUsers] = useState(dataUsers)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [toast, setToast] = useState(false)
    const [msg, setMsg] = useState('')

    const [selectedUser, setSelectedUser] = useState(initialUser)

    const selectUser = (user, action) => {
        setSelectedUser(user);
        (action === 'Edit') ? setEditModal(true) : setDeleteModal(true)
    }

    const openAddModal = () => {
        setSelectedUser(initialUser)
        setAddModal(true)
    }

    const handleChange = (e) => {
        //! Por alguna razón almacena el valor en String
        //* Para ello se colocó el '+', afortunadamente, ambos campos son númericos
        const { name, value } = e.target
        setSelectedUser((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(selectedUser);
    }

    //TODO Cambiar para que funcione con MongoDB
    const edit = () => {
        var newUsers = users
        newUsers.map(user => {
            if (user._id === selectedUser._id) {
                user.code = selectedUser.code
                user.rol = selectedUser.rol
            }
        })
        setUsers(newUsers)
        setEditModal(false)
    }
    const softDelete = () => {
        setUsers(users.filter(user => user._id !== selectedUser._id))
        setDeleteModal(false)
    }
    const add = () => {
        var newUser = selectedUser
        var newUsers = users
        newUsers.push(newUser)
        setUsers(newUsers)
        setAddModal(false)
    }

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
                                    <Button onClick={() => openAddModal()} variant="success"><IconContext.Provider value={{ color: "white" }}><MdAdd /></IconContext.Provider></Button>
                                </div>
                            </Row>
                        </Card.Title>
                        <div className="table-scrollable">
                            <Table striped bordered hover size='sm' className=''>
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
                                            <tr key={user._id}>
                                                <td>{rolIcon(user.rol)}</td>
                                                <td>{user.code}</td>
                                                <td>
                                                    <Button className='mx-2' variant="primary" onClick={() => selectUser(user, 'Edit')}><AiFillEdit /></Button>
                                                    <Button variant="danger" onClick={() => selectUser(user, 'Delete')}><AiFillDelete /></Button>
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

            {/* Modal de Editar */}
            <Modal show={editModal}>
                <Modal.Header>
                    <div>
                        <h3>Editar Usuario</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="_id"
                            value={selectedUser && selectedUser._id}
                        />
                        <br />

                        <label>Código</label>
                        <input
                            className="form-control"
                            type="number"
                            name="code"
                            min='1'
                            value={selectedUser && selectedUser.code}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Rol</label>
                        {/* <input
                            className="form-control"
                            type="text"
                            name="rol"
                            value={selectedUser && selectedUser.rol}
                            onChange={handleChange}
                        /> */}
                        <Form.Select name="rol" value={selectedUser && selectedUser.rol} onChange={handleChange} >
                            {
                                roles.map(rol => (
                                    <option value={rol.en} key={rol.en}>{rol.es}</option>
                                ))
                            }
                        </Form.Select>
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={() => {
                            edit()
                            setMsg(`Usuario ${selectedUser.code} editado correctamente`)
                            setToast(true)
                        }}
                    >
                        Actualizar
                    </Button>
                    <Button
                        variant='outline-secondary'
                        onClick={() => setEditModal(false)}
                    >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Modal de Eliminar */}
            <Modal show={deleteModal}>
                <Modal.Body>
                    Estás Seguro que deseas al usuario con código: {selectedUser && selectedUser.code}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => {
                            softDelete()
                            setMsg(`Usuario ${selectedUser.code} eliminado correctamente`)
                            setToast(true)
                        }}
                    >
                        Sí
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setDeleteModal(false)}
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Agregar */}
            <Modal show={addModal}>
                <Modal.Header>
                    <div>
                        <h3>Agregar Usuario</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            type="text"
                            name="_id"
                            onChange={handleChange}
                        />
                        <br />

                        <label>Código</label>
                        <input
                            className="form-control"
                            type="number"
                            name="code"
                            min='1'
                            value={selectedUser && selectedUser.code}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={selectedUser && selectedUser.password}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Rol</label>
                        {/* <input
                            className="form-control"
                            type="text"
                            name="rol"
                            onChange={handleChange}
                        /> */}
                        <Form.Select name="rol" value={selectedUser && selectedUser.rol} onChange={handleChange} >
                            {
                                roles.map(rol => (
                                    <option value={rol.en} key={rol.en}>{rol.es}</option>
                                ))
                            }
                        </Form.Select>
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={() => {
                            add()
                            setMsg(`Usuario ${selectedUser.code} creado correctamente`)
                            console.log(selectedUser)
                            setToast(true)
                        }}
                    >
                        Agregar
                    </Button>
                    <Button
                        variant='outline-secondary'
                        onClick={() => setAddModal(false)}
                    >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Toast (Alerta) */}
            <ToastContainer className='p-3' position='top-end'>
                <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">WEBPPJ</strong>
                    </Toast.Header>
                    <Toast.Body>{msg}</Toast.Body>
                </Toast>
            </ToastContainer>

        </Container>
    )
}

export default Users