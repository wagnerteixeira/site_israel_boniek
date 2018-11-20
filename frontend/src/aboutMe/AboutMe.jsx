import React, { Component } from 'react';
import Text from '../utils/Text';
import Globals from '../utils/Globals';
import './AboutMe.css';

class AboutMe extends Component {
    render() {
        return (  
            <div id="aboutMe">
            <div className="aboutMe">
                <Text title="Sobre Mim">
                    <h3 >
                        {Globals.about.title}
                    </h3>
                    <div />
                    <p className="subtitleContainerAbout">
                        {Globals.about.subtitle}
                    </p>                    
                    <p className="textContainerAbout">
                        {Globals.about.text}
                    </p>                    
                </Text>
            </div>   
            </div>                      
        );
    }
}

export default AboutMe;
