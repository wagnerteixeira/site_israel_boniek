import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import EditPublication from './EditPublication';
import ViewPublication from './ViewPublication';

import publicationService from '../../services/publicationService';


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

class Publication extends Component {
  state = {
    value: 0,
    emAlteracao: false,
    title: '',
    subtitle: '',
    sinopsys: '',
    file: {},
    urlFolder: '',
    selectedIndex: 0,
    docs: []
  };

  componentWillMount() {
    this.fetchImages();
  }

  fetchImages = () => {    
    publicationService.getDocs()
      .then(documents => {               
        this.setState({    
            ...this.state,         
            value: 0, 
            emAlteracao: false,
            title: '',
            subtitle: '',
            sinopsys: '',
            file: {},
            urlFolder: '',
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
    this.fetchImages();
  }

  handleSave = () => {              
    let publication = {
      id : '',
      data : {
        title: this.state.title,
        subtitle: this.state.subtitle,
        sinopsys: this.state.sinopsys,
        urlFolder: this.state.urlFolder,        
      } 
    }

    if (this.state.emAlteracao){
        publication.id = this.state.selectedIndex;
        publication.data.id = this.state.selectedIndex;
        console.log(publication);
        publicationService.updateDoc(publication.data)
        .then((id) => {
            console.log('Alterado');            
            this.setState({...this.state, value: 0, emAlteracao: false});
        })
        .catch((error) => console.log(error));
    } else {
    publicationService.createDoc(publication.data)
      .then((id) => {
          publication.id = id;
          this.saveFileImage(publication, this.state.file);
          this.setState({...this.state, value: 0});
      })
      .catch((error) => console.log(error));
    }    
  }    

  handleDelete = (event, id) => {              
       publicationService.deleteDoc(id)
        .then((doc) => {
            console.log('Deletado');
            this.deleteFileImage(id);            
            this.fetchImages();
        })
        .catch((error) => console.log(error));    
  }

handleEdit = (event, id) => {
    const vTitle = this.state.docs.filter((e) => e.id === id)[0].data.title;
    console.log(vTitle);
    this.setState({ ...this.state,                     
                    selectedIndex: id, 
                    title : vTitle, 
                    subtitle : this.state.docs.filter((e) => e.id === id)[0].data.subtitle,
                    sinopsys : this.state.docs.filter((e) => e.id === id)[0].data.sinopsys,
                    urlFolder: this.state.docs.filter((e) => e.id === id)[0].data.urlFolder,
                    emAlteracao : true,
                    value: 1});
    console.log(this.state);    
}

  deleteFileImage(id){
    publicationService.deleteFileImage(id);        
  }  

  saveFileImage(publication, file){
    console.log('saveFileImage');
    console.log(publication)    
    var uploadTask = publicationService.createFileImage(publication.id, file);

    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      console.log(snapshot.state);
      switch (snapshot.state) {
        case 'paused': // or 'paused'
          console.log('Upload is paused');
          break;
        case 'running': // or 'running'
          console.log('Upload is running');
          break;
      }
    }, error => {
      console.log('error in save file image ' + error)// Handle unsuccessful uploads
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('File available at', downloadURL);
        publication.data.urlFolder = downloadURL;        
        publicationService.updateDoc(publication)
          .then(() => {                              
              this.fetchImages();
          })
          .catch((error) => console.log(error)) 
      });
    });
  }  

  handleFileValue = (fileObject) => {
    console.log(fileObject);      

    this.setState({ ...this.state, urlFolder: fileObject.name, file: fileObject });
  }

  render() {
    const { classes } = this.props;
    const { value, 
        title,
        subtitle,
        sinopsys,
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
            <ViewPublication 
                    handleClick={this.handleClick} 
                    docs={this.state.docs}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}     
            /></TabContainer>}
        {value === 1 && <TabContainer>
            <EditPublication 
                    handleValueChange={this.handleValueChange}
                    title={title}
                    subtitle={subtitle}
                    sinopsys={sinopsys}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}                      
                    handleFileValue={this.handleFileValue} 
                    emAlteracao={emAlteracao}                 
            /></TabContainer>}
      </div>
    );
  }
}

Publication.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Publication);
