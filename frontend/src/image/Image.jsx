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
            midIndex: 0,
        }
        this.fetchImages.bind(this);
    }

    fetchImages(){    
        imageService.getDocs()
            .then(docs => {
                let midIndex = parseInt((docs.length / 2) - 1 + (docs.length % 2));
                //console.log(`length ${docs.length} mod ${docs.length % 2} media ${Math.round(docs.length / 2)} midIndex ${midIndex}`);
                //console.log(this.state.docs[midIndex]);
                this.setState({ docs: docs, midIndex: midIndex })      
            })
            .catch( error => console.log(error));    
    }

    componentWillMount(){
        this.fetchImages();        
    }
    
    renderImages(index) {
        let prev = 0, prevLeftSecond =0, next = 0, nextRightSecond = 0, midIndex = parseInt(index);
        prev = midIndex - 1;
        prevLeftSecond = prev - 1;
        next = midIndex + 1;
        nextRightSecond = next + 1;       
        return Object.keys(this.state.docs).map(key => {
            let keyIndex = parseInt(key);
            let currentClass = '';
            if (keyIndex === midIndex)
                currentClass = 'selected';
            else if (keyIndex === prev)
                currentClass = 'prev';
            else if (keyIndex === prevLeftSecond)
                currentClass = 'prevLeftSecond';
            else  if (keyIndex === next)
                currentClass = 'next';
            else if (keyIndex === nextRightSecond)
                currentClass = 'nextRightSecond';
            else if (keyIndex > nextRightSecond)
                currentClass = 'hideRight';
            else if (keyIndex < prevLeftSecond)
                currentClass = 'hideLeft';
            //console.log(`index ${key}  prev ${prev} prevLeftSecond ${prevLeftSecond} next ${next} nextRightSecond ${nextRightSecond} class ${currentClass}`);
            return (<div key={key} className={currentClass}>
                        <img onClick={() => this.setIndex(key)} src={this.state.docs[key].data.url} />
                    </div>);
        });
    }

    setIndex(index){
        if ((index < this.state.docs.length) && (index >= 0)){
            this.setState({ ...this.state, midIndex: parseInt(index)});
        }
    }
    
    render() {
        const { urlCurrent, midIndex } = this.state;                
        return (                
            <div className="container-image" id="image">  
                <div className="image" > 
                    <Text title="Fotos" colortitle="#333333" reverse />  
                    <div id="carousel">
                        {this.renderImages(midIndex)}
                    </div>
                    <div className="im-buttons">
                        <img className="im-left" onClick={() => this.setIndex(this.state.midIndex - 1)}src={Left}/>             
                        <img className="im-right" onClick={() => this.setIndex(this.state.midIndex + 1)} src={Right}/>                                        
                    </div>
                </div>
            </div>     
        );
    }
}

export default Image;