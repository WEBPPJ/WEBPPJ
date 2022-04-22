import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { FcIdea } from 'react-icons/fc'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import 'animate.css';
import { useEffect } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

const SyllabusUsers = () => {

    const [syllabus, setSyllabus] = useState([])
    const [links, setLinks] = useState([])
    const [viewModal, setViewModal] = useState(false)
    const [suggestModal, setSuggestModal] = useState(false)
    const [selectedSyll, setSelectedSyll] = useState({})
    const [newLink, setNewLink]=useState()
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewLink((prevState) => ({
          ...prevState,
          [name]: value
        }))
      }

    useEffect(()=>{
        loadSyllabus()
    },[])
    useEffect(()=>{
        loadLinks()
    },[])
    
    const loadSyllabus =  async () => {

        await axios.get('http://localhost:3001/api/syllabus/all')
        .then((res) => {
          const { data } = res;
          setTimeout(() => {
            setSyllabus(data)
            setIsLoading(false)
           
          }, 500);
        })
    }
    const loadLinks = async () => {
        await axios.get('http://localhost:3001/api/links/all')
        .then((res) => {
            const { data } = res;
            setTimeout(() => {
              setLinks(data)
              
             
            }, 500);
          })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const link=newLink.link
        const title=newLink.title
        const plan_id=selectedSyll._id
        const req={
            link,
            title,
            plan_id
        }
        console.log(req)
          await axios
            .post("http://localhost:3001/api/links", req)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                console.log(req)
                setSuggestModal(false)
                
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
          
        
      }
     

    return (
        <Container className='p-4'>
            {
                isLoading
                ? (<LoadingSpinner/>)
                :(
                    ((syllabus.length === 0 || !syllabus) 
                    ? (<Alert variant='primary'>Actualmente no hay planes de Estudio</Alert>)
                    :(<Swiper
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
                                        <Card className='userCard text-white position-relative animate__animated animate__zoomIn'>
                                            <Card.Body>
                                                <div className="d-flex bd-highlight">
                                                    <Card.Title className='me-auto p-2 bd-highlight'>{element.title}</Card.Title>
                                                    <Card.Subtitle>Plan de Estudio ACL</Card.Subtitle>
                                                </div>
                                                <div className="pb-4 position-absolute bottom-0 start-50 translate-middle-x">
                                                    <Button onClick={() => {
                                                        setSelectedSyll(element)
                                                        setViewModal(true)
                                                    }} className='w-100' variant='secondary'>Ver Enlaces</Button>
                                                </div>
                                                <img
                                                    className='img-fluid position-absolute top-50 start-50 translate-middle'
                                                    src="\img\syllabus_logo.svg"
                                                    alt="syllabus"
                                                ></img>
                                            </Card.Body>
                                        </Card>
                                    </SwiperSlide>
                                ))
                            )
                        }
                    </Swiper>)
                    )
                )
            }
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
                                        ((link.plan_id === selectedSyll._id) && (link.active = true && <div className='p-2 bd-highlight'>
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
                        <h3>Sugerencia para {selectedSyll.title}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                        <label>Título</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                    <div className="form-group">
                        <label>Enlace</label>
                        <input
                            className="form-control"
                            type="url"
                            name="link"
                            onChange={handleChange}

                        />
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    onClick={(e) => {
                        onSubmit(e)
                        setSuggestModal(false)
                        setViewModal(true)
                    }}
                        variant="success"
                    >
                        Sugerir
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={(e) => {
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