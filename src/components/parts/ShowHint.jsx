import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { context } from '../../App';

const ShowHint = () => {
    const { setSHowHint, showHint, hintAttemts } = useContext(context);
    const [txt, setTxt] = useState('');

    useEffect(()=>{
        if (showHint?.exhausted) {
            setTxt("You've used up your hints");
            return;
        }
        if (showHint?.start) {
            setTxt(`(${hintAttemts} Left): Word starts with: [${(showHint?.start).toUpperCase()}] and ends with: [${(showHint?.end).toUpperCase()}]`)
        }
    }, [showHint?.start, showHint?.exhausted]);

    setTimeout(() => {
        setSHowHint('');
        setTxt('');
    }, 5000);

    return (
        <div className="hintDiv">
            {txt !=="" && <span>{txt}</span>}
        </div>
    )
}

export default ShowHint;