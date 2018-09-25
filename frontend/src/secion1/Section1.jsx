import React, { Component } from 'react';
import { css } from 'glamor';

import Globals from '../utils/Globals';
import './section1.css';

import Fundo from '../media/images/fundo.jpg';
import Pattern from '../media/images/bg_pattern.png';
import withSection from '../hoc/withSection';

const styles = {
    container: css({
        background: Globals.colors.transparent,
        color: Globals.colors.primary,
        width: '100%',        
        height: '100%', 
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',               	                
    }),
    imageBg: {
        animation: '60s ease 0s normal none infinite back_animation',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        position: 'absolute',	
        zIndex: -999999,
        backgroundImage: `url(${Fundo})`
    }
};

class Section1 extends Component {
    state = {}
    render() {
        return (
            <div id="home" {...styles.container}>
                <div className="image_overlay" style={{ backgroundImage: `url(${Pattern})` }} />
                <div style={styles.imageBg} />
            </div>        
        );
    }
}

export default withSection(Section1);
