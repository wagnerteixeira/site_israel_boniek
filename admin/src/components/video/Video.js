import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditVideo from './EditVideo';
import ViewVideo from './ViewVideo';
import { youtubeUrlParser } from '../../utils/youtubeHelper';

import baseService from '../../services/baseService';

const videoService = baseService('video')

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
});

class Video extends Component {
  state = {
    tabValue: 'EDIT',
    inEdit: false,    
    selectedIndex: '0',
    docs: [],
    modalOpen : false,
    messageOpen: false,
    variantMessage: 'success',
    messageText: '',
    isUrlOk: false,
    data: {
      url: '',  
      idYoutube: '',
    }
  };

  componentWillMount() {
    //this.fetchVideos();
  }

  handleUrlValueChange = event => {
    let id = youtubeUrlParser(event.target.value);
    const isUrlOk = (id !== '');
    this.setState({ ...this.state, isUrlOk: isUrlOk, data: {...this.data, idYoutube: id, url: event.target.value }});  
  }

  handleMessageClose = () => {
    this.setState({ ...this.state, messageOpen: false });
  }

  fetchVideos = () => {   
    console.log('Carregando registro') 
    videoService.getDocs()
      .then(documents => {               
        this.setState({    
            ...this.state,         
            tabValue: 'LIST', 
            inEdit: false,            
            selectedIndex: '0',
            docs: documents,
            modalOpen : false,
            messageOpen: false,
            variantMessage: 'success',
            messageText: '',
            isUrlOk: false,
            id : '',
            data: {
              url: '',        
              idYoutube: '',                    
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
    this.fetchVideos();
  }

  handleSave = () => {              
    if (this.state.data.idYoutube === ''){
      this.setState({ ...this.state, messageOpen: true, messageText: 'Verifique a url do vídeo! ', variantMessage: 'error' });
      return;
    }
    if (this.state.inEdit){         
        let video = {
          id : this.state.id,
          data : {...this.state.data}
        }   
        videoService.updateDoc(video)
        .then(() => {
            console.log('Alterado');            
            this.handleCancel();
        })
        .catch((error) => console.log(error));
    } else {
      let video = {
        id : '',
        data : {...this.state.data}
      }  
      videoService.createDoc(video.data)
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
    videoService.deleteDoc(this.state.docs[key].id)
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
      isUrlOk: true,
      id : this.state.docs[key].id,
      data: this.state.docs[key].data
    });      
  }
  
  render() {
    const { classes } = this.props;
    const { tabValue, 
        inEdit,
        data,
        selectedIndex,
        isUrlOk,
        messageOpen,
        variantMessage,
        messageText,
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
            <ViewVideo 
                    handleClick={this.handleClick} 
                    docs={this.state.docs}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}    
                    selectedIndex={selectedIndex}  
            />}
        {tabValue === 'EDIT' &&
            <EditVideo 
                    handleValueChange={this.handleValueChange}
                    handleUrlValueChange={this.handleUrlValueChange}
                    data={data}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}                      
                    inEdit={inEdit}
                    isUrlOk={isUrlOk}
                    messageOpen={messageOpen}
                    handleMessageClose={this.handleMessageClose}
                    variantMessage={variantMessage}
                    messageText={messageText}

            />}
      </div>
    );
  }
}

Video.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Video);
