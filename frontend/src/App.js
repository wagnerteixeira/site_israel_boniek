import React, { Component } from 'react';
import './App.css';

import Principal from './principal/Principal';
import Fides from './fides/Fides';
import Publication from './publication/Publication';
import Image from  './image/Image';
import Lecture from './lecture/Lecture';
import Menu from './menu/Menu';
import Footer from './footer/Footer';
import Video from './video/Video';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />            
        <Principal />  
        <Fides />  
        <Lecture />                     
        <Publication />  
        <Image />  
        <Video />
        <Footer />                  
      </div>
    );
  }
}

export default App;
