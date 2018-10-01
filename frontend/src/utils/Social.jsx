import React from 'react';
import FacebookIcon from '../media/images/facebook.svg';
import InstagramIcon from '../media/images/instagram.svg';
import YoutubeIcon from '../media/images/youtube.svg';

const styles = {  
  row: {
    top: 0,
    float: 'right',
    display: 'flex',
    justifyContent: 'center',
    width: '250px'
  },
  icons: {
    margin: '10px',
    width: '40px',
    height: '40px'
  }
};

const IconsSocial = () => (
    <div style={styles.row}>
      <a target="blank" href="https://www.facebook.com/educar.israelboniek/"><img src={FacebookIcon} style={styles.icons} /></a>
      <a target="blank" href="https://www.youtube.com/channel/UCUZxNDBqvVp0p9d7kUYsVpQ"><img src={YoutubeIcon} style={styles.icons} /></a>
      <a target="blank" href="https://www.instagram.com/israelboniek/?hl=pt-br"><img src={InstagramIcon} style={styles.icons} /></a>
    </div>
);

export default IconsSocial;
