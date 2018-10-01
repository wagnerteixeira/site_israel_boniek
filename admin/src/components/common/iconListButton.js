import React  from 'react'
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom'

export default props => (
  <Link to={props.linkTo} style={{textDecoration: 'none'}} >
    <ListItem href={props.linkTo} button className={props.listItemClassName} onClick={props.onClickButton}>
      <Icon  color="primary" className={props.iconClassName} >{props.iconType}</Icon>   
      <ListItemText color="primary" className={props.listItemTextClassName} primary={props.primaryText} secondary={props.secondaryText} />  
    </ListItem>  
  </Link>
)