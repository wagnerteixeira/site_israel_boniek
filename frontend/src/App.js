import React, { Component } from 'react';
import './App.css';

import Menu from './menu/Menu';
import Principal from './principal/Principal';
import AboutMe from './aboutMe/AboutMe';
import Publication from './publication/Publication';
import Event from './event/Event';
import Lecture from './lecture/Lecture';
import Image from './image/Image';
import Video from './video/Video';
import Fides from './fides/Fides';
//contato
import Partner from './partner/Partner';
import Footer from './footer/Footer';
import ContactMe from './contactMe/ContactMe';



class App extends Component {
  render() {
    return (
      <div>
        <Menu />            
        <ContactMe />     
        <Footer />          
      </div>
    );
  }
}

export default App;
