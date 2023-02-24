import React from 'react';
import './App.css';
// import GamePlayScreen from './Components/GamePlayScreen';
import LoginScreen from './Components/LoginScreen';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import StartScreen from './Components/StartScreen';


function App() {

  

  return (
     <Router>
      <Routes>
        <Route path='/' element ={<LoginScreen />} />
        <Route path='/start' element={<StartScreen />} />
        {/* <Route path='/gameplay' element={<GamePlayScreen />} /> */}
      </Routes>
     </Router>
  );
}

export default App;
