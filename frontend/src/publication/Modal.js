import React, { Component } from "react";

import "./Modal.css";
import CloseImage from '../media/images/close.svg';

const Modal = ({ handleClose, show, children, sinopsys, urlImage }) => {
  const showHideClassName = show ? "modal-pub display-block" : "modal-pub display-none";

  return (
    <div className={showHideClassName}>
        <section className="modal-main-pub">
            <div className="avatar-pub">
                <img src={urlImage}                    
                    alt={children}                    
                    />
            </div>
            <div className="modal-title-pub">
                <strong>{children}</strong>                
            </div>
            <div className="modal-text-pub">
                {sinopsys}
            </div>
            <button className="md-close-pub" onClick={handleClose}>
                <img src={CloseImage}/>                
            </button>            
      </section>
    </div>
  );
};

export default Modal;
