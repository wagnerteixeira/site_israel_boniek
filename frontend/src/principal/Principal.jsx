import React, { Component } from 'react';
import './Principal.css';

import Fundo from '../media/images/fundo.jpg';
import Pattern from '../media/images/bg_pattern.png';
import withSection from '../hoc/withSection';

class Principal extends Component {
    render() {
        return (
            <div id="home" className="container-principal">
                <div className="image_overlay" style={{ backgroundImage: `url(${Pattern})` }} />
                <div className="image-bg" style={{ backgroundImage: `url(${Fundo})` }} />
            </div>        
        );
    }
}

export default withSection(Principal);

