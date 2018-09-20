import React, { Component } from 'react';
import Section1  from './secion1/Section1';
import Section2  from './section2/Section2';
import Section3  from './section3/Section3';
import Menu  from './menu/Menu';
import Footer  from './footer/Footer';
import Globals from './utils/Globals';

import { css } from 'glamor';

css.global('html, body', {
  padding: 0,
  margin: 0,
  fontFamily: 'Rajdhani, sans-serif',
  background: Globals.colors.transparent,
  overflowX: 'hidden',
});

class App extends Component {
  render() {
    return (
      <div>
        <Menu />            
        <Section1 />  
        <Section2 />                 
        <Section3 />  
        <Footer />          
      </div>
    );
  }
}

export default App;
