import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  grow: {
    flexGrow: 1,
  }
});

function Login(props){
  const { classes, email, password, handleLogin, handleValueChange } = props;    
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='title' align='center' color="inherit" className={classes.grow}>
            Entre com seu email e senha
          </Typography>        
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <TextField
          id="email"
          label="Email"
          value={email}
          className={classes.textField}
          placeholder="email@email.com"
          fullWidth
          onChange={handleValueChange('email')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="password"
          label="Senha"
          value={password}
          className={classes.textField}
          type="password"
          onChange={handleValueChange('password')}
          autoComplete="current-password"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={() => handleLogin()}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
 
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default withStyles(styles)(Login);