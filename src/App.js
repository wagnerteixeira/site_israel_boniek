import React, { Component } from 'react';
import Section1  from './secion1/Section1'
import Globals from './utils/Globals'

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
        <Section1 />
      </div>
    );
  }
}

export default App;
