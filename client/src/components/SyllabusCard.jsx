import React, { useState } from 'react'
import { Button, Card, Col, Modal, OverlayTrigger, Table, Toast, ToastContainer, Tooltip } from 'react-bootstrap'
import { MdModeEdit, MdClear, MdCheck, MdPending } from 'react-icons/md'
import { AiFillDelete, AiOutlineCheckCircle } from 'react-icons/ai'
import 'animate.css';
import { IconContext } from 'react-icons/lib'
import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';

const SyllabusCard = ({ syllabus,remove }) => {

    const [links, setLinks] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [selectedSyll, setSelectedSyll] = useState(syllabus)
    const [toast, setToast] = useState(false)
    const [msg, setMsg] = useState('')
    
    useEffect(()=>{
            loadLinks()
        
    },[viewModal.links])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSelectedSyll((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    
    const onUpdate = async (e) => { 
    e.preventDefault();
    if(selectedSyll.newTitle==="" || selectedSyll.newTitle==undefined){
        setMsg("Ingrese un nombre")
        setToast(true)
    }else{
        const _id=selectedSyll._id
        const title=selectedSyll.newTitle
        const syllabus={_id,title}
        
        await axios
        .post("http://localhost:3001/api/syllabus/update", syllabus)
        .then((res) => {
            const { data } = res;
            setTimeout(() => {
                setEditModal(false)
                selectedSyll.title=selectedSyll.newTitle
                setMsg(`Plan ${selectedSyll.title} editado correctamente`)
                setToast(true)
                
            }, 1500);
            })
            .catch((error) => {
            console.error(error);
            setMsg(error.response.data.msg)
            setToast(true)
            setTimeout(() => {
                
            }, 1500);
            }); 
        }
    };
    

    const loadLinks = useCallback(async () => {
        await axios.get('http://localhost:3001/api/links/all')
        .then((res) => {
            const { data } = res;
            setTimeout(() => {
              setLinks(data)
              
             
            }, 1500);
          })
    },[links])

    const activate = async (link) => {
        const _id=link._id
        const active=true
       
        const lnk={_id, active}
       
          await axios
            .post("http://localhost:3001/api/links/activate", lnk)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                console.log(data)
                loadLinks()
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
    };
    
    const unactivate = async (link) => {
        const _id=link._id
        const active=false
       
        const lnk={_id, active}
       
          await axios
            .post("http://localhost:3001/api/links/activate", lnk)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                console.log(data)
                loadLinks()
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
    };
 
    return (
        <Col md="3" className='mb-4'>
            <Card className='animate__animated animate__fadeInDown syllCard'>
                <Card.Body>
                    <div className="d-flex bd-highlight">
                        <Card.Title className='me-auto p-2 bd-highlight'>{selectedSyll.title}</Card.Title>
                        <OverlayTrigger placement='top' overlay={<Tooltip>Editar plan de estudio</Tooltip>}>
                        <Button onClick={() => {
                            setEditModal(true)
                        }}
                            className='me-2 cardButton'><MdModeEdit /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement='top' overlay={<Tooltip>Eliminar plan de estudio</Tooltip>}>
                        <Button onClick={() => {
                            setDeleteModal(true)
                        }}
                            variant='danger'
                        ><AiFillDelete /></Button>
                        </OverlayTrigger>
  
                    </div>
                    <div className="pt-2">

                        <Button className='w-100' variant='secondary' onClick={() => setViewModal(true)}> Ver enlaces </Button>
                    </div>
                </Card.Body>
            </Card>
            {/*Modal de Eliminar */}
            <Modal show={deleteModal}>
                <Modal.Body>
                    Estás seguro de que deseas eliminar el plan de estudio '{selectedSyll.title}'
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={(e) => {
                            remove(e, selectedSyll._id)
                            setDeleteModal(false)
                            //! El toast no se muestra por la funcion de eliminar, ya que si se comenta, se puede ver que se genera bien, estoy trabajando en ello
                            setMsg(`Plan ${selectedSyll.title} eliminado correctamente`)
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
                        <h3>Editar plan de estudio</h3>
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
                            name="title"
                            value={selectedSyll && selectedSyll.title}
                            onChange={handleChange}
                            readOnly
                        />
                        <br />
                        <label>Nuevo nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="newTitle"
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={(e) => {
                            onUpdate(e)
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
                        <h3>{selectedSyll.title}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-scrollable">
                        <Table striped bordered hover size='sm' className=''>
                            <thead>
                                <tr>
                                    <th className='text-center'>Estado</th>
                                    <th className='text-center'>Título</th>
                                    <th className='text-center'>URL</th>
                                    <th className='text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    links.map(link => (
                                        (link.plan_id === selectedSyll._id &&
                                            <tr key={link._id}>
                                                <td className='text-center'>
                                                    {link.active === true && <IconContext.Provider value={{ size: "2em", style:{color:'17a086'} }}><AiOutlineCheckCircle /></IconContext.Provider>}
                                                    {link.active === false && <IconContext.Provider value={{ size: "2em", style:{color:'0f61aa'} }}><MdPending /></IconContext.Provider>}
                                                </td>
                                                <td>{link.title}</td>
                                                <td><a variant='link' key={link._id} href={link.link} target="_blank" rel="noreferrer">Ingresa aquí</a></td>
                                                <td className='text-center'>
                                                    {
                                                        link.active? (
                                                        <OverlayTrigger placement='right' overlay={<Tooltip>Eliminar enlace</Tooltip>}>
                                                        <Button variant='outline-danger' onClick={() => {
                                                            setMsg(`Enlace ${link.link} eliminado correctamente`)
                                                            setToast(true)
                                                        }} className='me-2'><AiFillDelete /></Button>
                                                        </OverlayTrigger>):(
                                                            <div className="">
                                                            <OverlayTrigger placement='left' overlay={<Tooltip>Aceptar enlace</Tooltip>}>
                                                            <Button variant='outline-success' onClick={() => {
                                                                activate(link)
                                                                setMsg(`Enlace ${link.link} aceptado correctamente`)
                                                                setToast(true)
                                                            }} className='me-2'><MdCheck /></Button>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement='right' overlay={<Tooltip>Denegar enlace</Tooltip>}>
                                                            <Button variant='outline-danger' onClick={() => {
                                                                unactivate(link)
                                                                setMsg(`Enlace ${link.link} denegado correctamente`)
                                                                setToast(true)
                                                            }} className='me-2' ><MdClear /></Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                        )
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