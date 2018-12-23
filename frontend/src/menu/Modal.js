import React, { Component } from "react";
import { Link } from "react-scroll";

import "./Modal.css";
import CloseImage from '../media/images/close.svg';

const Modal = ({ handleClose, show, children, sinopsys, urlFolder }) => {
  const showHideClassName = show ? "modal-menu display-block" : "modal-menu display-none";

  return (
    <div className={showHideClassName}>  
        <div className="modal-main-menu">
            <button className="md-close-menu" onClick={handleClose}>
                <img src={CloseImage}/>                
            </button>   
            <div>
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
                onClick={handleClose}
              >
                HOME
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="aboutMe"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                SOBRE
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="publication"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                PUBLICAÇÕES
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="event"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                EVENTOS
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="lecture"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                PALESTRAS
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="image"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                FOTOS
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="video"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                VIDEOS
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="fides"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                FIDES
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                CONTATO
              </Link>
            </div>
            <div>
              <Link
                activeClass="active"
                to="partner"
                spy={true}
                smooth={true}
                offset={-10}
                duration={1000}
                onClick={handleClose}
              >
                PARCEIROS
              </Link>
            </div>
        </div>
    </div>    
  );
};

export default Modal;
