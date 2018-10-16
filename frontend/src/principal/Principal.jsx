import React, { Component } from 'react';
import './Principal.css';

import Fundo from '../media/images/fundo_1024.jpg';
//import Pattern from '../media/images/bg_pattern.png';
import Nome from '../media/images/nome.svg';
import withSection from '../hoc/withSection';

class Principal extends Component {
    render() {
        return (
            <div id="home" className="container-principal">
                <img className="image-overlay" src={Nome}/>
                <div className="image-bg" style={{ backgroundImage: `url(${Fundo})` }} />
            </div>        
        );
    }
}

export default withSection(Principal);

