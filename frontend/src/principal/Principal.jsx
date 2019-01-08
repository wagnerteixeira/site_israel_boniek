import React, { Component } from 'react';
import './Principal.css';

import Fundo from '../media/images/fundo_site.jpg';

class Principal extends Component {
    render() {
        return (
            <div id="home" className="container-principal">
                <img className="image-bg" src={Fundo} alt="Principal" />                
            </div>        
        );
    }
}

export default Principal;

