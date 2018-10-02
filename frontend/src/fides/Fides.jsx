import React, { Component } from 'react';
import Text from '../utils/Text';
import Globals from '../utils/Globals';
import imgFides from '../media/images/fides.jpg';
import './Fides.css';

class Fides extends Component {
    render() {
        return (  
            <div>
            <div className="fides">
                <Text title="FIDES Educacional">
                    <h3 className="notranslate">
                        Abordagem educacional por Princípios
                    </h3>
                    <div />
                    <div className="imgContainer">
                        <img src={imgFides} alt="Fides Educacional" />
                    </div>
                    <p className="textContainer">
                        {Globals.fides.text}
                    </p>
                    <p className="subtitleContainer">
                        {Globals.fides.subtitle}
                    </p>
                    <p className="subtitleContainer">
                        {Globals.fides.email}
                    </p>
                </Text>
            </div>   
            </div>                      
        );
    }
}

export default Fides;
