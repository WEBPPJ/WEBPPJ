import React from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='p-2'>
            <div className="d-flex justify-content-start">
            <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>

            <div className="svg">
                <OverlayTrigger placement='top' overlay={<Tooltip>Sitio Web Oficial</Tooltip>}><a href="https://www.aclti.com" target="_blank" rel="noreferrer"><BiWorld /></a></OverlayTrigger>
            </div>
            <div className="svg">
                <OverlayTrigger placement='top' overlay={<Tooltip>Facebook</Tooltip>}><a href="https://www.facebook.com/aclconsultores/" target="_blank" rel="noreferrer"><FaFacebookF /></a></OverlayTrigger>
            </div>
            <div className="svg">
                <OverlayTrigger placement='top' overlay={<Tooltip>Linkedin</Tooltip>}><a href="https://www.linkedin.com/company/acltecnologia/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a></OverlayTrigger>
            </div>
            </IconContext.Provider>
        </div>
        </footer>
    )
}

export default Footer