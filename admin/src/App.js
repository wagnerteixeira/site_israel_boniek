import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue, red, green } from '@material-ui/core/colors';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from './components/layout/Menu';
import Lecture from './components/lecture/Lecture';
import Image from './components/image/Image';
import Publication from './components/publication/Publication';
import Schedule from './components/schedule/Schedule';
import Video from './components/video/Video';
import Users from './components/Users';
import Counter from './components/counter/Counter';

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
      light: blue[500],
      main: blue[600],
      dark: blue[700],
      contrastText: '#fff',
    },
    secondary: {
      light: red[600],
      main: red[700],
      dark: red[800],
      contrastText: '#000',
    },     
    buttonEdit: {
      light: green[500],
      main: green[600],
      dark: green[700],
      contrastText: '#fff',
    }
  } 
});


class App extends Component {    
  render() {    
    console.log(muiTheme);
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={muiTheme}>
          <Menu theme={muiTheme} initialheaderText='Agenda'>
            <Switch>
              <Route path="/" exact component={Schedule} />
              <Route path="/image" component={Image} />
              <Route path="/lecture" component={Lecture} />              
              <Route path="/publication" component={Publication} />
              <Route path="/user" component={Users} />
              <Route path="/video" component={Video} />
              <Route path="/counter" component={Counter} />
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
