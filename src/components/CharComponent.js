import React from 'react';
import './CharComponent.css';
const charcomponent = (props) => {
  return (
    <li onClick={props.click} className='charComponent'>{props.char}</li>
  );
  
}

export default charcomponent;