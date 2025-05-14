import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Attempts from './components/parts/attempts';
import Hint from './components/parts/Hint';
import Keyboard from './components/parts/keyboard';
import ShowHint from './components/parts/ShowHint';
// import Win from './components/parts/win';
import { alphabets } from './components/resource/alphabets';
import { toMoney } from './components/resource/tools';
import level_easy from './components/resource/words/level_easy';
import level_hard from './components/resource/words/level_hard';
import level_mid from './components/resource/words/level_mid';

export const context = React.createContext();

const App = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [keyChar, setKeyChar] = useState('');
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [showHint, setSHowHint] = useState("");
  const [highscore, setHighscore] = useState(0);
  const [hintAttemts, setHintAttempts] = useState(5);
  const [level, setLevel] = useState('easy');
  const [word, setWord] = useState([]);

  const [badWords, setBadWords] = useState([]);
  const [semiBadWords, setSemiBadWords] = useState([]);
  const [goodWords, setGoodWords] = useState([]);

  const initiateLocalHighscore = () =>{
    const localStore = localStorage;
    const data  = localStore.getItem("game_highscore");
    if(data === null){
      localStore.setItem("game_highscore", JSON.stringify(0));
    }else{
      const res = JSON.parse(data);
      setHighscore(res);
    }
  }

  const generateNewWord = () =>{
    const index = Math.floor(Math.random() * word.length);
    return word[index];
  }

  const nextWord = () =>{
    setCurrentWord('');
    setCurrentWord(generateNewWord());
    setSolved(false);
    setFailed(false);
    setKeyChar('');
  }

  const changeLevel = (params) =>{
    if (params === 'easy') {
      setWord(level_easy);
    }else if(params === 'hard'){
      setWord(level_hard);
    }else if(params === 'mid'){
      setWord(level_mid);
    }else{
      setWord(level_easy);
    }
  }

  useEffect(()=>{
    changeLevel(level);
    initiateLocalHighscore();
  }, [level]);

  useEffect(()=>{
    word.length > 0 && nextWord();
  }, [word]);

  useEffect(()=>{
    if (!isEnded) {
      setScoreTotal(scoreTotal + score);
    }
  }, [isEnded]);
  
  useEffect(()=>{
    setIsEnded(solved);
  }, [solved]);
  
  useEffect(()=>{
    setIsEnded(failed);
  }, [failed]);

  const resetGame = () => {
    setCurrentWord("");
    setKeyChar('');
    setSolved(false);
    setFailed(false);
    setIsEnded(false);
    setSHowHint("");
    setHintAttempts(5);
    setWord([]);
    setBadWords([]);
    setSemiBadWords([]);
    setGoodWords([]);

    setScore(0);
    setScoreTotal(0);

    nextWord();
  };


  return (
    <context.Provider value={{ showHint, resetGame, hintAttemts, setHintAttempts, goodWords, setGoodWords, semiBadWords, setSemiBadWords, badWords, setBadWords, highscore, setHighscore, setSHowHint,currentWord, word, alphabets, scoreTotal, keyChar, setKeyChar, score, setScore, solved, setSolved, isEnded, setIsEnded, failed, setFailed, nextWord }}>
      <div className="app">
        <div className="board">
          <ShowHint/>
          <Hint/>
          <span className='scr'>score: {toMoney(scoreTotal)}'pts</span>
          {currentWord && <Attempts/>}
          {!currentWord && <div className="screen">Loading...</div> }
          <Keyboard />
        </div>
      </div>
    </context.Provider>
  )
}

export default App;