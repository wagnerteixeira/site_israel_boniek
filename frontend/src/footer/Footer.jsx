import React, { Component } from 'react';

import './Footer.css';
import Social from '../utils/Social';
import Phone from '../media/images/phone.svg';
import Email from '../media/images/email.svg';

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
                Contador: {this.state.counter}                                              
                <br />                          
            </div>
        );
    }
}

export default Footer;

