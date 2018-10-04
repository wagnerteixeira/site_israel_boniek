import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditShedule from './EditSchedule';
import ViewSchedule from './ViewSchedule';

import scheduleService from '../../services/scheduleService';

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

class Schedule extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            value: 'LIST',
            emAlteracao: false,
            dataValue: new Date().toISOString().slice(0, 16),
            titleValue: '',
            fileValue: '',
            file: {},
            selectedIndex: '',
            docs: []
        };        
    }

    componentWillMount() {
      this.fetchImages();
    }

    fetchImages() {    
      scheduleService.getDocs()
        .then(documents => {          
          this.setState({ ...this.state, docs: documents, selectedIndex: documents[0].id });            
        })
        .catch(error => console.log(error));
      //this.renderImages();  
    }

    handleClick = (event, id) => {
      this.setState({ ...this.state, selectedIndex: id });
    }

    handleSave() {    
      console.log(this.state);
      this.setState({ 
        ...this.state, 
        dataValue: new Date().toISOString().slice(0, 16),
        titleValue: '',
        fileValue: '',
        file: {}
      });
    }

    handleCancel() {
      console.log(this.state);
      this.setState({ 
        ...this.state, 
        dataValue: new Date().toISOString().slice(0, 16),
        titleValue: '',
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
                dataValue,
                titleValue,
                fileValue
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
                  <ViewSchedule 
                    selectedIndex={this.state.selectedIndex} 
                    handleClick={this.handleClick} 
                    docs={this.state.docs}
                  />
                }
                {value === 'EDIT' && 
                  <EditShedule 
                    handleValueChange={this.handleValueChange}
                    dataValue={dataValue}
                    titleValue={titleValue}
                    fileValue={fileValue}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}
                    handleFileValue={this.handleFileValue}
                  />
                }                
            </div>
        );
    }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);
