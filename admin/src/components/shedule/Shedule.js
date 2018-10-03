import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import EditShedule from './EditShedule';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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

class SimpleTabs extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            value: 'EDIT',
            emAlteracao: false,
            dataValue: new Date().toISOString().slice(0, 16),
            titleValue: '',
            fileValue: '',
            file: {}
        };        
    }

    handleSave = () => {    
      console.log(this.state)  
      this.setState({ 
        ...this.state, 
        dataValue: new Date().toISOString().slice(0, 16),
        titleValue: '',
        fileValue: '',
        file: {}
      });
    }

    handleCancel = () => {
      console.log(this.state)
      this.setState({ 
        ...this.state, 
        dataValue: new Date().toISOString().slice(0, 16),
        titleValue: '',
        fileValue: '',
        file: {}
      });
    }

    handleFileValue = (fileObject) => {
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
                {value === 'LIST' && <TabContainer>Item One</TabContainer>}
                {value === 'EDIT' && <EditShedule 
                                        handleValueChange={this.handleValueChange}
                                        dataValue={dataValue}
                                        titleValue={titleValue}
                                        fileValue={fileValue}
                                        handleCancel={this.handleCancel}
                                        handleSave={this.handleSave}
                                        handleFileValue={this.handleFileValue}
                                     />}                
            </div>
        );
    }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
