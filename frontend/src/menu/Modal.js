import React, { Component } from "react";

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
            <div><a href="#home" onClick={handleClose}>HOME</a> </div>
            <div><a href="#fides" onClick={handleClose}>FIDES EDUCACIONAL</a> </div>
            <div><a href="#lecture" onClick={handleClose}>PALESTRAS</a> </div>
            <div><a href="#publication" onClick={handleClose}>PUBLICAÇÕES</a> </div>
            <div><a href="#image" onClick={handleClose}>FOTOS</a> </div>
        </div>
    </div>    
  );
};

export default Modal;
