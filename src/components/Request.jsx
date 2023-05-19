import RequestedWord from "./requestedWord";
import SmoothList from 'react-smooth-list';
import React, { useEffect, useState } from "react";
import "./cssFile/availableWords.css"
import {persistenceApi} from './apis';
function Request(){
    const[words,setWords] = useState([])
    useEffect( () => {
        persistenceApi.get("/actions")
            .then( (response) => {
                console.log(response.data);
                setWords(response.data.map( (wordObject) => wordObject.name));
            });
    }, []);    
    const wordsList= words.map(word=><RequestedWord word={word}/>)
    return(
        
        <SmoothList>
            <div class="center">
             <ul>
                 {wordsList}
                 </ul>
            </div>
            
        </SmoothList>
    )
}
export default Request