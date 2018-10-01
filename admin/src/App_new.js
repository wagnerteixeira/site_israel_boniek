import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

import Header from './components/layout/Header';

const styles = theme => ({
  content: {    
    position: 'relative',
    margin: 0,
    overflowX: "hidden",
    //left: theme.spacing.unit * 10,
    top: theme.mixins.toolbar.minHeight + 10
   },
});

const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: {
      light: "#0099BC",
      main: "#0078D7",
      dark: "#0063B1",
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
    const { classes, theme } = this.props;    
     return (
      <MuiThemeProvider theme={muiTheme}>
        <Header theme={muiTheme}/>     
        {/*<div className={classes.content} >
          <Main /> 
        </div>                       
        <Footer />*/}
      </MuiThemeProvider>      
    );
  }
}

export default App;
