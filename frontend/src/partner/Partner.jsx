import React, { Component } from 'react';
import './Partner.css';
import Text from '../utils/Text';

import Fundo from '../media/images/partner.jpg';

class Partner extends Component {
    render() {
        return (
            <div id="partner" className="container-partner">
                <img className="image-bg-partner" src={Fundo}/>                                
            </div>        
        );
    }
}

export default Partner;

