
import './App.css';
import CameraScreen from './components/CameraScreen';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import BotNavigation from './components/nav';
import AvailableWords from './components/AvailableWords';
import Request from './components/Request'
import UploadVideo from './components/uploadVideo';

function App() {
  return (
    <BrowserRouter>
      <BotNavigation/>
     <Routes>
        <Route path ="/translate" element ={<CameraScreen/>}/>
        <Route path='/available-words' element={<AvailableWords/>}/>
        <Route path='/request-sign' element={<Request/>}/>
        <Route path='/upload-video/:word' element={<UploadVideo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
