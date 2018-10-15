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
                <div className="navbar">
                    <a href="#home">HOME</a>
                    <a href="#fides">FIDES EDUCACIONAL</a>
                    <a href="#lecture">PALESTRAS</a>
                    <a href="#publication">PUBLICAÇÕES</a>                    
                    <a href="#image">FOTOS</a>
                </div>
                <button className="button-menu" onClick={() => this.showModal()}>☰</button>  
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
