
import './App.css';
import CameraScreen from './components/CameraScreen';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import BotNavigation from './components/nav';
import AvilableWords from './components/AvilableWords';
import Request from './components/Request'
function App() {
  return (
    <BrowserRouter>
      <BotNavigation/>
     <Routes>
        <Route path ="/camera" element ={<CameraScreen/>}/>
         <Route path='/AvilableWords' element={<AvilableWords/>}/>
         <Route path='/request' element={<Request/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
