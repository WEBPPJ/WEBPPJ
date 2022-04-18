import React, { useState } from 'react'
import { Alert, Button, Card, Col, Modal, Toast, ToastContainer } from 'react-bootstrap'
import { MdModeEdit, MdClear, MdCheck } from 'react-icons/md'
import {AiFillDelete } from 'react-icons/ai'
import 'animate.css';

const data = [
    {
        _id: 32424,
        syllabus: 123131223,
        link: 'http://localhost:3000/users/login',
        state: 0
    },
    {
        _id: 132424,
        syllabus: 123131223,
        link: 'http://localhost:3000/syllabus',
        state: 1
    },
    {
        _id: 332424,
        syllabus: 123133421223,
        link: 'http://localhost:3000/users',
        state: 0
    },
    {
        _id: 3243124,
        syllabus: 123133421223,
        link: 'https://react-bootstrap.github.io/components/alerts',
        state: 1
    },
    {
        _id: 532424,
        syllabus: 123131223,
        link: 'http://localhost:3000/users/login',
        state: 1
    },
    
]

const SyllabusCard = ({ syllabus, deleteSyll, initialSyll, edit }) => {

    const [links, setLinks] = useState(data)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [selectedSyll, setSelectedSyll] = useState(syllabus)
    const [toast, setToast] = useState(false)
    const [msg, setMsg] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setSelectedSyll((prevState) => ({
          ...prevState,
          [name]: value
        }))
      }

    const deleteLink = (id) => {
        setLinks(links.filter(link => link._id !== id))
    }

    //! Lo actualiza correctamente, pero no se actualizan (visualmente) los links hasta cerrar el modal
    const changeState = (id) => {
        var newLinks = links
        newLinks.map(link => {
            if (link._id === id) {
                link.state = 1
            }
        })
        setLinks(newLinks)
    }
    
    return (
        <Col md="3" className='mb-4'>
            <Card className='animate__animated animate__fadeInDown'>
                {/* Forma 1 */}
                <Card.Body>
                    <div className="d-flex bd-highlight">
                        <Card.Title className='me-auto p-2 bd-highlight'>{selectedSyll.name}</Card.Title>
                        <Button onClick={() => {
                            setEditModal(true)
                        }} 
                        className='me-2 cardButton'><MdModeEdit /></Button>
                        <Button onClick={() => {
                            setDeleteModal(true)
                        }}
                        variant='danger'
                        ><AiFillDelete /></Button>
                    </div>
                    <div className="pt-2">
                        <Button className='w-100' variant='secondary' onClick={() => setViewModal(true)}> Ver Enlaces </Button>
                    </div>
                </Card.Body>
                {/* Forma 2 */}
                {/* <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-center'>{syllabus.name}<Button variant='success'><AiFillEye/></Button><Button><MdModeEdit/></Button></Card.Title>
                <div className="pt-2">
                    <Button className='w-100' variant='danger'> Eliminar </Button>
                </div>
            </Card.Body> */}
            </Card>
            {/*Modal de Eliminar */}
            <Modal show={deleteModal}>
                <Modal.Body>
                    Estás Seguro que deseas eliminar el plan de Estudio '{selectedSyll.name}'
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteSyll(selectedSyll._id)
                            setDeleteModal(false)
                            //! El toast no se muestra por la funcion de eliminar, ya que si se comenta, se puede ver que se genera bien, estoy trabajando en ello
                            setMsg(`Plan ${selectedSyll.name} eliminado correctamente`)
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

            {/* Modal de Editar */}
            <Modal show={editModal}>
                <Modal.Header>
                    <div>
                        <h3>Editar Plan de Estudio</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            type="text"
                            name="_id"
                            value={selectedSyll && selectedSyll._id}
                            readOnly
                        />
                        <br />

                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={selectedSyll && selectedSyll.name}
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={() => {
                            edit(selectedSyll)
                            setEditModal(false)
                            setMsg(`Plan ${selectedSyll.name} editado correctamente`)
                            setToast(true)
                        }}
                    >
                        Agregar
                    </Button>
                    <Button
                        variant='outline-secondary'
                        onClick={() => setEditModal(false)}
                    > 
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Modal de Ver Enlaces */}
            <Modal show={viewModal} dialogClassName="view-modal" scrollable={true}>
            <Modal.Header>
                    <div>
                        <h3>{selectedSyll.name}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="">
                        Enlaces Aceptados
                    </h5>
                    <div className="d-flex align-items-start flex-column bd-highlight mb-3">
                    {
                        links.length === 0
                        ? (
                            <Alert variant='primary'>Sin enlaces</Alert>
                        )
                        : (
                            (links).map(link => (
                                ((link.syllabus === selectedSyll._id) && (link.state === 1 && <div className='p-2 bd-highlight' key={link._id}>
                                <a className='me-auto p-2 bd-highlight' variant='link' key={link._id} href={link.link} target="_blank" rel="noreferrer">{link.link}</a>
                                <Button variant='outline-danger' onClick={() => {
                                    deleteLink(link._id)
                                    setMsg(`Enlace ${link.link} eliminado correctamente`)
                                    setToast(true)
                                }} className='me-2'><AiFillDelete/></Button>
                                </div>))
                            ))
                        )
                    }
                    </div>
                    <h5 className='pt-3'>Enlaces por Aceptar</h5>
                    <div className="d-flex align-items-start flex-column bd-highlight mb-3">
                    {
                        links.length === 0
                        ? (
                            <Alert variant='primary'>Sin enlaces por aceptar</Alert>
                        )
                        : (
                            (links).map(link => (
                                ((link.syllabus === selectedSyll._id) && (link.state === 0 && <div className='p-2 bd-highlight' key={link._id}>
                                <a className='me-auto p-2 bd-highlight' variant='link' key={link._id} href={link.link} target="_blank" rel="noreferrer">{link.link}</a>
                                <Button variant='outline-success' onClick={() => {
                                    changeState(link._id)
                                    setMsg(`Enlace ${link.link} aceptado correctamente`)
                                    setToast(true)
                                }} className='me-2'><MdCheck/></Button>
                                <Button variant='outline-danger' onClick={() => {
                                    deleteLink(link._id)
                                    setMsg(`Enlace ${link.link} denegado correctamente`)
                                    setToast(true)
                                }} className='me-2' ><MdClear/></Button>
                                </div>))
                            ))
                        )
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setViewModal(false)}
                    >
                        Cerrar
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

        </Col>
    )
}

export default SyllabusCard