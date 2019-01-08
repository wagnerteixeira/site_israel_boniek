import React, { Component } from 'react';
import './Partner.css';
import Text from '../utils/Text';

import Fundo from '../media/images/partner.jpg';

class Partner extends Component {
    render() {
        return (
          <div id="partner" className="container-partner">
              <Text title="Parceiros">
                  <div style={{ backgroundImage: `url(${Fundo})`}} className='div-bg-partner'>
                      {/*<img src={Fundo} className="image-bg-partner" alt="Parceiros" />*/}
                  </div>
              </Text>                                    
          </div>                
            
        );
    }
}

export default Partner;

