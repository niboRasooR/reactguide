import React from 'react';
import './UserOutput.css';
//import Radium from 'radium'
const person = (props) => {
  return (
    <div className='person'>
      <h3>Olen onnellinen henkilö-konponentti!</h3>
      <p onClick={props.click}>Nimeni on {props.name} olen {props.age} vuotta.
      <br />
      {props.children}
      </p>
      <input type="text" onChange={props.changed}  />
    
    </div>

  )
   
  
 }
//export default Radium(person);
 export default person;