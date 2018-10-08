import React, { Component } from 'react';

import Text from '../utils/Text';
import './Lecture.css';
import baseService from '../services/baseService';

const lectureService = baseService('lectures');

class Lecture extends Component {
    constructor(props){
        super(props);
        this.state = { docs : {} };      
        this.fetchLectures.bind(this);  
    }

    fetchLectures(){    
        lectureService.getDocs()
          .then(docs => {
            this.setState({ docs: docs })      
          })
          .catch( error => console.log(error));
        }

    componentWillMount(){
        this.fetchLectures();
    }
    
    renderLecture(){
        console.log(this.state.docs);    
        return Object.keys(this.state.docs).map(doc => 
            <div key={this.state.docs[doc].id} className="card-lecture">                              
                <h3 className="name-lecture">
                  <a>
                    {this.state.docs[doc].data.title}                    
                  </a>
                </h3>                      
                <h4 className="title-lecture">
                  {this.state.docs[doc].data.keyword}
                </h4> 
                <div className="sinopsys-lecture">
                    {this.state.docs[doc].data.sinopsys}
                </div>                     
              </div> 
            );        
        }
    
    render() {  
        return (
            <div className="container-lecture" id="lecture">
                <Text title="Palestras" colortitle="white" reverse />
                <div className="cards-lecture">                        
                    {this.renderLecture()}
                </div>
            </div>            
          );
        }      
    }

export default Lecture;
