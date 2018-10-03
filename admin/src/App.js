import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blueGrey } from '@material-ui/core/colors';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from './components/layout/Menu';
import Lecture from './components/Lecture';
import Image from './components/Image';
import Publication from './components/Publication';
import Shedule from './components/shedule/Shedule';
import Users from './components/Users';

/*const styles = theme => ({
  content: {    
    position: 'relative',
    margin: 0,
    overflowX: 'hidden',
    //left: theme.spacing.unit * 10,
    top: theme.mixins.toolbar.minHeight + 10
   },
});
*/

const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: {
      light: '#0099BC',
      main: '#0078D7',
      dark: '#0063B',
    },
    secondary: {
      light: blueGrey[600],
      main: blueGrey[700],
      dark: blueGrey[800],
    },     
  } 
});

class App extends Component {    
  render() {       
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={muiTheme}>
          <Menu theme={muiTheme}>
            <Switch>
              <Route path="/" exact component={Shedule} />
              <Route path="/image" component={Image} />
              <Route path="/lecture" component={Lecture} />              
              <Route path="/publication" component={Publication} />
              <Route path="/user" component={Users} />
            </Switch>
          </Menu>        
          {/*<div className={classes.content} >
            <Main /> 
          </div>                       
          <Footer />*/}
        </MuiThemeProvider>      
      </BrowserRouter>
    );
  }
}

export default App;
