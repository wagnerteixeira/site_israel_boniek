import React, { Component } from 'react';

import Text from '../utils/Text';
import './Publication.css';
import baseService from '../services/baseService';


const publicationService = baseService('publications');

class Publication extends Component {
    constructor(props){
        super(props);
        this.state = { pubs : {} };      
        this.fetchPublications.bind(this);  
    }

    fetchPublications(){    
        publicationService.getDocs()
          .then(docs => {
            this.setState({ pubs: docs })      
          })
          .catch( error => console.log(error));
        }

    componentWillMount(){
        this.fetchPublications();
    }

    renderPublication(){
        console.log(this.state.pubs);
        return Object.keys(this.state.pubs).map(pub =>            
              <div key={this.state.pubs[pub].id} className="card">
              <a className="picture-pub" style={{backgroundImage: `url('${this.state.pubs[pub].data.urlImage}')`}} ></a>
                <h3 className="name">
                  <a>
                    {this.state.pubs[pub].data.title}
                  </a>
                </h3>                      
                <h4 className="title-pub">
                  {this.state.pubs[pub].data.subtitle}
                </h4>                      
              </div>
            );        
        }
    
    render() {  
        return (
            <div id="publication">
                <div className="container-publication">
                    <Text title="Publicações" reverse />
                    <div className="cards">
                            {this.renderPublication()}
                    </div>
                </div>
            </div>
          );
        }      
    }

export default Publication;
