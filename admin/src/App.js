import React, { Component } from 'react'
import logo from './logo.svg';
//import './App.css';
import { getPublications, createPublication } from './services/publicationService';
import { getImages, createImage, createFileImage, deleteImage } from './services/imageService';
import { getShedules, createShedule } from './services/sheduleService';
import { getSpeeches, createSpeech } from './services/speechService';
import { getUsers, createUser } from './services/userService';
import firebase from 'firebase';

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

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

  saveImage(file){    
    console.log(file)
    let image = {
      url: 'url da imagem',
      description: 'Descrição da imagem', 
      fileName: this.uuidv4()
    }

    var uploadTask = createFileImage(image, file);

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
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        image.url = downloadURL;
        createImage(image)
          .then((document) => {
             console.log('Criado')
             console.log(document)
             this.fetchImages();             
          })
          .catch((error) => console.log(error))
      });
    });    
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
      <p>
        <a href={this.state.docs[key].url}>{this.state.docs[key].url}</a><br />
        
        <button onClick={() => this.deleteImage(key)}> Excluir</button>
      </p>
    );
  }
  render() {      
    //getPublications.then(docs => console.log(docs));    
    

   /* createImage(image, file)
      .then(() => console.log("Criado"))
      .catch(error => console.log(error));*/


    /*let publication = {      
      title: "Titulo",
      subtitle: 'Subtítulo',
      urlImage: 'url da imagem',
      sinopsys: 'sinópse da publicação',      
    };

    createPublication(publication)
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
        <p>{this.renderImages()}</p>
      </div>
    );
  }
}

export default App
