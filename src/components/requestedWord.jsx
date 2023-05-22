import React, { useRef } from 'react';
import "./cssFile/availableWords.css";
import { Link } from "react-router-dom";
function RequestedWord({ word }) {
  const liRef = useRef(null);

  const handleClick = () => {
    const linkElement = liRef.current.querySelector('.link');
    if (linkElement) {
      linkElement.click();
    }
  };
  return (
    <li ref={liRef} onClick={handleClick} className="link-li">
      <Link className="link"  to={`/upload-video/${word}`}>{word}</Link>
    </li>
  );
}
export default RequestedWord;
