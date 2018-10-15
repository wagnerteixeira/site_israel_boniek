import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import MessageSnackbar from '../common/MessageSnackbar';

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
    divRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        margin: theme.spacing.unit,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

function EditLecture(props) {    
    const { classes, 
            handleUrlValueChange,                     
            data,
            handleSave,
            handleCancel,
            isUrlOk,
            handleMessageClose,
            messageOpen,
            variantMessage,
            messageText,
        } = props;
    return (
        <div className={classes.container}>    
            <div className={classes.back}>
                <TextField
                    id="url"
                    label="Url"
                    className={classes.textField}
                    value={data.url}
                    onChange={handleUrlValueChange}
                    error={!isUrlOk}
                    margin="normal"
                    fullWidth
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
            <MessageSnackbar
                handleClose={handleMessageClose}
                open={messageOpen}
                variant={variantMessage}
                message={messageText}
            />
        </div>               
    );
}

EditLecture.propTypes = {
    classes: PropTypes.object.isRequired,
    handleValueChange: PropTypes.func.isRequired,    
    handleUrlValueChange: PropTypes.func.isRequired,    
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,    
    data: PropTypes.object.isRequired,
    isUrlOk: PropTypes.bool.isRequired,
};

export default withStyles(styles)(EditLecture);
