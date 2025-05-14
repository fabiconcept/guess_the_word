import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { context } from '../../App';
import InputChar from './inputChar';

const Attempt = ({ setAttempts, attempts, done, cId, id }) => {
    const {keyChar, currentWord, setSolved, isEnded} = useContext(context);
    const [word, setWord] = useState([]);

    const [correctArr, setCorrectArr] = useState([])

    const [testCase, setTestCase] = useState([])

    useEffect(()=>{
        if (keyChar !== '' && id === cId) {
            !isEnded && addChar(keyChar);
        }
    }, [keyChar]);

    const addChar = (a) =>{
        word.slice().reverse().forEach(element => {
            if (element.char === '') {
                setWord(word.map(i=>{
                    if (i.id === element.id) {
                        return{...i, char: a}
                    }
                    return i;
                }))
            }
        });
    }


    useEffect(()=>{
        if (word.length > 0 && word[word.length-1].char !== '') {
            setAttempts(attempts.map(i=>{
                if (i.id === id) {
                    return {...i, done: true}
                }
                return i;
            }));
        }

    },[word])

    useEffect(()=>{
        let canProceed = true;
        if (id===cId) {
            if (word.length > 0 && word[word.length-1].char !== '') {
                if (correctArr.length === word.length) {
                    correctArr.forEach(element => {
                        if (element.ans === "false") {
                            canProceed = false;
                        }
                    });
    
                    if (canProceed) {
                        setSolved(true);
                        setCorrectArr([])
                    }
                }
            }
        }
    }, [correctArr, word])

    useEffect(()=>{
        setCorrectArr([])
    }, [isEnded])

    useEffect(() => {
        const arr = currentWord.split("");
        let pairs = [];

        const testArr = currentWord.split('');
        let testPair = []
        arr.forEach(element => {
            const id = (Math.random().toString(25).slice(2));
            const char = '';

            pairs.push({char, id, correct: false});
        });

        for (let i = 0; i < testArr.length; i++) {
            const id = (pairs[i].id);
            const char = testArr[i];

            testPair.push({char, id})
        }
        
        setTestCase(testPair);
        setWord(pairs);
    }, [currentWord]);

    function fix(params) {
        setCorrectArr([...correctArr, params]);
    }


    return (
        <div className={`attempt ${id === cId && !isEnded && "current"} ${done && "done"}`}>
            {id === cId ? <span>🟡</span> : done ? <span>🔴</span>:<span>⚪</span> }{word.map(i=> <InputChar key={i.id} i={i} done={done} func={fix} testCase={testCase} />)}
        </div>
    )
}

export default Attempt;