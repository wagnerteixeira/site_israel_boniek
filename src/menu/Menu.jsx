import React, { Component } from 'react'

import './Menu.css'

export default class Menu extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="navbar">
                    <a href="#home">HOME</a>
                    <a href="#news">FIDES EDUCACIONAL</a>
                    <a href="#news">PUBLICAÇÕES</a>
                    <a href="#news">FOTOS</a>
                    <a href="#contact">CONTATO</a>
                </div>
            </div>
        )
    }
}