import React from 'react';
import { useContext } from 'react';
import { context } from '../../App';
import Key from './key';

const Keyboard = () => {
  const { alphabets } = useContext(context);
  
  return (
    <div className="keyboard">
      {alphabets.map(i => <Key i={i} key={i} />)}
    </div>
  )
}

export default Keyboard;