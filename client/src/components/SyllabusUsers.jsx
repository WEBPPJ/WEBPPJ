import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { FcIdea } from 'react-icons/fc'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";

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

const SyllabusUsers = () => {

    const [syllabus, setSyllabus] = useState(syllabusData)
    const [links, setLinks] = useState(linksData)
    const [viewModal, setViewModal] = useState(false)
    const [suggestModal, setSuggestModal] = useState(false)
    const [selectedSyll, setSelectedSyll] = useState({})

    return (
        <Container className='p-4'>
            {
                (syllabus.length === 0 || !syllabus) && <Alert variant='primary'>Actualmente no hay planes de Estudio</Alert>
            }
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={true}
                rewind={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    syllabus.length > 0 && (
                        syllabus.map((element) => (
                            <SwiperSlide key={element._id}>
                                <Card className='userCard text-white position-relative'>
                                    <Card.Body>
                                        <div className="d-flex bd-highlight">
                                            <Card.Title className='me-auto p-2 bd-highlight'>{element.name}</Card.Title>
                                            <Card.Subtitle>Plan de Estudio ACL</Card.Subtitle>
                                        </div>
                                    </Card.Body>
                                        <div className="pb-4 position-absolute bottom-0 start-50 translate-middle-x">
                                            <Button onClick={() => {
                                                setSelectedSyll(element)
                                                setViewModal(true)
                                            }} className='w-100' variant='secondary'>Ver Enlaces</Button>
                                        </div>
                                </Card>
                            </SwiperSlide>
                        ))
                    )
                }
            </Swiper>

            {/*Modal de Ver Enlaces */}
            {/*TODO: Que se agrege el enlace */}
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
                        <Button onClick={() => {
                            setSuggestModal(true)
                            setViewModal(false)
                        }}
                            variant='info'>¿Tienes alguna sugerencia? Añadela <FcIdea /></Button>
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
                                            <a className='me-auto p-2 bd-highlight' variant='link' key={link._id} href={link.link} target="_blank" rel="noreferrer">{link.title}</a>
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

            {/*Modal de Sugerencia */}
            <Modal show={suggestModal}>
                <Modal.Header>
                    <div>
                        <h3>Sugerencia para {selectedSyll.name}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Enlace</label>
                        <input
                            className="form-control"
                            type="url"
                            name="link"
                        />
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                    >
                        Sugerir
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => {
                            setSuggestModal(false)
                            setViewModal(true)
                        }}
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default SyllabusUsers