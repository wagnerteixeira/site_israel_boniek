import React, { Component } from 'react'
import imageService from './services/imageService';
import baseService from './services/baseService';
import firebase from './firebase';

const publicationService = baseService('publications');
const scheduleService = './services/scheduleService';
let speechService = baseService('speeches');
let userService = baseService('users');

class App extends Component {
  constructor(props){
    super(props);
    this.state = { docs : {}, schedules: { title: '', sinopsys: ''} };
    this.fetchImages.bind(this)
    this.handleScheduleChange.bind(this)
    this.handleScheduleSubmit.bind(this)
  }
  fetchImages(){    
    imageService.getDocs()
      .then(docs => {
        console.log(docs)
        this.setState({ docs: docs })      
      })
      .catch( error => console.log(error));
    this.renderImages();  
  }

  componentWillMount(){
    this.fetchImages();
  }

  saveFileImage(image, file){
    console.log('saveFileImage');
    console.log(image)    
    var uploadTask = imageService.createFileImage(image.id, file);

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
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
        image.data.url = downloadURL;        
        imageService.updateDoc(image)
          .then(() => {
              console.log('Alterado');
              this.fetchImages();
          })
          .catch((error) => console.log(error)) 
      });
    }); 
  }  

  saveImage(file){    
    console.log(file)
    let image = {
      id : 0,
      data : {
        description: 'Descrição da imagem'
      }
    }

    imageService.createDoc(image)
      .then((doc) => {
          console.log('Criado')
          image.id = doc.id;
          this.saveFileImage(image, file);
      })
      .catch((error) => console.log(error))       
  }

  deleteImage(id){
    imageService.deleteDoc(id)
      .then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    this.fetchImages();
  }

  renderImages() {
    return Object.keys(this.state.docs).map(key =>
      <p key={this.state.docs[key].id}>
        <a href={this.state.docs[key].data.url}>{this.state.docs[key].data.url}</a><br />        
        <img src={this.state.docs[key].data.url} /><br />
        <button onClick={() => this.deleteImage(this.state.docs[key].id)}> Excluir</button>
      </p>
    );
  }

  handleScheduleChange = name => event => {
    this.setState({...this.state, schedules: {...this.state.schedules, [name] : event.target.value }});
  }

  handleScheduleSubmit() {
    console.log(this.state.schedules);
    scheduleService.createDoc({...this.state.schedules})
      .then(() => { 
        console.log("fudeu")
        this.setState({...this.state, schedules:  { title: '', sinopsys: ''}});
      })
      .catch(error => console.error("Erro ao incluir uma palestra:", error));
  }

  render() {      
   
    //getPublications.then(docs => console.log(docs));    
    

   /* createImage(image, file)
      .then(() => console.log("Criado"))
      .catch(error => console.log(error));*/


    let publication = {      
      title: "Titulo",
      subtitle: 'Subtítulo',
      urlImage: 'url da imagem',
      sinopsys: 'sinópse da publicação',      
    };
    
  /*  console.log(publicationService);
    publicationService.createDoc(publication)
      .then((doc) => console.log(doc))
      .catch(error => console.log(error));
    

    /*createPublication(publication)
      .then(() => console.log("Criado"))
      .catch(error => console.log(error));

    let shedule = {
      date: new Date(),
      title: 'Título',
      location: new firebase.firestore.GeoPoint(53, 25),
      urlFolder: 'url do folder'
    }
    createShedule(shedule)
      .then(() => console.log("Criado"))
      .catch(error => console.log(error));
      

    let speech = {
      title: 'Título da palestra',
      sinopsys: 'Sinópse da palestra'
    }
    
    createSpeech(speech)
      .then(() => console.log("Criado"))
      .catch(error => console.log(error));    

      getPublications.then(docs => console.log(docs));  
      getShedules.then(docs => console.log(docs));  
      getSpeeches.then(docs => console.log(docs));  
      getImages.then(docs => console.log(docs));  
    //const getPublications = firebase.db.publicationApi.doGetPublications();
    //console.log(getPublications);
    //console.log(publicationService.getPublications)
    //publicationService.getPublications().then(querySnapshot => console.log(querySnapshot));
    */
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={ (e) => this.saveImage(e.target.files[0]) } />
        <div >
          <h1> Palestra</h1>
          Titulo: <input type="text" name="titulo" onChange={this.handleScheduleChange('title')} value={this.state.schedules.title}/><br/>
          Sinopse: <input type="text" name="sinopse" onChange={this.handleScheduleChange('sinopsys')} value={this.state.schedules.sinopsys}/><br/>
          <button onClick={() => this.handleScheduleSubmit()}> Incluir</button>
        </div>
      </div>
    );
  }
}

export default App
