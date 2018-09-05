import React, { PureComponent } from 'react';
import { css } from 'glamor';

import VideoPlayer from './VideoPlayer'
import Text from './Text'
import Logo from './Logo'

import Globals from '../utils/Globals'
import './section1.css'

import Fundo from '../media/images/fundo.jpg'

const styles = {
    container : css({
        background: Globals.colors.transparent,
        color: Globals.colors.primary,
        width: '100%',
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100vh',
        justifyContent: 'space-between',  
    }),
    imageBg : css({
        backgroundImage: `url(${Fundo})`,
        backgroundRepeat: 'no-repeat',
        /*animation: '60s ease 0s normal none infinite back_animation',*/
        animationName: 'back_animation',
        animationDuration: '60s',
        animationTimingFunction: 'ease',
        animationDelay: '0s',
        animationIterationCount: 'infinite',
        animationDirection: 'normal',
        animationFillMode: 'none',
        animationPlayState: 'running',
        backgroundPosition: 'center center',
        height: '100vh',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    })
}

class Section1 extends PureComponent {
    state = {  }
    render() {
        return (
            <div {...styles.container}>
                <div className='image-bg' style={{backgroundImage: `url(${Fundo})`,}}></div>
                <Text />
            </div>
        )
    }
}

export default Section1