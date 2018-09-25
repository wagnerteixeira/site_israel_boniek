import React, { Component } from 'react'

import './Footer.css'
import Social from '../utils/Social';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Social/>
                <br />                               
                <a>© 2018 Israel Boniek | Desenvolvido por </a>
                <a href="https://www.facebook.com/sanyecaroline" target="_blank">Sanye Caroline</a>
                <a> / </a>
                <a href="https://www.facebook.com/digite.meu.nome" target="_blank">Wagner Teixeira</a>                
            </div>
        )
    }
}


