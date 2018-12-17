import React, { Component } from 'react';
import Text from '../utils/Text';
import Globals from '../utils/Globals';
import './ContactMe.css';
import firebase  from '../firebase'
const sendEmail = firebase.functions.httpsCallable('sendEmail');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class ContactMe extends Component {
  state ={
    name: '',
    phone: '',
    email:'', 
    text: '', 
    valid: true,
    message: '',
    showingMessage: false,

  }

  hideSuccessMessage = () =>{
    this.setState({...this.state, showingMessage: false});  
  }

  handleSendEmail = () => {
    let html = `<b>Nome:</b> ${this.state.name} <br /><b>Email:</b> ${this.state.email} <br /><b>Telefone:</b> ${this.state.phone}<br /><b>Mensagem:</b><br />${this.state.text.replace(/\r?\n/gi, '<br />')}`
    let email = {
      to: Globals.email,
      subject: `Email enviado do site por ${this.state.name}`,
      text: '',
      html: html,
    };
    sendEmail(email)
     .then((result) => {
      // Read result of the Cloud Function.
      console.log(result);
      if (result.data.status === 'OK'){
        this.setState({name: '', phone: '', email:'', text: '', valid: true, message: 'Mensagem enviada com sucesso!', showingMessage: true});
        setTimeout(this.hideSuccessMessage, 2000);
      }
      else {
        this.setState({message: `Houve um erro ao enviar o email, tente novamente ou entre em contato pelo email: ${Globals.email}` , showingMessage: true});
      }
    }).catch((error) => {
      // Getting the Error details.
      console.log(error)      
      this.setState({message: `Houve um erro ao enviar o email, tente novamente ou entre em contato pelo email: ${Globals.email}` , showingMessage: true});
      // ...
    });
    
  }

  handleValueChange = name => event => {     
    if (name === 'email') {
      let valid = false;
      console.log(emailRegex.test)
      if (this.state.email.length === 0)
        valid = true;
      else if (emailRegex.test(this.state.email.toLowerCase())) 
        valid = true
      else 
        valid = false;
      
      this.setState({...this.state, valid: valid, [name]: event.target.value});
    }
    else
      this.setState({...this.state, [name]: event.target.value});
  };
  
  render() {    
      return (  
          <div id="contact" className="contact-me">
            <div className="title-contact-me">
              <Text title="Contato"/>            
              </div>    

            <div className='container-contact-me'>
              <h4>
                  Preencha o formulário abaixo para entrar em contato.
              </h4>               
              <label htmlFor="name">Nome</label>
              <br />
              <input 
                type="text" 
                id="name" 
                size="80" 
                required 
                value={this.state.name}
                onChange={this.handleValueChange('name')} 
                className={`input input-normal`}
                placeholder="Digite seu nome"
              />      
              <br />          
              <br />
              <label htmlFor="email">Email</label>
              <br />  
              <input 
                type="text" 
                id="email" 
                size="80" 
                required 
                value={this.state.email}
                onChange={this.handleValueChange('email')} 
                className={`input ${this.state.valid ? 'input-normal' : 'input-error'}`}
                placeholder="exemplo@email.com"
              />          
              <br />          
              <br />              
              <label htmlFor="phone">Telefone</label>
              <br />  
              <input 
                type="text" 
                id="phone" 
                size="80" 
                required 
                value={this.state.phone}
                onChange={this.handleValueChange('phone')} 
                className={`input input-normal`}
                placeholder="(99) 99999-9999"
              />      
              <br />
              <br />
              <label htmlFor="message">Mensagem</label>
              <br />
              <textarea 
                id="message" 
                cols="80" 
                rows="8" 
                required 
                value={this.state.text}
                className='text-area-contact-me'
                onChange={this.handleValueChange('text')} 
                placeholder="Digite sua mensagem aqui">
              </textarea>
              <br />
              <input type='button' onClick={() => this.handleSendEmail()} className='button-contact-me' value='Enviar' />       
              &nbsp;&nbsp;<label className={this.state.showingMessage ? '' : 'display-none-contact-me'}>{this.state.message}</label>          
            </div>   
            
          </div>                      
      );
  }
}

export default ContactMe;
