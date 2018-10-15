import React, { Component } from 'react';

import './Footer.css';
import Social from '../utils/Social';
import Phone from '../media/images/phone.svg';
import Email from '../media/images/email.svg';

class Footer extends Component {
    render() {
        return (
            <div className="footer" >                
                <h2>Contato</h2>
                <img src={Email}/>
                <a>boniekmg@yahoo.com.br</a>
                <br/>
                <img src={Phone}/>
                <a>(49) 99957-6584</a>
                <Social />   
                <a>Desenvolvido por </a>
                <a href="https://www.facebook.com/sanyecaroline" target="_blank" without rel="noopener noreferrer">Sanye Caroline</a>
                <a> / </a>
                <a href="https://www.facebook.com/digite.meu.nome" target="_blank" without rel="noopener noreferrer">Wagner Teixeira</a>                
                <br />                                                        
            </div>
        );
    }
}

export default Footer;

