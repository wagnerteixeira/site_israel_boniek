import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Modal from '../common/Modal';

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
    button: {
        margin: theme.spacing.unit,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

function EditLecture(props) {    
    const { classes, 
            handleValueChange,   
            handleUrlValueChange,                     
            data,
            handleSave,
            handleCancel,
            modalOpen,
            handleModal,
            idIsOk,
            handleSnackbarClose,
            snackbarOpen
        } = props;
    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off">    
                <div className={classes.back}>
                    <TextField
                        id="url"
                        label="Url"
                        className={classes.textField}
                        value={data.url}
                        onChange={handleUrlValueChange}
                        error={!idIsOk}
                        margin="normal"
                        fullWidth
                    />                            
                    <Button 
                        mini 
                        variant="fab" 
                        color="primary" 
                        aria-label="Add" 
                        className={classes.button}
                        onClick={handleModal(true)}
                    >
                        <AddIcon />
                    </Button>
                    {/*
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={snackbarOpen}
                        onClose={handleSnackbarClose}
                        autoHideDuration={1500}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Url incorreta, copie e cole novamente </span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={handleSnackbarClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />*/}
                    <Modal 
                        open={modalOpen}
                        handleClose={handleModal(false, 'cancel')}
                    >
                        <div>
                            <Typography id="modal-title">
                                Copie e cole aqui a url do vídeo do Youtube
                            </Typography>
                            <TextField
                                id="url"
                                label="Url"
                                error={!idIsOk}
                                className={classes.textField}
                                value={data.url}
                                onChange={handleUrlValueChange}
                                margin="normal"
                                fullWidth
                            />     
                            <div className={classes.divRow}>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    className={classes.button}
                                    onClick={handleModal(false, 'ok')}
                                >
                                    OK
                                </Button>           
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    className={classes.button}
                                    onClick={handleModal(false, 'cancel')}
                                >
                                    Cancelar
                                </Button>           
                            </div> 
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={false}
                                onClose={handleSnackbarClose}
                                autoHideDuration={1500}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Url incorreta, copie e cole novamente </span>}
                                action={[
                                    <IconButton
                                      key="close"
                                      aria-label="Close"
                                      color="inherit"
                                      className={classes.close}
                                      onClick={handleSnackbarClose}
                                    >
                                      <CloseIcon />
                                    </IconButton>,
                                ]}
                            />
                        </div>
                    </Modal>
                            
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

EditLecture.propTypes = {
    classes: PropTypes.object.isRequired,
    handleValueChange: PropTypes.func.isRequired,    
    handleUrlValueChange: PropTypes.func.isRequired,    
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,    
    data: PropTypes.object.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    idIsOk: PropTypes.bool.isRequired,
};

export default withStyles(styles)(EditLecture);
