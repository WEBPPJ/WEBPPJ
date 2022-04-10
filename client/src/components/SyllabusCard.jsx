import React, { useState } from 'react'
import { Button, Card, Col, Modal } from 'react-bootstrap'
import { MdModeEdit } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import 'animate.css';

const SyllabusCard = ({ syllabus, deleteSyll }) => {

    const [deleteModal, setDeleteModal] = useState(false)

    return (
        <Col md="3" className='mb-4'>
            <Card className='animate__animated animate__fadeInDown'>
                {/* Forma 1 */}
                <Card.Body>
                    <div className="d-flex bd-highlight">
                        <Card.Title className='me-auto p-2 bd-highlight'>{syllabus.name}</Card.Title>
                        <Button variant='success' className='me-2 cardButton'><AiFillEye /></Button>
                        <Button><MdModeEdit /></Button>
                    </div>
                    <div className="pt-2">
                        <Button className='w-100' variant='danger' onClick={() => setDeleteModal(true)}> Eliminar </Button>
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
                    Estás Seguro que deseas eliminar el plan de Estudio '{syllabus.name}'
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteSyll(syllabus._id)
                            setDeleteModal(false)
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
        </Col>
    )
}

export default SyllabusCard