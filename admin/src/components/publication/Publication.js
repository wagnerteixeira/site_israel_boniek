import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
});

class Publication extends Component {
  state = {
    tabValue: 'LIST',
    inEdit: false,
    imageChanged: false,
    file: {},
    selectedIndex: '0',
    image: '',            
    docs: [],
    id : '',
    data: {
      title: '',
      subtitle: '',
      sinopsys: '',      
      urlImage: '',
      position: 0,
    }    
  };

  componentWillMount() {
    this.fetchPublications();
  }

  fetchPublications = () => {    
    publicationService.getDocsOrderBy('position')
      .then(documents => {         
        let docs = documents.map(document => {
          //console.log(`${document.data.position} ${typeof  document.data.position}`);
          if (typeof  document.data.urlImage === 'undefined')
            return {...document, data: {...document.data, 'urlImage': document.data.urlFolder }}
          else
            return document;
        })
        //console.log(docs)
        this.setState({   
            ...this.state,         
            tabValue: 'LIST', 
            inEdit: false,
            file: {},
            selectedIndex: '0',
            docs: docs,
            image: '',
            id : '',
            imageChanged: false,
            data: {
              title: '',
              subtitle: '',
              sinopsys: '',      
              urlImage: '',
              position: 0,
            }                
        });            
      })
      .catch(error => console.log(error));
  }

  handleTabChange = (event, value) => {
    this.setState({...this.state,  tabValue: value });
  };

  handleValueChange = name => event => {
    console.log(event)
    this.setState({...this.state, data: { ...this.state.data, [name]: event.target.value}});
  };

  handleImgaeChanged = () => this.setState({ ...this.state, imageChanged: true });

  handleCancel = () => {
    this.setState({...this.state, tabValue: 'LIST'});
    this.fetchPublications();
  }

  handleSave = () => {   
    console.log(this.state);
    if (this.state.inEdit){
      let publication = {
        id : this.state.id,
        data : {...this.state.data}
      }

      publicationService.updateDoc(publication)
        .then(() => {
            if (this.state.imageChanged)
              this.updateImage(publication)
            else
              this.handleCancel();
          })
        .catch((error) => console.log(error));
    }
    else {
      let publication = {
        id : '',
        data : {...this.state.data}
      }
      publicationService.createDoc(publication.data)
        .then((id) => {
            console.log('Criado')
            publication.id = id;            
            this.saveFileImage(publication, this.state.file);
        })
        .catch((error) => console.log(error));
    }
  }    

  updateImage(publication) {
    this.saveFileImage(publication, this.state.file);
  }

  handleDelete = (key) => {
    publicationService.deleteFileImage(this.state.docs[key].id)
      .then(() => { 
        publicationService.deleteDoc(this.state.docs[key].id)
          .then(() =>  this.fetchPublications());
      });
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

  deleteFileImage(id){
    publicationService.deleteFileImage(id);        
  }  

  saveFileImage(publication, file){
    console.log('saveFileImage');
    console.log(publication)    
    var uploadTask = publicationService.createFileImage(publication.id, file);

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        default:            
          break;
          
      }
    }, error => {
      console.log('error in save file image ' + error)// Handle unsuccessful uploads
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('File available at', downloadURL);
        publication.data.urlImage = downloadURL;        
        publicationService.updateDoc(publication)
          .then(() => {                              
            this.handleCancel();
          })
          .catch((error) => console.log(error)) 
      });
    });
  } 

  handleFile = (e) => {            
    this.setState({ ...this.state, image: e.target.result});
  }

  handleFileValue = (fileObject) => {      
    const fileReader = new FileReader();
    fileReader.onloadend = this.handleFile;
    
    this.setState({ ...this.state, imageChanged: true, fileValue: fileObject.name, file: fileObject }, 
      () => fileReader.readAsDataURL(fileObject)
    );      
  }

  render() {
    const { classes } = this.props;
    const { 
      tabValue, 
      inEdit, 
      file,
      docs,
      selectedIndex,
      data,
      image
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
            <ViewPublication 
                selectedIndex={selectedIndex} 
                handleClick={this.handleClick} 
                docs={docs}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
            />}
        {tabValue === 'EDIT' && 
            <EditPublication 
                handleValueChange={this.handleValueChange}
                file={file}
                data={data}
                handleCancel={this.handleCancel}
                handleSave={this.handleSave}                    
                handleFileValue={this.handleFileValue}                    
                image={image}                
            />}
      </div>
    );
  }
}

Publication.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Publication);
