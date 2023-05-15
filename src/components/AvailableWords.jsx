import React, { useEffect, useState } from "react";
import Word from "./WordComponent";
import SmoothList from 'react-smooth-list';
import "./cssFile/availableWords.css";
import {persistenceApi} from './apis';

function AvailableWords(){
    const [words, setWords] = useState([]);

    useEffect( () => {
        persistenceApi.get("/actions")
            .then( (response) => {
                console.log(response.data);
                setWords(response.data.map( (wordObject) => wordObject.name));
            });
    }, []);

    return(
        <SmoothList>
            <div className="center">
                <ul>
                    {words.map( (word) => <Word word = {word}/> )}
                 </ul>
            </div>
        </SmoothList>
    );
}
export default AvailableWords;