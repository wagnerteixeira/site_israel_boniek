import React, { Component } from 'react';
import Text from '../utils/Text';
import './Video.css';
import baseService from '../services/baseService';

const videoService = baseService('video');

class Video extends Component {
    constructor(props){
        super(props);
        this.state = { 
            videos: {},                         
        };      
        this.fetchVideos.bind(this);  
    }

    fetchVideos(){    
        console.log(videoService)
        videoService.getDocsOrderBy('position')
          .then(docs => {
            this.setState({ videos: docs })      
          })
          .catch( error => console.log(error));
        }

    componentWillMount(){
        this.fetchVideos();
    }
    
    renderVideos(){        
        return Object.keys(this.state.videos).map(key => {            
            return (
                <iframe className='item-video' key={key}
                    width='32%' 
                    height='315px' 
                    title={this.state.videos[key].data.url}
                    src={`https://www.youtube.com/embed/${this.state.videos[key].data.idYoutube}`} 
                    frameBorder='0' 
                    allow='autoplay; encrypted-media'
                    allowFullScreen 
                />
            )
        });        
        }
    
    render() {  
        return (
            <div className='container-video' id='video'>
                <Text title='Videos' colortitle='#333333' reverse />  
                <div className="cards-video">
                {this.renderVideos()}      
                </div>                        
            </div>            
          );
        }      
    }

export default Video;
