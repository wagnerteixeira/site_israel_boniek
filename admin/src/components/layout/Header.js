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

import IconListButton from '../common/iconListButton';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    flexGrow: 1,    
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    width: "100%",
    height: '100%',
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
  listItemTextClassName : {
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
});

class Header extends React.Component {
  
  render() {
    const { classes } = this.props;
    const drawerOpen = true;
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => /*this.props.handleDrawer(true)*/ console.log('open drwaer')}
              className={classNames(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.typographyDawerOpen} variant="title" color="inherit" noWrap>
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={() => /*this.props.handleDrawer(false)*/ console.log('Close drawer') } color="inherit">
               <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List>
            <IconListButton 
              linkTo='/' 
              iconType='schedule' 
              onClickButton={this.clickList} 
              primaryText='Agenda'               
              listItemClassName={classes.listItemClassName} 
              iconClassName={classes.iconClassName}
              listItemTextClassName={classes.listItemTextClassName}
            />
            <IconListButton 
              linkTo='/image' 
              iconType='camera_alt' 
              onClickButton={this.clickList}  
              primaryText='Fotos' 
              listItemClassName={classes.listItemClassName} 
              iconClassName={classes.iconClassName}
              listItemTextClassName={classes.listItemTextClassName}
            />             
            <IconListButton 
              linkTo='/speech' 
              iconType='accessibility_new' 
              onClickButton={this.clickList}  
              primaryText='Palestras' 
              listItemClassName={classes.listItemClassName} 
              iconClassName={classes.iconClassName}
              listItemTextClassName={classes.listItemTextClassName}
            />
            <IconListButton 
              linkTo='/publication' 
              iconType='library_books' 
              onClickButton={this.clickList}  
              primaryText='Publicações' 
              listItemClassName={classes.listItemClassName} 
              iconClassName={classes.iconClassName}
              listItemTextClassName={classes.listItemTextClassName}
            />
          </List>          
        </Drawer>        
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);