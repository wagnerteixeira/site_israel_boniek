import React, { Component } from 'react';
import './App.css';

import Principal from './principal/Principal';
import Fides from './fides/Fides';
import Publication from './publication/Publication';
import Menu from './menu/Menu';
import Footer from './footer/Footer';

import baseService from './services/baseService';

const teste = baseService('teste');


class App extends Component {
  render() {
    teste.getDocs().then(docs => console.log(docs));
    return (
      <div>
        <Menu />            
        <Principal />  
        <Fides />                       
        <Publication />  
        <Footer />          
      </div>
    );
  }
}

export default App;
