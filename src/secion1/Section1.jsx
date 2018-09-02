import React, { PureComponent } from 'react';
import { css } from 'glamor';

import VideoPlayer from './VideoPlayer'
import Text from './Text'
import Logo from './Logo'

import Globals from '../utils/Globals'

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
    })
}

class Section1 extends PureComponent {
    state = {  }
    render() {
        return (
            <div {...styles.container}>
                <VideoPlayer />               
                <Text />
            </div>
        )
    }
}

export default Section1