import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditLecture from './EditLecture';
import ViewLecture from './ViewLecture';

import baseService from '../../services/baseService';

const lectureService = baseService('lectures')

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
});

class Lecture extends Component {
  state = {
    tabValue: 'LIST',
    inEdit: false,    
    selectedIndex: '0',
    docs: [],
    data: {
      title: '',
      sinopsys: '',
      keyword: '',
    }
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
            tabValue: 'LIST', 
            inEdit: false,            
            selectedIndex: '0',
            docs: documents,
            id : '',
            data: {
              title: '',
              sinopsys: '',
              keyword: '',
            }
        });            
      })
      .catch(error => console.log(error));
  }

  handleTabChange = (event, value) => {
    this.setState({...this.state,  tabValue: value });
  };

  handleValueChange = name => event => {
    this.setState({...this.state, data: { ...this.state.data, [name]: event.target.value}});
  };

  handleCancel = () => {
    this.setState({...this.state, inEdit: false, tabValue: 'LIST'});
    this.fetchLectures();
  }

  handleSave = () => {              
    console.log('salvar');
    if (this.state.inEdit){         
        let lecture = {
          id : this.state.id,
          data : {...this.state.data}
        }   
        lectureService.updateDoc(lecture)
        .then(() => {
            console.log('Alterado');            
            this.handleCancel();
        })
        .catch((error) => console.log(error));
    } else {
      let lecture = {
        id : '',
        data : {...this.state.data}
      }  
      lectureService.createDoc(lecture.data)
      .then(() => {              
          console.log('Criado');            
          this.handleCancel();
      })
      .catch((error) => console.log(error));
    }        
  }    

  handleClick = (event, id) => {   
    this.setState({ ...this.state, selectedIndex: id });
  }

  handleDelete = (key) => {          
    lectureService.deleteDoc(this.state.docs[key].id)
      .then((doc) => {
          console.log('Deletado');                     
          this.handleCancel();
      })
      .catch((error) => console.log(error));    
  }

  handleEdit = (key) => {
    this.setState({    
      ...this.state,         
      tabValue: 'EDIT', 
      selectedIndex: key,
      inEdit: true,
      id : this.state.docs[key].id,
      data: this.state.docs[key].data
    });      
  }
  
  render() {
    const { classes } = this.props;
    const { tabValue, 
        title,
        sinopsys,
        keyword,
        inEdit,
        data,
        selectedIndex
      } = this.state;   

    return (
        
      <div className={classes.root}>
        <Tabs 
            value={tabValue} 
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor='primary'
        >
              {!inEdit && <Tab value='LIST' label='LISTAR' />}
              <Tab value='EDIT' label={inEdit ? 'ALTERAR' : 'INCLUIR'} />                    
        </Tabs>   
        {tabValue === 'LIST' &&
            <ViewLecture 
                    handleClick={this.handleClick} 
                    docs={this.state.docs}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}    
                    selectedIndex={selectedIndex}  
            />}
        {tabValue === 'EDIT' &&
            <EditLecture 
                    handleValueChange={this.handleValueChange}
                    title={title}
                    sinopsys={sinopsys}
                    keyword={keyword}
                    data={data}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}                      
                    inEdit={inEdit}                 
            />}
      </div>
    );
  }
}

Lecture.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Lecture);
