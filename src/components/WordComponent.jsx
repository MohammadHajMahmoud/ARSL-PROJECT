import React, { useState } from "react";
import ReactModal from 'react-modal';
import "./cssFile/availableWords.css";
import {persistenceApi} from './apis';

function WordComponent( {word} ) {
    const [isViewingDemo, setIsViewingDemo] = useState(false);
    const [demo, setDemo] = useState(null);
    const [demoType, setDemoType] = useState(null);

    const loadDemo = async () => {
        if (demo) {
            return;
        }
        const response = await persistenceApi.get(`/actions/${word}/demo`, { responseType: 'blob' });
        setDemo(URL.createObjectURL(response.data));
        setDemoType(response.headers['content-type']);
    }

    return(
        <li key={word}>
            <span onClick={ async () => { 
                await loadDemo().then(()=>setIsViewingDemo(true));
                }}> 
                {word} 
            </span>
                     
            <ReactModal
            className={"popup"}
            isOpen={isViewingDemo}
            contentLabel="word demo"
            onRequestClose={() => setIsViewingDemo(false) }>

                <video controls>
                    <source src={demo} type={demoType} />
                    Your browser does not support the video tag.
                </video>
            
            </ReactModal>
        </li>
        );
}

export default WordComponent;