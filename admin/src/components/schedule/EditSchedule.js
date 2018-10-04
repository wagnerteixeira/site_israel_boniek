import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'block',        
    },
    back: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap',  
        flexDirection: 'column',  
        padding: theme.spacing.unit, 
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
    }
});

class EditShedule extends React.Component {
    render() {
        const { classes, 
                handleValueChange, 
                dataValue,
                titleValue,   
                fileValue,     
                handleSave,
                handleCancel,
                handleFileValue
            } = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">    
                <div className={classes.back}>
                    <TextField
                        id='data'
                        label='Data'
                        type='datetime-local'
                        value={dataValue}      
                        onChange={handleValueChange('dataValue')}                                  
                        width='80px'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />                    
                    <TextField
                        id="title"
                        label="Título"
                        className={classes.textField}
                        value={titleValue}
                        onChange={handleValueChange('titleValue')}
                        margin="normal"
                        fullWidth
                    />                    
                        <TextField                    
                            style={{ flex: 1 }}                    
                            id="file-name"
                            label="Imagem"
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                            value={fileValue}
                        /> 
                        <input
                            accept="image/*"
                            className={classes.inputFile}
                            id="outlined-button-file"                        
                            type="file"
                            onChange={(e) => handleFileValue(e.target.files[0])}
                        />                
                        <label htmlFor="outlined-button-file">
                            <div className={classes.containerFile}>
                                <Button variant="outlined" component="span" className={classes.button}>
                                    ...
                                </Button>                            
                            </div>
                        </label>  
                    </div>                    
                </form>
                <br />                            
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
        );
    }
}

EditShedule.propTypes = {
    classes: PropTypes.object.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    dataValue: PropTypes.string.isRequired,
    titleValue: PropTypes.string.isRequired,
    fileValue: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleFileValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(EditShedule);
