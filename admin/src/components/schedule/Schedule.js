import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditShedule from './EditSchedule';
import ViewSchedule from './ViewSchedule';

import firebase from '../../firebase';
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
            date: new Date().toISOString().slice(0, 16),
            title: '',
            file: {},
            urlFolder: '',
            location: '',
            selectedIndex: 0,
            docs: []
        };        
    }

    componentWillMount() {
      this.fetchImages();
    }

    fetchImages = () => {    
      scheduleService.getDocs()
        .then(documents => {               
          this.setState({    
            ...this.state,         
            value: 'LIST', 
            emAlteracao: false,
            date: new Date().toISOString().slice(0, 16),
            title: '',
            file: {},
            urlFolder: '',
            location: '',            
            selectedIndex: 0,
            docs: documents,
          });            
        })
        .catch(error => console.log(error));
      //this.renderImages();  
    }

    handleClick = (event, id) => {      
      this.setState({ ...this.state, selectedIndex: id });
    }

    handleSave = () => {    
      console.log(this.state);
      
      let schedule = {
        id : '',
        data : {
          date: this.state.date,
          title: this.state.title,
          location: this.state.location,
          urlFolder: this.state.urlFolder,
        }
      }
      scheduleService.createDoc(schedule.data)
        .then((doc) => {
            console.log('Criado')
            schedule.id = doc.id;
            this.saveFileImage(schedule, this.state.file);
        })
        .catch((error) => console.log(error));
    }

    saveFileImage(schedule, file){
      console.log('saveFileImage');
      console.log(schedule)    
      var uploadTask = scheduleService.createFileImage(schedule.id, file);
  
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
        }
      }, error => {
        console.log('error in save file image ' + error)// Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          schedule.data.urlFolder = downloadURL;        
          scheduleService.updateDoc(schedule)
            .then(() => {                              
                this.fetchImages();
            })
            .catch((error) => console.log(error)) 
        });
      });
    }  

    handleCancel = () => {
      this.setState({...this.state, value: 'LIST'});
      this.fetchImages();
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
                date,
                title,
                file,
                location
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
                    date={date}
                    title={title}
                    file={file}
                    data={this.state.docs[this.state.selectedIndex].data}
                    location={location}
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
