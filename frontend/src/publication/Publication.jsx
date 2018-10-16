import React, { Component } from 'react';

import Modal from './Modal';
import Text from '../utils/Text';
import './Publication.css';
import baseService from '../services/baseService';


const publicationService = baseService('publications');

class Publication extends Component {
    constructor(props){
        super(props);
        this.state = { pubs : {}, 
                       show: false, 
                       childrenModal: '', 
                       sinopsysModal: '', 
                       urlFolderModal: '' };      
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

    showModal = (key) => {           
        this.setState({ show: true, 
                        childrenModal: this.state.pubs[key].data.title,
                        sinopsysModal: this.state.pubs[key].data.sinopsys,
                        urlFolderModal: this.state.pubs[key].data.urlFolder
                        });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    renderPublication(){
        console.log(this.state.pubs);    
        return Object.keys(this.state.pubs).map(key => 
            <div key={key} className="card-pub">                
              <img  alt={this.state.pubs[key].data.title} 
                    className="picture-pub" 
                    src={this.state.pubs[key].data.urlFolder} 
                    onClick={() => this.showModal(key)} />
                <h3 className="name-pub">
                  <a>
                    {this.state.pubs[key].data.title}                    
                  </a>
                </h3>                      
                <h4 className="title-pub">
                  {this.state.pubs[key].data.subtitle}
                </h4>                      
              </div> 
            );        
        }
    
    render() {  
        return (
            <div className="container-publication" id="publication">
                <Text title="Publicações" colortitle="#333333" reverse />
                <div className="cards-pub">
                    <Modal show={this.state.show} 
                        handleClose={this.hideModal} 
                        children={this.state.childrenModal}
                        sinopsys={this.state.sinopsysModal}
                        urlFolder={this.state.urlFolderModal}
                        >                   
                    </Modal>
                        {this.renderPublication()}
                </div>
            </div>            
          );
        }      
    }

export default Publication;
