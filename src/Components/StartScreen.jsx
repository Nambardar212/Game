import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import GamePlayScreen from "./GamePlayScreen";
// import { getLocalData, storeData } from "./LocalStorage";
import "./StratScreen.css";

const StartScreen = () => {
    // const [state, setState] = useState(getLocalData(userName));
    const [count, setCount] = useState(0);
    // const [state, setState] = useState(localStorage.getItem("userName"));
    // // const navigate = useNavigate();
    const [gamePlay, setGamePlay] = useState(false);

    

     
    
    const handleButton = () => {
        setCount(count + 1);

        setGamePlay(true);
        // localStorage.setItem("userName", count + 1);
    }


    // const value = localStorage.getItem("userName");
    // console.log(value);

    return (
        <>
          
          {
             gamePlay ? (
                <GamePlayScreen 
                setCount = {setCount} 
                count = {count}
                />
             ) : (
                <div className="buttonContainer">
                    <h3>Number of times played: {count}</h3>
                    <button className="button" onClick={handleButton }>Start</button>
                </div>
                
             )
          }
        </>
    )
}

export default StartScreen;