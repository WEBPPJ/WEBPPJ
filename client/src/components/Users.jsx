import React, { useState } from 'react'
import { Button, Card, Col, Container, Row, Table, Modal, Form, Toast, ToastContainer, OverlayTrigger, Tooltip } from 'react-bootstrap'
import logo from '../assets/acl_logo.webp'
import { RiAdminFill } from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'
import { BiSupport } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillEye,AiFillEyeInvisible, AiFillEdit } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import axios from 'axios'
import 'animate.css';
import { FcIdea, FcRefresh } from 'react-icons/fc'



const initialUser = {
    _id: 0,
    code: 0,
    rol: "user"
}

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

    const [users, setUsers] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
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
        //! Por alguna raz??n almacena el valor en String
        //* Para ello se coloc?? el '+', afortunadamente, ambos campos son n??mericos
        const { name, value } = e.target
        setSelectedUser((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!selectedUser.code || !selectedUser.password){
            setMsg("Los campos no pueden estar vacios")
            setToast(true)
        }else{
           const code=selectedUser.code
           const password=selectedUser.password
           const role=selectedUser.rol
         const user = {
           code,
           password,
           role
        }
          await axios
            .post("http://localhost:3001/api/users/", user)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                setAddModal(false)
                setMsg("Usuario creado con exito")
                setToast(true)
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                setMsg(error.response.data.msg)
                setToast(true)
              }, 1500);
            });
        }
        
      };
      const onUpdate = async (e) => {
        e.preventDefault();
           const code=selectedUser.code
           const role=selectedUser.rol
         const user = {
           code,
           role
        }
          await axios
            .post("http://localhost:3001/api/users/update", user)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                setEditModal(false)
                setMsg(data)
                setToast(true)
                
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
      };
      const password = async (e) => {
        e.preventDefault();
           const code=selectedUser.code
           const password='password'
         const user = {
           code,
           password
        }
          await axios
            .post("http://localhost:3001/api/users/password", user)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                setPasswordModal(false)
                setMsg(data)
                setToast(true)
                
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
      };
      const loadUsers = () => {

        fetch('http://localhost:3001/api/users/all')
            .then(res => res.json())
            .then(allUsers => setUsers(allUsers))
    }
    const Active = async (e) => {
        e.preventDefault();
       if (selectedUser.code!==0) {
           const code=selectedUser.code
           const active=!selectedUser.active
         const user = {
           code,
           active
        }
          await axios
            .post("http://localhost:3001/api/users/activate", user)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                setMsg(data)
                setToast(true)
                setDeleteModal(false)
                
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
          
        }
      };
      
    loadUsers()


    return (
        <Container className="d-flex justify-content-center pt-4">
            <Col xs={8}>
                <Card className='syllCard'>
                    <Card.Body>
                        <Card.Img className="logo" variant='top' src={logo} />
                        <Card.Title>
                            <Row>
                                <h5>Usuarios</h5>
                                <div className="d-flex justify-content-end px-4">
                                    <OverlayTrigger placement='bottom-start' overlay={<Tooltip>A??adir usuario</Tooltip>}><Button onClick={() => openAddModal()} variant="success"><IconContext.Provider value={{ color: "white" }}><MdAdd /></IconContext.Provider></Button></OverlayTrigger>
                                </div>
                            </Row>
                        </Card.Title>
                        <div className="table-scrollable">
                            <Table striped bordered hover size='sm' className=''>
                                <thead>
                                    <tr>
                                        <th>Rol</th>
                                        <th>C??digo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map(user => (
                                            <tr key={user._id} className='animate__animated animate__fadeIn'>
                                                <td>{rolIcon(user.role)}</td>
                                                <td>{user.code}</td>
                                                <td>
                                                    <OverlayTrigger placement='left' overlay={<Tooltip>Editar Usuario</Tooltip>}><Button className='mx-2' variant="primary" onClick={() => selectUser(user, 'Edit')}><AiFillEdit /></Button></OverlayTrigger>
                                                    {user.active==true &&<OverlayTrigger placement='right' overlay={<Tooltip>Cambiar estado</Tooltip>}><Button variant="danger" onClick={()=> selectUser(user, 'Delete')}><AiFillEyeInvisible /></Button></OverlayTrigger>}
                                                    {user.active==false &&<OverlayTrigger placement='right' overlay={<Tooltip>Cambiar estado</Tooltip>}><Button variant="info" onClick={()=> selectUser(user, 'Delete')}><AiFillEye /></Button></OverlayTrigger>}
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
                        <h3>Editar usuario</h3>
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

                        <label>C??digo</label>
                        <input
                            className="form-control"
                            type="number"
                            name="code"
                            min='1'
                            value={selectedUser && selectedUser.code}
                            onChange={handleChange}
                            readOnly
                        />
                        
                        <br />

                        <label>Rol</label>
                        <Form.Select name="rol" defaultValue={selectedUser && selectedUser.role} onChange={handleChange} >
                            {
                                roles.map(rol => (
                                    <option value={rol.en} key={rol.en}>{rol.es}</option>
                                ))
                            }
                        </Form.Select>
                        <br />
                        <Button onClick={() => {
                            setPasswordModal(true)
                        }}
                            variant='info'>??Deseas restablecer la contrase??a a 'password'? <FcRefresh /></Button>
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='update'
                        variant='primary'
                        onClick={(e)=>onUpdate(e)}
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
                {selectedUser.active &&<Modal.Body>
                    Est??s seguro que deseas cambiar el estado del usuario con c??digo {selectedUser && selectedUser.code} a 'inactivo'
                </Modal.Body>}
                {!selectedUser.active &&<Modal.Body>
                    Est??s seguro que deseas cambiar el estado del usuario con c??digo {selectedUser && selectedUser.code} a 'activo'
                </Modal.Body>}
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={(e)=>Active(e)}
                    >
                        S??
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setDeleteModal(false)}
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*Modal de cambio de contrase??a*/}
            <Modal show={passwordModal}>
                <Modal.Body>
                    Est??s seguro de que deseas restablecer la contrase??a del usuario {selectedUser && selectedUser.code} a 'password'
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={(e)=>password(e)}
                    >
                        S??
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setPasswordModal(false)}
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Agregar */}
            <Modal show={addModal}>
                <Modal.Header>
                    <div>
                        <h3>Agregar usuario</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        

                        <label>C??digo</label>
                        <input
                            className="form-control"
                            type="number"
                            name="code"
                            min='1'
                            value={selectedUser && selectedUser.code}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Contrase??a</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={selectedUser && selectedUser.password}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Rol</label>
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
                <Button type='submit'
                        variant='primary'
                        onClick={(e)=>onSubmit(e)}
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