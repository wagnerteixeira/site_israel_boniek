import React from 'react';
import { SocialIcon } from 'react-social-icons';

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

const IconAvatars = () => (
    <div style={styles.row}>
      <SocialIcon style={styles.icons} url="https://www.facebook.com/educar.israelboniek/" />
      <SocialIcon style={styles.icons} url="https://www.youtube.com/channel/UCUZxNDBqvVp0p9d7kUYsVpQ" />      
      <SocialIcon style={styles.icons} url="https://www.instagram.com/israelboniek/?hl=pt-br" />      
    </div>
);

export default IconAvatars;
