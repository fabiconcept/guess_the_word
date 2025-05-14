import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { context } from '../../App';

const Hint = () => {
    const { setSHowHint, currentWord, isEnded, hintAttemts, setHintAttempts, showHint, failed, solved } = useContext(context);
    const [wordBreak, setWordBreak] = useState([]);
    const [canHint, setCanHint] = useState(false);

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
        if(showHint) return;
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
            setHintAttempts(hintAttemts - 1);
            setSHowHint({ start: startTxt, end: endTxt });
        } else {
            setSHowHint({ start: "", end: "", exhausted: true });
        }
    }

    if (failed && !solved) return null;
    if (solved) return null;

    return (
        <div className="hint" ref={hintBtn} onClick={getHit}>
            <section>
                <span>❔</span>
            </section>
        </div>
    )
}

export default Hint;