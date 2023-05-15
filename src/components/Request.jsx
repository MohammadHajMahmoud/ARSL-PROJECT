import React from "react";
import RequestedWord from "./requestedWord";
import SmoothList from 'react-smooth-list';
import "./cssFile/avilableWords.css"
function Request(){
    const words =["ahmad","mohsen","mohammad","saba7"]
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