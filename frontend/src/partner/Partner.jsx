import React, { Component } from 'react';
import './Partner.css';
import Text from '../utils/Text';

import Fundo from '../media/images/partner.jpg';

class Partner extends Component {
    render() {
        return (
            <div id="partner">
            <div className="container-partner">
                <Text title="Parceiros">
                    <div />                    
                    <div >
                        <img src={Fundo} className="image-bg-partner" />
                    </div>
                    </Text>                                    
            </div>                
            </div>        
        );
    }
}

export default Partner;

