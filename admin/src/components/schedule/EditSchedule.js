import React from 'react';
import PropTypes from 'prop-types';
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
    },
    divRow: {
        display: 'flex',
        flexDirection: 'row',
    }
});

class EditSchedule extends React.Component {
    render() {
        const { classes, 
                handleValueChange, 
                data,  
                file,
                handleSave,
                handleCancel,
                handleFileValue
            } = this.props;
        const fileName = file.name != null ? file.name : '';
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">    
                    <div className={classes.back}>
                        <TextField
                            id='data'
                            label='Data'
                            type='datetime-local'
                            value={data.date}      
                            onChange={handleValueChange('date')}                                  
                            width='80px'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />                    
                        <TextField
                            id="title"
                            label="Título"
                            className={classes.textField}
                            value={data.title}
                            onChange={handleValueChange('title')}
                            margin="normal"
                            fullWidth
                        />   
                        <div className={classes.divRow}>
                            <TextField                    
                                style={{ flex: 1 }}                    
                                id="file-name"
                                label="Imagem"
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                                value={fileName}
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

EditSchedule.propTypes = {
    classes: PropTypes.object.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleFileValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(EditSchedule);
