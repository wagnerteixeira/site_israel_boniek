import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditEvent from './EditEvent';
import ViewEvent from './ViewEvent';
import eventService from '../../services/eventService';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,    
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class Event extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            tabValue: 'LIST',
            inEdit: false,
            imageChanged: false,
            file: {},
            selectedIndex: '0',
            image: '',            
            docs: [],
            data: {
              description: '',
              url: '',
            },
        };        
    }

    componentWillMount() {
      this.fetchEvents();
    }

    fetchEvents = () => {          
      eventService.getDocs()
        .then(documents => {               
          this.setState({    
            ...this.state,         
            tabValue: 'LIST', 
            inEdit: false,
            file: {},
            selectedIndex: '0',
            docs: documents,
            image: '',
            id : '',
            imageChanged: false,
            data: {
              description: '',
              url: '',
            },
          });            
        })
        .catch(error => console.log(error));      
    }

    handleClick = (event, id) => {   
      this.setState({ ...this.state, selectedIndex: id });
    }

    updateImage(image) {
      this.saveFileImage(image, this.state.file);
    }

    handleSave = () => {    
      console.log(this.state);
      if (this.state.inEdit){
        let event = {
          id : this.state.id,
          data : {...this.state.data}
        }

        eventService.updateDoc(event)
          .then(() => {
              if (this.state.imageChanged)
                this.updateImage(event)
              else
                this.handleCancel();
           })
          .catch((error) => console.log(error));
      }
      else{
        let event = {
          id : '',
          data : {...this.state.data}
        }
        eventService.createDoc(event.data)
          .then((id) => {
              console.log('Criado')
              event.id = id;            
              this.saveFileImage(event, this.state.file);
          })
          .catch((error) => console.log(error));
      }
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

    handleDelete = (key) => {
      eventService.deleteFileImage(this.state.docs[key].id)
        .then(() => { 
          eventService.deleteDoc(this.state.docs[key].id)
            .then(() =>  this.fetchEvents());
        });
    }

    saveFileImage(event, file){
      console.log('saveFileImage');
      console.log(event)    
      var uploadTask = eventService.createFileImage(event.id, file);
  
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
          event.data.url = downloadURL;        
          eventService.updateDoc(event)
            .then(() => {                              
              this.handleCancel();
            })
            .catch((error) => console.log(error)) 
        });
      });
    }  

    handleCancel = () => {
      this.setState({...this.state, inEdit: false, tabValue: 'LIST'});
      this.fetchEvents();
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

    handleValueChange = name => event => {      
      this.setState({...this.state, data: { ...this.state.data, [name]: event.target.value}});
    };

    handleImgaeChanged = () => this.setState({ ...this.state, imageChanged: true });
    

    handleTabChange = (event, value) => {
        this.setState({...this.state,  tabValue: value });
    };

    render() {
        const { classes } = this.props;
        const { tabValue, 
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
                  <ViewEvent 
                    selectedIndex={selectedIndex} 
                    handleClick={this.handleClick} 
                    docs={docs}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                  />
                }
                {tabValue === 'EDIT' && 
                  <EditEvent 
                    handleValueChange={this.handleValueChange}
                    file={file}
                    data={data}
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}                    
                    handleFileValue={this.handleFileValue}                    
                    image={image}
                  />
                }                
            </div>
        );
    }
}

Event.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Event);

