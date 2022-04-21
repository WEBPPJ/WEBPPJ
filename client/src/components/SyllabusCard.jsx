import React, { useState } from 'react'
import { Button, Card, Col, Modal, OverlayTrigger, Table, Toast, ToastContainer, Tooltip } from 'react-bootstrap'
import { MdModeEdit, MdClear, MdCheck, MdPending } from 'react-icons/md'
import { AiFillDelete, AiOutlineCheckCircle } from 'react-icons/ai'
import 'animate.css';
import { IconContext } from 'react-icons/lib'

const data = [
    {
        _id: 32424,
        syllabus: 123131223,
        link: 'http://localhost:3000/users/login',
        state: 0,
        title: 'Titulo'
    },
    {
        _id: 132424,
        syllabus: 123131223,
        link: 'http://localhost:3000/syllabus',
        state: 1,
        title: 'Titulo'
    },
    {
        _id: 332424,
        syllabus: 123133421223,
        link: 'http://localhost:3000/users',
        state: 0,
        title: 'Titulo'
    },
    {
        _id: 3243124,
        syllabus: 123133421223,
        link: 'https://react-bootstrap.github.io/components/alerts',
        state: 1,
        title: 'Titulo'
    },
    {
        _id: 532424,
        syllabus: 123131223,
        link: 'http://localhost:3000/users/login',
        state: 1,
        title: 'Titulo'
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
            <Card className='animate__animated animate__fadeInDown syllCard'>
                {/* Forma 1 */}
                <Card.Body>
                    <div className="d-flex bd-highlight">
                        <Card.Title className='me-auto p-2 bd-highlight'>{selectedSyll.name}</Card.Title>
                        <OverlayTrigger placement='top' overlay={<Tooltip>Editar Plan de Estudio</Tooltip>}>
                        <Button onClick={() => {
                            setEditModal(true)
                        }}
                            className='me-2 cardButton'><MdModeEdit /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement='top' overlay={<Tooltip>Eliminar Plan de Estudio</Tooltip>}>
                        <Button onClick={() => {
                            setDeleteModal(true)
                        }}
                            variant='danger'
                        ><AiFillDelete /></Button>
                        </OverlayTrigger>
                    </div>
                    <div className="pt-2">
                        <Button className='w-100' variant='secondary' onClick={() => setViewModal(true)}> Ver Enlaces </Button>
                    </div>
                </Card.Body>
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
                    <div className="table-scrollable">
                        <Table striped bordered hover size='sm' className=''>
                            <thead>
                                <tr>
                                    <th className='text-center'>Estado</th>
                                    <th className='text-center'>Titulo</th>
                                    <th className='text-center'>URL</th>
                                    <th className='text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    links.map(link => (
                                        (link.syllabus === selectedSyll._id &&
                                            <tr key={link._id}>
                                                <td className='text-center'>
                                                    {link.state === 1 && <IconContext.Provider value={{ size: "2em", style:{color:'17a086'} }}><AiOutlineCheckCircle /></IconContext.Provider>}
                                                    {link.state === 0 && <IconContext.Provider value={{ size: "2em", style:{color:'0f61aa'} }}><MdPending /></IconContext.Provider>}
                                                </td>
                                                <td>{link.title}</td>
                                                <td><a variant='link' key={link._id} href={link.link} target="_blank" rel="noreferrer">{link.link}</a></td>
                                                <td className='text-center'>
                                                    {
                                                        link.state === 1 &&
                                                        <OverlayTrigger placement='right' overlay={<Tooltip>Eliminar Enlace</Tooltip>}>
                                                            <Button variant='outline-danger' onClick={() => {
                                                            deleteLink(link._id)
                                                            setMsg(`Enlace ${link.link} eliminado correctamente`)
                                                            setToast(true)
                                                        }} className='me-2'><AiFillDelete /></Button>
                                                        </OverlayTrigger>
                                                    }
                                                    {
                                                        link.state === 0 &&
                                                        <div className="">
                                                            <OverlayTrigger placement='left' overlay={<Tooltip>Aceptar Enlace</Tooltip>}>
                                                            <Button variant='outline-success' onClick={() => {
                                                                changeState(link._id)
                                                                setMsg(`Enlace ${link.link} aceptado correctamente`)
                                                                setToast(true)
                                                            }} className='me-2'><MdCheck /></Button>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement='right' overlay={<Tooltip>Denegar Enlace</Tooltip>}>
                                                            <Button variant='outline-danger' onClick={() => {
                                                                deleteLink(link._id)
                                                                setMsg(`Enlace ${link.link} denegado correctamente`)
                                                                setToast(true)
                                                            }} className='me-2' ><MdClear /></Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>)
                                    ))
                                }
                            </tbody>
                        </Table>
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