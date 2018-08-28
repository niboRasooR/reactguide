import React from 'react';
import './UserOutput.css';

const userinput = (props) => {
  const inputStyle = {
    border: '2px solid green'
  }
  return(
    <div className="UserOutput">
       <input type="text" 
          style={inputStyle}
          onChange={props.changed}
           value={props.currentName}/>
    </div>
  )
}

export default userinput;