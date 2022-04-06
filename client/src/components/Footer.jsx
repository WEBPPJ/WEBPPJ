import React from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import { IconContext } from 'react-icons'

const Footer = () => {
  return (
    <footer className='container'>
        <span className='text-white'>Contactanos</span>
        <div className="row socialmedia">
        <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
            <div className="social">
                <a href="https://www.aclti.com" target="_blank" rel="noreferrer"><BiWorld/></a>
            <div className="social">
                <a href="https://www.facebook.com/aclconsultores/" target="_blank" rel="noreferrer"><FaFacebookF/></a>
            </div>
            </div>
            <div className="social">
                <a href="https://www.linkedin.com/company/acltecnologia/" target="_blank" rel="noreferrer"><FaLinkedinIn/></a>
            </div>
        </IconContext.Provider>
        </div>
    </footer>
  )
}

export default Footer