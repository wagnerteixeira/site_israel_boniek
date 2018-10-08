import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import EditLecture from './EditLecture';
import ViewLecture from './ViewLecture';

import baseService from '../../services/baseService';

const lectureService = baseService('lectures')

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
});

class Lecture extends Component {
  state = {
    value: 0,
    emAlteracao: false,
    title: '',
    sinopsys: '',
    keyword: '',
    selectedIndex: 0,
    docs: []
  };

  componentWillMount() {
    this.fetchLectures();
  }

  fetchLectures = () => {   
    console.log('Carregando registro') 
    lectureService.getDocs()
      .then(documents => {               
        this.setState({    
            ...this.state,         
            value: 0, 
            emAlteracao: false,
            title: '',
            sinopsys: '',
            keyword: '',
            selectedIndex: 0,
            docs: documents,
        });            
      })
      .catch(error => console.log(error));
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleValueChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCancel = () => {
    this.setState({...this.state, value: 0});
    this.fetchLectures();
  }

  handleSave = () => {              
    let lecture = {
      id : '',
      data : {
        title: this.state.title,
        sinopsys: this.state.sinopsys, 
        keyword: this.state.keyword,       
      } 
    }

    console.log('salvar');
    if (this.state.emAlteracao){
        lecture.id = this.state.selectedIndex;
        lecture.data.id = this.state.selectedIndex;        
        lectureService.updateDoc(lecture.data)
        .then((id) => {
            console.log('Alterado');            
            this.setState({...this.state, value: 0, emAlteracao: false});
        })
        .catch((error) => console.log(error));
    } else {
    lectureService.createDoc(lecture.data)
      .then((id) => {
          lecture.id = id;        
          console.log('Criado');            
          this.setState({...this.state, value: 0, emAlteracao: false});
      })
      .catch((error) => console.log(error));
    }    
    this.fetchLectures();
  }    

  handleDelete = (event, id) => {              
       lectureService.deleteDoc(id)
        .then((doc) => {
            console.log('Deletado');                     
            this.fetchLectures();
        })
        .catch((error) => console.log(error));    
  }

handleEdit = (event, id) => {
    this.setState({ ...this.state,                     
                    selectedIndex: id, 
                    title : this.state.docs.filter((e) => e.id === id)[0].data.title, 
                    sinopsys : this.state.docs.filter((e) => e.id === id)[0].data.sinopsys,
                    keyword: this.state.docs.filter((e) => e.id === id)[0].data.keyword,
                    emAlteracao : true,
                    value: 1});
    console.log(this.state);    
}
  
  render() {
    const { classes } = this.props;
    const { value, 
        title,
        sinopsys,
        keyword,
        emAlteracao,
      } = this.state;   

    return (
        
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleTabChange}>
            <Tab label="Listar" />
            <Tab label="Incluir" />            
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
            <ViewLecture 
                    handleClick={this.handleClick} 
                    docs={this.state.docs}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}     
            /></TabContainer>}
        {value === 1 && <TabContainer>
            <EditLecture 
                    handleValueChange={this.handleValueChange}
                    title={title}
                    sinopsys={sinopsys}
                    keyword={keyword}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}                      
                    emAlteracao={emAlteracao}                 
            /></TabContainer>}
      </div>
    );
  }
}

Lecture.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Lecture);
