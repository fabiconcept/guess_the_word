import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { context } from '../../App';

const Key = ({ i }) => {
    const {setKeyChar, solved, goodWords, semiBadWords, badWords} = useContext(context);
    const keyRef = useRef();

    const [lightState, setLightState] = useState(0);

    useEffect(()=>{
        if (semiBadWords.includes(i)) {
            setLightState(1);
        }
    }, [goodWords, semiBadWords, badWords])

    window.addEventListener("keydown", e => {
        const key = e.key;
        autoClick(key);
    })

    function autoClick(key) {
        if (key.toLowerCase() === i.toLowerCase() && !solved) {
            keyRef.current.click();
            keyRef.current.classList.add("click");
        }
    }

    const typing = () =>{
        setKeyChar(i)
    }


    function removeClass(){
        keyRef.current.classList.remove("click");
    }

    return (
        <div className={`key ${lightState === 1 && 'y'} ${lightState === 2 && 'g'}`} onClick={()=>typing(i)} onAnimationEnd={removeClass} ref={keyRef}>{i}</div>
    )
}

export default Key;