import React, { useEffect, useState } from "react";
import RequestedWord from "./requestedWord";
import SmoothList from 'react-smooth-list';
import React, { useEffect, useState } from "react";
import "./cssFile/availableWords.css"
import { persistenceApi } from "./apis";

function Request(){
    const [words, setWords] = useState([]);
    useEffect(() => {
        persistenceApi.get('/actions', { params: { "require-gathering": "true" } } )
            .then( (response) => {
                setWords(response.data.map( (wordObject) => wordObject.name));
            })
    }, []);

    return(
        
        <SmoothList>
            <div class="center">
             <ul>
                 {words.map(word=><RequestedWord word={word}/>)}
                 </ul>
            </div>
            
        </SmoothList>
    )
}
export default Request