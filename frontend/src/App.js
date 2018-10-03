import React, { Component } from 'react';
import './App.css';

import Principal from './principal/Principal';
import Fides from './fides/Fides';
import Publication from './publication/Publication';
import Menu from './menu/Menu';
import Footer from './footer/Footer';


class App extends Component {
  render() {
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
