import React, { Component } from 'react';
import './Footer.css';

import baseService from '../services/baseService';

const counterService = baseService('counter');

class Footer extends Component {
    state = {
        counter: '',
    }
    fetchCounter = () => {           
        counterService.getDocs()
          .then(documents => {               
            this.setState({ counter: documents[0].data.counter });            
            documents[0].data.counter = documents[0].data.counter + 1;
            counterService.updateDoc(documents[0]);            
          })
          .catch(error => console.log(error));
    }

    componentWillMount(){
        this.fetchCounter();
    }

    render() {        
        return (
            <div className="footer" >                   
                <a>Desenvolvido por </a>
                <a href="https://www.facebook.com/sanyecaroline" target="_blank" without rel="noopener noreferrer">Sanye Caroline</a>
                <a> / </a>
                <a href="https://www.facebook.com/digite.meu.nome" target="_blank"  without rel="noopener noreferrer">Wagner Teixeira</a>                
                <br />
                <a>Visitantes: {this.state.counter}</a>
                <br />                          
            </div>
        );
    }
}

export default Footer;

