import React from "react";
import Word from "./Word";
import SmoothList from 'react-smooth-list';
import "./cssFile/avilableWords.css"
function AvilableWords(){
    const words =["ahmad","mohsen","mohammad","saba7"]
    const wordsList= words.map(word=><Word word={word}/>)
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
export default AvilableWords