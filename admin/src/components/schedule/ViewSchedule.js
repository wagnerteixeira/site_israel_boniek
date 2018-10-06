import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

import { dateAndTimeFormat } from '../../utils/dateHelper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit * 0.15,
    color: theme.palette.common.white,
  },
  buttonEdit: {
    backgroundColor: theme.palette.buttonEdit.main,     
    '&:hover': {
        backgroundColor: theme.palette.buttonEdit.dark,
    },
  },
  acoes: {
      paddingLeft: theme.spacing.unit * 6
  }
});

function ViewSchedule(props) {
  const { classes, handleClick, selectedIndex, docs } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell>Imagem</TableCell>   
            <TableCell className={classes.acoes}>Ações</TableCell>   
          </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(docs).map(key => (
                    <TableRow 
                        key={key}
                        hover
                        onClick={event => handleClick(event, key)}
                        selected={selectedIndex === key}
                    >
                        <TableCell>{dateAndTimeFormat(docs[key].data.date)}</TableCell>
                        <TableCell>{docs[key].data.title}</TableCell>
                        <TableCell>{docs[key].data.location}</TableCell>
                        <TableCell>
                            <Button 
                                variant="fab" 
                                color="default" 
                                aria-label="Edit" 
                                className={classes.button}
                                mini
                                onClick={() => console.log(docs[key].data.urlFolder)}
                            >
                                <Icon fontSize="small">photo_camera</Icon>                                
                            </Button>
                        </TableCell>                    
                        <TableCell>                                                        
                            <Button 
                                variant="fab" 
                                color="primary" 
                                aria-label="Edit" 
                                className={classNames(classes.button, classes.buttonEdit)}
                                mini
                                onClick={() => console.log('Edit')}
                            >
                                <Icon fontSize="small">edit_icon</Icon>                                
                            </Button>
                            <Button 
                                variant="fab" 
                                color='secondary' 
                                aria-label="Delete" 
                                className={classes.button}
                                mini
                                onClick={() => console.log('Delete')}
                            >
                                <Icon fontSize="small">delete_icon</Icon>
                            </Button>                           
                        </TableCell>     
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </Paper>
  );
}

ViewSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewSchedule);
