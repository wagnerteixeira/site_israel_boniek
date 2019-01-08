import React, { Component } from 'react';
import Text from '../utils/Text';
import Globals from '../utils/Globals';
import './ContactMe.css';
import firebase  from '../firebase'
import Social from '../utils/Social';
import Phone from '../media/images/phone.svg';
import Email from '../media/images/email.svg';

const sendEmail = firebase.functions.httpsCallable('sendEmail');

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
              <div className='container-contact-me-div'>
                <h4>
                    Formulário de contato.
                </h4>               
                <label htmlFor="name">Nome</label>
                <br />
                <input 
                  type="text" 
                  id="name" 
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
                  required 
                  value={this.state.phone}
                  onChange={this.handleValueChange('phone')} 
                  className={`input input-normal`}
                  placeholder="(99) 99999-9999"
                />      
              </div>
              <div className='container-contact-me-div container-contact-padding'>
                <label htmlFor="message">Mensagem</label>
                <br />
                <br />
                <textarea
                  id="message" 
                  cols="80" 
                  rows="6" 
                  required 
                  value={this.state.text}
                  className='text-area-contact-me'
                  onChange={this.handleValueChange('text')} 
                  placeholder="Digite sua mensagem aqui">
                </textarea>
                <br />
                <input
                  type='button' 
                  onClick={() => this.handleSendEmail()} 
                  className='button-contact-me' 
                  value='Enviar' 
                />       
                &nbsp;&nbsp;
                <label className={this.state.showingMessage ? '' : 'display-none-contact-me'}>
                  {this.state.message}
                </label>   
              </div>
              <div className='container-contact-me-div contact-me-email'>
                <p className='contact-email-header'>Entre em contato</p>
                <p>
                  <a href='mailto:boniekmg@yahoo.com.br'>
                    <img alt='Clique aqui para envia um email para boniekmg@yahoo.com.br' className='contact-me-img' src={Email}/>
                    boniekmg@yahoo.com.br
                  </a>
                </p>
                <p> 
                  <a href='tel:+5549999576584'>               
                    <img alt='Clique aqui para enviar um whatsapp para (49) 99957-6584' className='contact-me-img' src={Phone}/>
                    (49) 99957-6584
                  </a>
                </p>
                <Social />   
              </div>
            </div>   
            
          </div>                      
      );
  }
}

export default ContactMe;
