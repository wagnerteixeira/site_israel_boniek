import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SocialIcon } from 'react-social-icons';
import { right } from 'glamor';

const styles = {  
  row: {
    top: 0,
    float: 'right',
    display: 'flex',
    justifyContent: 'center',
    width: '250px'
  },
  icons: {
    margin: '10px'
  }
};

function IconAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <SocialIcon className={classes.icons} url="https://www.facebook.com/educar.israelboniek/" />
      <SocialIcon className={classes.icons} url="https://www.youtube.com/channel/UCUZxNDBqvVp0p9d7kUYsVpQ"/>      
      <SocialIcon className={classes.icons} url="https://www.instagram.com/israelboniek/?hl=pt-br"/>      
    </div>
  );
}

IconAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconAvatars);