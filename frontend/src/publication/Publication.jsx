import React, { Component } from 'react';

import Modal from './Modal';
import Text from '../utils/Text';
import './Publication.css';
import baseService from '../services/baseService';

const publicationService = baseService('publications');

class Publication extends Component {
    constructor(props){
        super(props);
        this.state = { 
            pubs : {}, 
            show: false, 
            data : { 
                children: '', 
                sinopsys: '', 
                urlFolder: ''
            }
        };       
        this.fetchPublications.bind(this);  
    }

    fetchPublications(){    
        publicationService.getDocsOrderBy('position')
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
                        data: this.state.pubs[key].data
                        });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    renderPublication(){
        const { pubs } = this.state;                
        return Object.keys(pubs).map(key => 
            <div key={pubs[key].id} className="card-pub">                
                <img alt={pubs[key].data.title} 
                    title="Clique para mais informações"
                    className="picture-pub" 
                    src={pubs[key].data.urlFolder} 
                    onClick={() => this.showModal(key)} 
                />                
                <h3 className="name-pub">
                    <a>
                    {pubs[key].data.title}                    
                    </a>
                </h3>                      
                <h4 className="title-pub">
                  {pubs[key].data.subtitle}
                </h4>                      
            </div> 
        );        
    }
    
    render() {  
        const { data, show } = this.state;
        return (
            <div className="container-publication" id="publication">
                <Text title="Publicações" colortitle="#333333" reverse />
                <div className="cards-pub">
                    <Modal show={show} 
                        handleClose={this.hideModal} 
                        children={data.children}
                        sinopsys={data.sinopsys}
                        urlFolder={data.urlFolder}
                        >                   
                    </Modal>
                        {this.renderPublication()}
                </div>
            </div>            
          );
        }      
    }

export default Publication;
