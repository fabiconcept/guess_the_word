import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { context } from '../../App';

const ShowHint = () => {
    const {setSHowHint, showHint} = useContext(context)
    const [txt, setTxt] = useState('');

    useEffect(()=>{
        if (showHint?.start) {
            setTxt(`Word starts with: [${(showHint?.start).toUpperCase()}] and ends with: [${(showHint?.end).toUpperCase()}]`)
        }
    }, [showHint?.start])

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