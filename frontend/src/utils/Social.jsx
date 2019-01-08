import React from 'react';
import FacebookIcon from '../media/images/facebook.svg';
import InstagramIcon from '../media/images/instagram.svg';
import YoutubeIcon from '../media/images/youtube.svg';
import WhatsappIcon from '../media/images/whatsapp.svg';
import './Social.css';

const IconsSocial = () => (
    <p className='social-contact'>
      <a target="blank" href="https://www.facebook.com/educar.israelboniek/" ><img src={FacebookIcon} className="icons" alt="Facebook" /></a>
      <a target="blank" href="https://www.youtube.com/channel/UCUZxNDBqvVp0p9d7kUYsVpQ"><img src={YoutubeIcon} className="icons" alt="Youtube" /></a>
      <a target="blank" href="https://www.instagram.com/israelboniek/?hl=pt-br"><img src={InstagramIcon} className="icons" alt="Instagram" /></a>
      <a target="blank" href="https://wa.me/+5549999576584"><img src={WhatsappIcon} className="icons" alt="Whatsapp" /></a>
    </p>
);

export default IconsSocial;
