import React, { Component } from 'react';
import './Image.css';
import baseService from '../services/baseService';
import Text from '../utils/Text';
import Left from '../media/images/left-chevron.svg';
import Right from '../media/images/right-chevron.svg';

const imageService = baseService('images');

class Image extends Component {

    constructor(props){
        super(props);
        this.state = {
            docs: {},
            urlCurrent: '',
            index: 0,
            indexMax: 0,
        }
        this.fetchImages.bind(this);
    }

    fetchImages(){    
        imageService.getDocs()
            .then(docs => {
                console.log(docs[0]);
                this.setState({ docs: docs, urlCurrent: docs[0].data.url, index: 0 })      
            })
            .catch( error => console.log(error));    
    }

    componentWillMount(){
        this.fetchImages();
    }

    nextProperty = () => {
        var newIndex = this.state.index + 1; 
        if (newIndex > this.state.docs.length-1) 
        {
            newIndex = 0;       
        }
        this.setState({ ...this.state, index : newIndex, urlCurrent: this.state.docs[newIndex].data.url});
    }

    prevProperty = () => {
        var newIndex = this.state.index - 1;   
        if (newIndex < 0){
            newIndex = this.state.docs.length-1;
        }     
        this.setState({ ...this.state, index : newIndex, urlCurrent: this.state.docs[newIndex].data.url});    
    }

    showImage(key, index) {
        this.setState({ ...this.state, index: index, urlCurrent: this.state.docs[key].data.url})
    }   

    render() {
        const { urlCurrent } = this.state;        
        return (    
            <div className="image" id="image">      
                <Text title="Fotos" colortitle="#333333" reverse />          
                <div className="im-content" > 
                    <img className="im-current" src={ urlCurrent }/>                   
                    <div className="im-buttons">
                        <img className="im-left" onClick={this.prevProperty} src={Left}/>
                        <img className="im-right" onClick={this.nextProperty} src={Right}/>                                        
                    </div>
                </div>
            </div>        
        );
    }
}

export default Image;