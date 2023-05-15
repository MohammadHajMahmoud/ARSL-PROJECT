
import './App.css';
import CameraScreen from './components/CameraScreen';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import BotNavigation from './components/nav';
import AvilableWords from './components/AvilableWords';
import Request from './components/Request'
import RequestedWord from './components/requestedWord';
import UploadVideo from './components/uploadVideo';
function App() {
  return (
    <BrowserRouter>
      <BotNavigation/>
     <Routes>
        <Route path ="/translate" element ={<CameraScreen/>}/>
        <Route path='/request-sign' element={<Request/>}/>
         <Route path='/avilable-words' element={<AvilableWords/>}/>
         <Route path='/upload-video/:word' element={<UploadVideo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
