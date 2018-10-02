import React, { Component } from 'react'
import logo from './logo.svg';
//import './App.css';
import { getImages, createImage, createFileImage, deleteImage, changeImage } from './services/imageService';
import  baseService from './services/baseService' ;
import firebase from 'firebase';

var publicationService = baseService('publications');
var scheduleService = baseService('schedules');
var speechService = baseService('speeches');
var userService = baseService('users');

class App extends Component {
  constructor(props){
    super(props);
    this.state = { docs : {} };
    this.fetchImages.bind(this)
  }
  fetchImages(){
    getImages()
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
    var uploadTask = createFileImage(image.id, file);

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
        changeImage(image)
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

    createImage(image)
      .then((doc) => {
          console.log('Criado')
          image.id = doc.id;
          this.saveFileImage(image, file);
      })
      .catch((error) => console.log(error))       
  }

  deleteImage(key){
      deleteImage(key)
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
    
    console.log(publicationService);
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
          Titulo: <input type="text" name="fname"/><br/>
          Sinopse: <input type="text" name="lname"/><br/>
          <button> Incluir</button>
        </div>
      </div>
    );
  }
}

export default App
