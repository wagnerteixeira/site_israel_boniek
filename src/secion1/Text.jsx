import React, { PureComponent } from 'react';
import { css } from 'glamor';

const styles = {
    container : css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minWidth: '100%',
        fontSize : '80px',        
        '> .left' : {
            textAlign: 'right',
            color : 'red',
            marginRight : '2px'
        },
        '> .right' : {
            color: 'black',
            marginLeft : '2px',            
        }
        
    }),
    text : css({
        width: '50%',
        minWidth: '50%',       
    })
}

class Text extends PureComponent {
    state = {  }
    render() {
        return (
            <div {...styles.container}>
                <div className='left' {...styles.text}>
                    Israel
                </div>
                <div className='right' {...styles.text}>
                    Boniek
                </div>
            </div>
        )
    }
}

export default Text