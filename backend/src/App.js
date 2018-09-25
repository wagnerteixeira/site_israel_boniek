import React, { Component } from 'react';
import { css } from 'glamor';

import Section1 from './secion1/Section1';
import Fides from './fides/Fides';
import Publication from './publication/Publication';
import Menu from './menu/Menu';
import Footer from './footer/Footer';
import Globals from './utils/Globals';

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
        <Fides />               
        <Publication />  
        <Footer />          
      </div>
    );
  }
}

export default App;
