import React, { useState } from "react";
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player';
import "./cssFile/availableWords.css";
import {persistenceApi} from './apis';

function WordComponent( {word} ) {
    const [isViewingDemo, setIsViewingDemo] = useState(false);
    const [demo, setDemo] = useState(null);
    
    return(
        <li key={word}>
            <span onClick={() => {
                setIsViewingDemo(true);
                }}>{word}
            </span>
                     
            <ReactModal
            className={"popup"}
            isOpen={isViewingDemo}
            contentLabel="word demo"
            onAfterOpen={ () => {
                persistenceApi.get(`/actions/${word}/demo`)
                    .then( (response) => {
                        const arrayBuffer = response.data;
                        const blob = new Blob([arrayBuffer], { type: 'video/mp4' });
                        setDemo(URL.createObjectURL(blob));
                    });
            }}
            onRequestClose={() => setIsViewingDemo(false) }>

                <ReactPlayer url={demo}/>
            
            </ReactModal>
        </li>
        );
}
export default WordComponent;