import React from 'react';
import { useContext } from 'react';
import { context } from '../../App';

const Failed = () => {
    const {currentWord, scoreTotal, highscore} = useContext(context)
    return (
        <div className="end">
            <div className="sc l">{scoreTotal}</div>
            <div className="cont l">
                <div className="animated-text">
                    <span>Y</span><span>o</span><span>u</span><span> </span><span>F</span><span>a</span><span>i</span><span>l</span><span>e</span><span>d</span>
                </div>
                <div className="cuw">{currentWord} ❌</div>
                <div className="cuw">🤡Your Score: [{scoreTotal}] - Highscore: [{highscore}]😎</div>
                <div className="btxs">
                    <div className="btx no">End Game</div>
                </div>
            </div>
        </div>
    )
}

export default Failed;