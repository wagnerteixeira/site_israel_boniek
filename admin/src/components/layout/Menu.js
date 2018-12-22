import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import MessageSnackbar from '../common/MessageSnackbar';
import Login from '../user/Login';

import IconListButton from '../common/IconListButton';
import IconListButtonSvg from '../common/IconListButtonSvg';

import youtube from '../svgIcons/youtube';

import firebase from '../../firebase';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  mainContent: {
    width: '100%',
    height: '100%'
  },
  content: {
    top: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 8,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  typographyDawerOpen: {
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit * 5,
    },
  },
  iconClassName: {
    fontSize: 35
  },
  listItemClassName: {
    paddingLeft: theme.spacing.unit * 1,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 0.5,
      marginTop: -10
    },
  },
  listItemTextClassName: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,    
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 5,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 6,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    ...theme.mixins.toolbar,
  },  
  icon: {
    margin: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  userText: {
    position: 'relative',
    marginRight: theme.spacing.unit * 4,
  }
});
class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: {}, 
                   logged: false, 
                   drawerOpen: false, 
                   headerText: 
                   props.initialheaderText,
                   email: '',
                   password:'',
                   displayName: '',
                   messageOpen: false,
                   variantMessage: 'success',
                   messageText: '',
                  };
  }

  handleValueChange = name => event => {
    this.setState({...this.state, [name]: event.target.value});
  };

  handleDrawer = (value) => {
    this.setState({...this.state, drawerOpen: value });
  }

  handleHeaderText = (value)=> {
    this.setState({...this.state, headerText: value });
  }

  handleLogin = () => {
    console.log(this.state)
    firebase.auth.doSignInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => 
    {
      console.log(user)
      this.setState({...this.state, 
                     user: user, 
                     logged: true, 
                     displayName: 
                     user.user.displayName,
                     messageOpen: true, 
                     messageText: 'Usuário logado com sucesso!', 
                     variantMessage: 'success' 
                    })
      localStorage.setItem('displayName', user.user.displayName);
      localStorage.setItem('logged', true);
    })
    .catch(error => {
      console.log(error)
      this.setState({...this.state, 
                     user: {}, 
                     logged: false,
                     messageOpen: true, 
                     messageText: 'Verifique usuário e/ou senha!', 
                     variantMessage: 'error'
                    });
    })
  }

  handleMessageClose = () => {
    this.setState({ ...this.state, messageOpen: false });
  }
  
  render() {
    const { classes } = this.props;     
    const { logged, 
            email, 
            password, 
            displayName,
            messageOpen,
            variantMessage,
            messageText
          } = this.state;
    let _logged = logged;
    let _displayName = displayName;
    if (!_logged){
      if (localStorage.getItem('logged')){
        _logged = true;
        _displayName = localStorage.getItem('displayName')
      }
    }
    return (       
      <div>
        {!_logged ? <Login 
                      email={email}
                      handleLogin={this.handleLogin}
                      password={password}
                      handleValueChange={this.handleValueChange}
                      handleMessageClose={this.handleMessageClose}
                      messageOpen={messageOpen}
                      variantMessage={variantMessage}
                      messageText={messageText}
                    /> :         
        <div className={classes.root}>        
          <Drawer 
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, 
                              !this.state.drawerOpen && classes.drawerPaperClose),
            }}
            open={this.state.drawerOpen}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={() => this.handleDrawer(false)} color="inherit">
                <ChevronLeft />
              </IconButton>
            </div>
            <Divider />
            <List>
              <IconListButton 
                linkTo='/' 
                iconType='schedule'               
                primaryText='Agenda'    
                onClickButton={() => this.handleHeaderText('Agenda')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />
              <IconListButton 
                linkTo='/image' 
                iconType='camera_alt'                
                primaryText='Fotos' 
                onClickButton={() => this.handleHeaderText('Fotos')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />             
              <IconListButton 
                linkTo='/lecture' 
                iconType='accessibility_new'                
                primaryText='Palestras' 
                onClickButton={() => this.handleHeaderText('Palestras')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />
              <IconListButton 
                linkTo='/publication' 
                iconType='library_books'                
                primaryText='Publicações' 
                onClickButton={() => this.handleHeaderText('Publicações')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />
             {/*} <IconListButton 
                linkTo='/user' 
                iconType='person'                
                primaryText='Usuários' 
                onClickButton={() => this.handleHeaderText('Usuários')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />*/}
              <IconListButtonSvg 
                linkTo='/video'               
                className={classes.icon}               
                primaryText='Videos' 
                onClickButton={() => this.handleHeaderText('Videos')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}    
                path={youtube}          
              />
              <IconListButton 
                linkTo='/counter' 
                iconType='person'                
                primaryText='Contador' 
                onClickButton={() => this.handleHeaderText('Contador')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />
              <IconListButton 
                linkTo='/event' 
                iconType='camera_alt'                
                primaryText='Eventos' 
                onClickButton={() => this.handleHeaderText('Eventos')}
                listItemClassName={classes.listItemClassName} 
                iconClassName={classes.iconClassName}
                listItemTextClassName={classes.listItemTextClassName}
              />
            </List>          
          </Drawer>             
          <div className={classes.mainContent}>
            <AppBar
              className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}
            >
              <Toolbar disableGutters={!this.state.drawerOpen}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => this.handleDrawer(true)}
                  className={classNames(classes.menuButton, this.state.drawerOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography 
                  className={classes.typographyDawerOpen} 
                  variant="title" 
                  color="inherit" 
                  noWrap
                >
                  {this.state.headerText}
                </Typography>
                <div className={classes.grow} />
                <Typography 
                  variant="title" 
                  color="inherit" 
                  className={classes.userText}
                >
                  { _displayName }
                </Typography>
              </Toolbar>
            </AppBar>    
            <div className={classes.content}>
              {this.props.children}
            </div>
          </div>
        </div>}
        <MessageSnackbar
          handleClose={this.handleMessageClose}
          open={messageOpen}
          variant={variantMessage}
          message={messageText}
        />
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);
