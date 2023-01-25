import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { context } from '../../App';

const Hint = () => {
    const { setSHowHint, currentWord, isEnded } = useContext(context);
    const [wordBreak, setWordBreak] = useState([]);
    const [hintTxt, setHintTxt] = useState([{ start: '', end: '' }]);
    const [canHint, setCanHint] = useState(false);
    const [hintAttemts, setHintAttempts] = useState(100);

    const  [key, setKey] =useState("");
    const hintBtn = useRef();

    useEffect(()=>{
        if (key === "?") {
            hintBtn.current.click();
        }
    }, [key])

    window.addEventListener("keyup", e=>{
        setKey(e.key)
    })

    useEffect(() => {
        setCanHint(!isEnded);
    }, [isEnded])

    useEffect(() => {
        const word = currentWord.split('');
        setWordBreak(word);
    }, [currentWord]);

    const getHit = () => {
        if (canHint && hintAttemts > 0) {
            const arr = wordBreak;
            let startTxt = '';
            let endTxt = '';
            switch (arr.length) {
                case 6:
                    startTxt = `${arr[0]}${arr[1]}`;
                    endTxt = `${arr[arr.length - 2]}${arr[arr.length - 1]}`;
                    break;
                case 5:
                    startTxt = `${arr[0]}${arr[1]}`;
                    endTxt = `${arr[arr.length - 2]}${arr[arr.length - 1]}`;
                    break;

                default:
                    startTxt = `${arr[0]}`;
                    endTxt = `${arr[arr.length - 1]}`;
                    break;
            }
            setHintTxt({ start: startTxt, end: endTxt });
            setHintAttempts(hintAttemts - 1);
            setSHowHint({ start: startTxt, end: endTxt });
        }
    }

    return (
        <div className="hint" ref={hintBtn} onClick={getHit}>
            <section>
                <span>❔</span>
            </section>
        </div>
    )
}

export default Hint;