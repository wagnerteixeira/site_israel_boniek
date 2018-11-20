import React, { Component } from 'react';

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
                    <a href="#home">HOME</a>
                    <a href="#aboutMe">SOBRE MIM</a>                    
                    <a href="#publication">PUBLICAÇÕES</a>                    
                    <a href="#event">EVENTOS</a>
                    <a href="#lecture">PALESTRAS</a>                    
                    <a href="#image">FOTOS</a>
                    <a href="#video">VIDEOS</a>     
                    <a href="#fides">FIDES EDUCACIONAL</a>               
                    <a href="#contact">CONTATO</a>               
                    <a href="#partner">PARCEIROS</a>               
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
