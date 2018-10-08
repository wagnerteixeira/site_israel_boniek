import React, { Component } from "react";

import "./Modal.css";
import CloseImage from '../media/images/close.svg';

const Modal = ({ handleClose, show, children, sinopsys, urlFolder }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
        <section className="modal-main">
            <div className="avatar">
                <img width="103" 
                    height="103" 
                    src={urlFolder}                    
                    alt={children}                    
                    />
            </div>
            <div className="modal-title">
                <strong>{children}</strong>                
            </div>
            <div className="modal-text">
                {sinopsys}
            </div>
            <button className="md-close" onClick={handleClose}>
                <img src={CloseImage}/>                
            </button>            
      </section>
    </div>
  );
};

export default Modal;
