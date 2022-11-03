import './App.css';

import Homepage from "./pages/Homepage";

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element = {<Homepage/>}/>
        </Routes>

      </BrowserRouter>
 
    
  );
}

export default App;