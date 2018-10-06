import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditPublication from './EditPublication';
import ViewPublication from './ViewPublication';

import publicationService from '../../services/publicationService';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,    
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
});

  
class Publication extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            value: 'LIST',
            emAlteracao: false,
            sinopsysValue: '',
            titleValue: '',
            fileValue: '',
            file: {},
            subtitleValue: '',
            selectedIndex: '',
            docs: []
        };        
    }
    componentWillMount() {
        this.fetchImages();
    }
  
    fetchImages() {    
        publicationService.getDocs()
          .then(documents => {          
            this.setState({ ...this.state, docs: documents, selectedIndex: documents[0].id });            
          })
          .catch(error => console.log(error));        
    }
  
    handleClick = (event, id) => {
        this.setState({ ...this.state, selectedIndex: id });
    }
  
    handleSave() {    
        console.log(this.state);
        this.setState({ 
          ...this.state,           
          titleValue: '',
          subtitleValue: '',
          sinopsysValue: '',
          fileValue: '',
          file: {}
        });
    }
  
    handleCancel() {
        console.log(this.state);
        this.setState({ 
          ...this.state, 
          titleValue: '',
          subtitleValue: '',
          sinopsysValue: '',
          fileValue: '',
          file: {}
        });
    }
  
    handleFileValue(fileObject) {
        console.log(fileObject);      
  
        this.setState({ ...this.state, fileValue: fileObject.name, file: fileObject });
    }
  
    handleValueChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
      
  
    handleTabChange = (event, value) => {
          this.setState({ value });
    };  

    render() {
        const { classes } = this.props;
        const { value, 
                emAlteracao, 
                sinopsysValue,
                titleValue,
                fileValue,
                subtitleValue
              } = this.state;    
        return (
            <div className={classes.root}>                
                <Tabs 
                    value={value} 
                    onChange={this.handleTabChange}
                    indicatorColor='primary'
                    textColor='primary'
                >
                     {!emAlteracao && <Tab value='LIST' label='LISTAR' />}
                     <Tab value='EDIT' label={emAlteracao ? 'ALTERAR' : 'INCLUIR'} />                    
                </Tabs>                
                {value === 'LIST' && 
                  <ViewPublication
                    selectedIndex={this.state.selectedIndex} 
                    handleClick={this.handleClick} 
                    docs={this.state.docs}
                  />
                }
                {value === 'EDIT' && 
                  <EditPublication 
                    handleValueChange={this.handleValueChange}
                    sinopsysValue={sinopsysValue}
                    titleValue={titleValue}
                    fileValue={fileValue}
                    subtitleValue={subtitleValue}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}
                    handleFileValue={this.handleFileValue}
                  />
                }                
            </div>
        );
    }
}


export default withStyles(styles)(Publication);