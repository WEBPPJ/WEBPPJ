import React from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='text-start'>
            <Container>
                <Row className="align-items-start">
                    <span className='text-white'>Contactanos</span>
                    <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
                        <Col xs={1}>
                            <div className="svg">
                                <a href="https://www.aclti.com" target="_blank" rel="noreferrer"><BiWorld /></a>
                            </div>
                        </Col>
                        <Col xs={1}>
                            <div className="svg">
                                <a href="https://www.facebook.com/aclconsultores/" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                            </div>
                        </Col>
                        <Col xs={1}>
                            <div className="svg">
                                <a href="https://www.linkedin.com/company/acltecnologia/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
                            </div>
                        </Col>
                    </IconContext.Provider>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer