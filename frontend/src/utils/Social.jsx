import React from 'react';
import FacebookIcon from '../media/images/facebook.svg';
import InstagramIcon from '../media/images/instagram.svg';
import YoutubeIcon from '../media/images/youtube.svg';
import './Social.css';

const IconsSocial = () => (
    <p className='social-contact'>
      <a target="blank" href="https://www.facebook.com/educar.israelboniek/" ><img src={FacebookIcon} className="icons" alt="Facebook" /></a>
      <a target="blank" href="https://www.youtube.com/channel/UCUZxNDBqvVp0p9d7kUYsVpQ"><img src={YoutubeIcon} className="icons" alt="Youtube" /></a>
      <a target="blank" href="https://www.instagram.com/israelboniek/?hl=pt-br"><img src={InstagramIcon} className="icons" alt="Instagram" /></a>
    </p>
);

export default IconsSocial;
