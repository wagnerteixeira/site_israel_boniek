import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 3,
        display: 'block',        
    },
    back: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap',  
        flexDirection: 'column',  
        padding: theme.spacing.unit * 2, 
        borderColor: '#C0C0C0',
        borderStyle: 'solid',      
        borderWidth: '1px',
        width: '50%',
        [theme.breakpoints.between('xs', 'sm')]: {
            width: '90%',
          }
    },
    textField: {        
        width: '100%'
    },
    inputFile: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    divRow: {
        display: 'flex',
        flexDirection: 'row',
    },
});

class EditLecture extends Component {
    render() {
        const { classes, 
                handleValueChange, 
                title,
                sinopsys, 
                keyword,  
                handleSave,
                handleCancel,
                emAlteracao,
            } = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">    
                    <div className={classes.back}>
                        <TextField
                            id="title"
                            label="Título"
                            className={classes.textField}
                            value={title}
                            onChange={handleValueChange('title')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="sinopsys"
                            label="Sinopse"
                            rows="10"
                            className={classes.textField}
                            value={sinopsys}
                            onChange={handleValueChange('sinopsys')}
                            margin="normal"
                            multiline
                        />         
                        <TextField
                            id="keyword"
                            label="Palavras Chave"
                            className={classes.textField}
                            value={keyword}
                            onChange={handleValueChange('keyword')}
                            margin="normal"                            
                        />         
                        <br />
                        <div className={classes.divRow}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                className={classes.button}
                                onClick={handleSave}
                            >
                                Salvar
                            </Button>           
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                className={classes.button}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>           
                        </div>    
                    </div>                    
                </form>
            </div>       
        );
    }
}

EditLecture.propTypes = {
    classes: PropTypes.object.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    sinopsys: PropTypes.string.isRequired,        
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,    
};

export default withStyles(styles)(EditLecture);
