import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import video from '../assets/video.mp4'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <video className='video'
        autoPlay
        loop
        muted>
        <source src={video} type="video/mp4"/>
      </video>
      <Container>
            <Row className='mt-5'>
                <Col > 
                <h1 style={{color:'#E02957'}}>Bienvenido WEBPPJ</h1>
                <h3 style={{color:'white'}}>Aquí puedes acceder a enlaces correspondientes a los distintos programas de estudios del Programa de Profesionales Jóvenes de ACL</h3>
                <p style={{color:'white'}}>Puedes ingresar a enlaces y sugerir los que creas útiles para cada programa</p>
                <div>
                    <Link to={'/users/login'} style={{color:'#E02957'}}>Ingresa aquí</Link> 
                </div>
                </Col>
                <Col>
                <img
                    className='img-fluid'
                    src="\img\task-manager(acl_color).svg"
                    alt="gestor-de-tareas"
                ></img>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Home