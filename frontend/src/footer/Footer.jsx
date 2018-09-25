import React, { Component } from 'react';

import './Footer.css';
import Social from '../utils/Social';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Social />
                <br />                               
                <a>© 2018 Israel Boniek | Desenvolvido por </a>
                <a href="https://www.facebook.com/sanyecaroline" target="_blank" without rel="noopener noreferrer">Sanye Caroline</a>
                <a> / </a>
                <a href="https://www.facebook.com/digite.meu.nome" target="_blank" without rel="noopener noreferrer">Wagner Teixeira</a>                
            </div>
        );
    }
}

export default Footer;

