import React, { Component } from 'react';

import './Menu.css';

class Menu extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="navbar">
                    <a href="#home">HOME</a>
                    <a href="#fides">FIDES EDUCACIONAL</a>
                    <a href="#lecture">PALESTRAS</a>
                    <a href="#publication">PUBLICAÇÕES</a>                    
                    <a href="#image">FOTOS</a>
                    <a href="#contact">CONTATO</a>
                </div>
            </div>
        );
    }
}

export default Menu;
