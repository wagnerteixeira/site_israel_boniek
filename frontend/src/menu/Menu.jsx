import React, { Component } from 'react';
import { Link } from "react-scroll";

import './Menu.css';

import Modal from './Modal';


class Menu extends Component {
    constructor(props){
        super(props);
        this.state = { 
            show: false, 
            };      
    }

    showModal = () => {      
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };
  
    render() {
        return (
            <div className="flex-container" >
                <button className="button-menu" onClick={() => this.showModal()}>☰</button> 
                <div className="navbar">
                  <Link
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={1000}
                  >
                    HOME
                  </Link>
                  <Link
                    activeClass="active"
                    to="aboutMe"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    SOBRE
                  </Link>
                  <Link
                    activeClass="active"
                    to="publication"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    PUBLICAÇÕES
                  </Link>
                  <Link
                    activeClass="active"
                    to="event"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    EVENTOS
                  </Link>
                  <Link
                    activeClass="active"
                    to="lecture"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    PALESTRAS
                  </Link>
                  <Link
                    activeClass="active"
                    to="image"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    FOTOS
                  </Link> 
                  <Link
                    activeClass="active"
                    to="video"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    VIDEOS
                  </Link>
                  <Link
                    activeClass="active"
                    to="fides"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    FIDES
                  </Link>                  
                  <Link
                    activeClass="active"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-10}
                    duration={1000}
                  >
                    CONTATO
                  </Link>
                  <Link
                    activeClass="active"
                    to="partner"
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={1000}
                  >
                    PARCEIROS
                  </Link>
                </div>                 
                <Modal 
                    show={this.state.show} 
                    handleClose={this.hideModal} 
                >                                   
                </Modal>              
            </div>
        );
    }
}

export default Menu;
