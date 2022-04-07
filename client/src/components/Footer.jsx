import React from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import { IconContext } from 'react-icons'

const Footer = () => {
  return (
    <footer className='text-start'>
        {/* <div className="mx-4">
            <div>
            <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
            <div className="svg">
            </div>
            </IconContext.Provider>
            </div>
        </div> */}
        <div className="container">
  <div className="row align-items-start">
        <span className='text-white'>Contactanos</span>
        <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
    <div className="col-1">
        <div className="svg">
        <a href="https://www.aclti.com" target="_blank" rel="noreferrer"><BiWorld/></a>
        </div>
    </div>
    <div className="col-1">
        <div className="svg">
        <a href="https://www.facebook.com/aclconsultores/" target="_blank" rel="noreferrer"><FaFacebookF/></a>
        </div>
    </div>
    <div className="col-1">
        <div className="svg">
    <a href="https://www.linkedin.com/company/acltecnologia/" target="_blank" rel="noreferrer"><FaLinkedinIn/></a>
        </div>
    </div>
        </IconContext.Provider>
  </div>
  </div>
    </footer>
  )
}

export default Footer