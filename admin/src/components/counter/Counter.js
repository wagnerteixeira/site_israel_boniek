import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import baseService from '../../services/baseService';
import { TextField, Button } from '@material-ui/core';
import MessageSnackbar from '../common/MessageSnackbar';

const counterService = baseService('counter')

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  textField: {        
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Counter extends Component {
  state = {    
    id: '',
    counter: 0,
    messageOpen: false,
    variantMessage: 'success',
    messageText: '',
  };

  componentWillMount() {
    this.fetchCounter();
  }

  fetchCounter = () => {   
    console.log('Carregando registro') 
    counterService.getDocs()
      .then(documents => {               
        this.setState({    
            ...this.state,         
            counter: documents[0].data.counter,
            id: documents[0].id,
        });            
      })
      .catch(error => console.log(error));
  }

  
  handleValueChange = name => event => {
    this.setState({...this.state, [name]: event.target.value});
  };
  
  handleSave = () => {              
    console.log('salvar');
    let counter = {
      id : this.state.id,
      data : { counter: this.state.counter }
    }   
    console.log(counter)
    if (counter.id === ""){
      counterService.createDoc(counter.data)
      .then(() => {
          console.log('Criado');  
          this.setState({ ...this.state, messageOpen: true, messageText: 'Contador alterado com sucesso!', variantMessage: 'success' });                  
      })
      .catch((error) => console.log(error));
    }
    else
    {
      counterService.updateDoc(counter)
      .then(() => {
          console.log('Alterado');  
          this.setState({ ...this.state, messageOpen: true, messageText: 'Contador alterado com sucesso!', variantMessage: 'success' });                  
      })
      .catch((error) => console.log(error));    
    }
  }     
  
  handleMessageClose = () => {
    this.setState({ ...this.state, messageOpen: false });
  }
  
  render() {
    const { classes } = this.props;
    const { counter } = this.state;   

    return (
        
      <div className={classes.root}>
        <TextField
          id="counter"
          label="Contador"
          className={classes.textField}
          value={counter}
          onChange={(e) => this.handleValueChange('counter')({...e, target: { ...e.target, value: parseInt(e.target.value) }})}
          margin="normal"
          type="number"                            
          InputLabelProps={{
              shrink: true,
          }}                            
        />
        <Button
            variant="outlined" 
            color="primary" 
            className={classes.button}
            onClick={this.handleSave}
          >
            Salvar
        </Button>      
        <MessageSnackbar
            handleClose={this.handleMessageClose}
            open={this.state.messageOpen}
            variant={this.state.variantMessage}
            message={this.state.messageText}
        /> 
      </div>
    );
  }
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Counter);
