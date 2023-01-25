import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { context } from '../../App';
import Attempt from './attempt';
import Failed from './failed';
import Win from './win';

const Attempts = () => {
    const { currentWord, setKeyChar, solved, isEnded, setScore, setFailed, failed, setGoodWords, setSemiBadWords, setBadWords } = useContext(context);
    const [init, setInit] = useState(false);
    const [trys, setTrys] = useState(0)
    const [currentDiv, setCurrentDiv] = useState(0);
    const [sta, setSta] = useState('');

    const [attempts, setAttempts] = useState([
        { id: 0, done: false, isSolved: false },
        { id: 1, done: false, isSolved: false },
        { id: 2, done: false, isSolved: false },
        { id: 3, done: false, isSolved: false },
        { id: 4, done: false, isSolved: false },
        { id: 5, done: false, isSolved: false },
    ]);


    useEffect(() => {
        if (solved && isEnded) {
            setScore(0);
            if (trys > 0) {
                const scores = (600 / trys);
                setScore(scores);
            }else{
                setScore(50);
            }
        }

        if (!isEnded) {
            setAttempts([
                { id: 0, done: false, isSolved: false },
                { id: 1, done: false, isSolved: false },
                { id: 2, done: false, isSolved: false },
                { id: 3, done: false, isSolved: false },
                { id: 4, done: false, isSolved: false },
                { id: 5, done: false, isSolved: false },
            ]);
            setTrys(0);
            setCurrentDiv(5);
        }

        console.log(currentWord);
    }, [isEnded]);

    useEffect(() => {
        if (init) {
            if (currentDiv <= 4) {
                setCurrentDiv(currentDiv + 1);
                setTrys(trys + 1);
            } else {
                if (trys === 5  && !solved) {
                    setFailed(true);
                }
                setCurrentDiv(0);
                setTrys(0);
            }
        } else {
            setInit(true);
        }
        setKeyChar("");
        setBadWords([]);
        setSemiBadWords([]);
        setGoodWords([]);
        
    }, [attempts])



    return (
        <div className="screen">
            {solved && <Win status={sta} setSta={setSta} />}
            {failed && !solved && <Failed />}
            {attempts?.map(item => (<Attempt key={item.id} attempts={attempts} setAttempts={setAttempts} done={attempts[item.id].done} cId={currentDiv} id={item.id} currWord={currentWord} />))}
        </div>
    )
}

export default Attempts;