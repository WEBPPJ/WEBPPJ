import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { FcIdea } from 'react-icons/fc'

const syllabusData = [
    {
        _id: 123131223,
        name: 'MERN',
    },
    {
        _id: 123133421223,
        name: 'SpringBoot',
    },
]
const linksData = [
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

const SyllabusUsers = () => {

    const [syllabus, setSyllabus] = useState(syllabusData)
    const [links, setLinks] = useState(linksData)
    const [viewModal, setViewModal] = useState(false)
    const [selectedSyll, setSelectedSyll] = useState({})

    return (
        <Container className='p-4'>
            <Row>
                {
                    syllabus.length === 0
                        ? (
                            <Alert variant='primary'>Actualmente no hay planes de Estudio</Alert>
                        )
                        :
                        (
                            syllabus.map((element) => (
                                <Col key={element._id} md="3" className='mb-4'>
                                    <Card className='animate__animated animate__zoomIn animate__delay-0.5s syllCard'>
                                        <Card.Body>
                                            <div className="d-flex bd-highlight">
                                                <Card.Title className='me-auto p-2 bd-highlight'>{element.name}</Card.Title>
                                            </div>
                                            <div className="pt-2">
                                                <Button onClick={() => {
                                                    setSelectedSyll(element)
                                                    setViewModal(true)}} className='w-100' variant='secondary'>Ver Enlaces</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )
                }
            </Row>

            {/*Modal de Ver Enlaces */}
            <Modal show={viewModal} dialogClassName="view-modal" scrollable={true}>
            <Modal.Header>
                    <div>
                        <h3>{selectedSyll.name}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                    <h5 className="">
                        Enlaces Disponibles
                    </h5>
                    <Button variant='info'>¿Tienes alguna sugerencia? Añadela <FcIdea/></Button>
                    </div>
                    <div className="d-flex align-items-start flex-column bd-highlight mb-3">
                    {
                        links.length === 0
                        ? (
                            <Alert variant='primary'>Sin enlaces</Alert>
                        )
                        : (
                            (links).map(link => (
                                ((link.syllabus === selectedSyll._id) && (link.state === 1 && <div className='p-2 bd-highlight'>
                                <a className='me-auto p-2 bd-highlight' variant='link' key={link._id} href={link.link} target="_blank" rel="noreferrer">{link.link}</a>
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

        </Container>
    )
}

export default SyllabusUsers