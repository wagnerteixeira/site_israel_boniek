import React, { Component } from 'react'

import './Footer.css'
import Social from '../utils/Social';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';


export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Social/>
                <br />                               
                <a>© 2016 Israel Boniek | Desenvolvido por </a>
                <a href="https://www.facebook.com/sanyecaroline">Sanye Caroline</a>
                <a> / </a>
                <a href="https://www.facebook.com/digite.meu.nome">Wagner Teixeira</a>                
            </div>
        )
    }
}


