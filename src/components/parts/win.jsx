import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { context } from '../../App';

const Win = ({status, setSta}) => {
    const {nextWord, currentWord, score, highscore, setHighscore, scoreTotal} = useContext(context);
    const  [key, setKey] =useState("");
    const nextBtn = useRef();

    const saveToLocal = () =>{
        const localStore = localStorage;
        const setLocal = localStore.setItem("game_highscore", JSON.stringify(scoreTotal + score));
        setHighscore(scoreTotal + score)
    }

    useEffect(()=>{
        if (status === '') {
            if (scoreTotal > highscore) {
                setSta('isSet');
            }
        }else{
            setSta('set');
        }
        
        if (scoreTotal > highscore) {
            saveToLocal();
        }
    }, [])

    useEffect(()=>{
        if (key === "Enter") {
            nextBtn.current.click();
        }
    }, [key]);

    window.addEventListener("keyup", e=>{
        setKey(e.key);
    })

    return (
        <div className="end">
            <div className="sc">{score}</div>
            <div className="cont">
                {status === "" && <div className="animated-text">
                    <span>C</span><span>o</span><span>n</span><span>g</span><span>r</span><span>a</span><span>t</span><span>u</span><span>l</span><span>a</span><span>t</span><span>i</span><span>o</span><span>n</span><span>s</span>
                </div>}
                {status === "set" && <div className="animated-text">
                    <span>C</span><span>o</span><span>n</span><span>g</span><span>r</span><span>a</span><span>t</span><span>u</span><span>l</span><span>a</span><span>t</span><span>i</span><span>o</span><span>n</span><span>s</span>
                </div>}
                {status === "isSet" &&<div className="animated-text">
                <span>N</span><span>e</span><span>W</span><span> </span><span>H</span><span>i</span><span>g</span><span>h</span><span>s</span><span>c</span><span>o</span><span>r</span><span>e</span>
                </div>}
                <div className="cuw">{currentWord} ✔</div>
                <div className="btxs">
                    <div ref={nextBtn} className="btx" onClick={nextWord}>Next word</div>
                    <div className="btx no">End Game</div>
                </div>
                <br />
                <br />
                {status === "" && <div className="cuw">Highscore: [{highscore}] 😎</div>}
                {status === "isSet" && <div className="cuw">💥 You're the Highest Scorer 💥</div>}
            </div>
        </div>
    )
}

export default Win;