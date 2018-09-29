import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getPublications, createPublication } from './services/publicationService';
import { getImages, createImage, createImage2, createFileImage } from './services/imageService';
import { getShedules, createShedule } from './services/sheduleService';
import { getSpeeches, createSpeech } from './services/speechService';
import { getUsers, createUser } from './services/userService';
import firebase from 'firebase';

import image from './media/1.png'

class App extends Component {
  constructor(props){
    super(props);
    this.state = { docs : {} };
  }

  /*getPublications(){
    publicationService.getPublications()
      .then(querySnapshot => {
        this.setState({ docs: querySnapshot.docs })      
      })
      .catch( error => console.log(error));
  }

  componentWillMount(){
    this.getPublications();
  }*/

  uidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  saveImage(file){    
    console.log(file)
    let image = {
      url: 'url da imagem',
      description: 'Descrição da imagem', 
      fileName: this.uidv4()
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
        createImage2(image)
          .then((document) => {
             console.log('Criado')
             console.log(document)
          })
          .catch((error) => console.log(error))
      });
    });    
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={ (e) => this.saveImage(e.target.files[0]) } />
        <p>{JSON.stringify(this.state.docs)}</p>
      </div>
    );
  }
}

export default App;
