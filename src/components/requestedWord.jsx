import React from "react";
import "./cssFile/availableWords.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function RequestedWord({ word }) {
  return (
    <li>
      <Link className="link" to={`/upload-video/${word}`}>{word}</Link>
    </li>
  );
}
export default RequestedWord;
