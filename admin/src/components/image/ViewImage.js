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

function ViewImage(props) {
  const { classes, selectedIndex, docs, handleEdit, handleDelete } = props; //handleClick, 
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>            
            <TableCell>Imagem</TableCell>   
            <TableCell className={classes.acoes}>Ações</TableCell>   
          </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(docs).map(key => (
                    <TableRow 
                        key={key}
                        hover                        
                        //onClick={event => handleClick(event, key)}
                        selected={selectedIndex === key}
                    >                       
                        <TableCell>{docs[key].data.description}</TableCell>                        
                        <TableCell>
                            <Button 
                                variant="fab" 
                                color="default" 
                                aria-label="Edit" 
                                className={classes.button}
                                mini
                                onClick={() => console.log(docs[key].data.url)}
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
                                onClick={() => handleEdit(key)}
                            >
                                <Icon fontSize="small">edit_icon</Icon>                                
                            </Button>
                            <Button 
                                variant="fab" 
                                color='secondary' 
                                aria-label="Delete" 
                                className={classes.button}
                                mini
                                onClick={() => handleDelete(key)}
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

ViewImage.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  docs: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(ViewImage);
