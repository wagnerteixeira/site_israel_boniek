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
      paddingLeft: theme.spacing.unit * 8
  }
});

function ViewLecture(props) {
  const { classes, handleEdit, handleDelete, selectedIndex, docs } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Sinopse</TableCell>    
            <TableCell>Palavras Chaves</TableCell>       
            <TableCell className={classes.acoes}>Ações</TableCell>   
          </TableRow>
        </TableHead>
        <TableBody>
            {docs.map(doc => (
                    <TableRow 
                        key={doc.id}
                        hover
                        selected={selectedIndex === doc.id}
                    >
                        <TableCell>{doc.data.title}</TableCell>
                        <TableCell>{doc.data.sinopsys}</TableCell>                  
                        <TableCell>{doc.data.keyword}</TableCell> 
                        <TableCell>                            
                            <Button 
                                variant="fab" 
                                color="primary" 
                                aria-label="Edit" 
                                className={classNames(classes.button, classes.buttonEdit)}
                                mini
                                onClick={event => handleEdit(event, doc.id)}
                            >
                                <Icon fontSize="small">edit_icon</Icon>                                
                            </Button>
                            <Button 
                                variant="fab" 
                                color='secondary' 
                                aria-label="Delete" 
                                className={classes.button}
                                mini
                                onClick={event => handleDelete(event, doc.id)}
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

ViewLecture.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewLecture);
