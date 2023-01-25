import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { context } from '../../App';

const InputChar = ({ i, testCase, done, func }) => {

    const {goodWords, setGoodWords, semiBadWords, setSemiBadWords, badWords, setBadWords} = useContext(context);

    const [cl, setCl] = useState("");
    const [cX, setCX] = useState("");

    useEffect(() => {
        let txtCl = '';
        testCase.forEach(element => {
            if (element.id === i.id) {
                const test = i.char === element.char;
                if (test) {
                    txtCl = 'match';
                    func({ans:"true", char: i.char});
                    setGoodWords([...goodWords, i.char]);
                }
            } else if (element.char === i.char && txtCl === '') {
                if (element.id !== i.id) {
                    txtCl = "found";
                    setSemiBadWords([...semiBadWords, i.char]);
                }
                func({ans:"false", char: i.char});
            }else{
                setBadWords([...badWords, i.char]);
            }
        });

        setCl(txtCl)

    }, [i.char])

    useEffect(()=>{
        if (done) {
            setCX(cl)
        }
    }, [done])
    return (
        <div className={`cell ${cX === "match" && "match"} ${cX === "found" && "found"}`}>{i.char !== '' && <span>{i.char}</span>}</div>
    )
}

export default InputChar;