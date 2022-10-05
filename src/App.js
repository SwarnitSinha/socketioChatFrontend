import './App.css';

import Homepage from "./pages/Homepage";

import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom"





function App() {

  console.log(sessionStorage.getItem("Username"));
  return (
    
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element = {<Homepage/>}/>
        </Routes>

      </BrowserRouter>
 
    
  );
}

export default App;