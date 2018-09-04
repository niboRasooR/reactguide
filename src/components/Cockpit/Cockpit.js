import React from 'react';
import classnames from './Cockpit.css';

import UserInput from '../UserInput';
import UserOutput from '../UserOutput';
import Validation from '../Validation';
import Aux from '../../hoc/Auxilary';
const cockpit = (props) => {

  const otherCSS = [];
  let btnClass = '';
  
  if(props.visiblePersons){
    btnClass = classnames.Red;
  }
  
  


  if(props.persons.length <= 2){
   otherCSS.push(classnames.red);
  }
  if(props.persons.length <=1){
   otherCSS.push( classnames.bold);
  }

  return (
    <Aux>
      <header className={classnames.Appheader}>
         
         <h1 className={classnames.Apptitle}>Welcome to React</h1>
       </header>
       <div className={classnames.Appintro}>
       <div className={otherCSS.join(' ')}> Input sandbox!!! </div>
         <UserInput changed={props.charListChanged} currentName={props.enteredText} />
         <p>{props.enteredText}</p>
         <Validation text={props.enteredText} />
         {props.charListDiv}
         <UserInput changed={props.inputUserChange} currentName={props.defaultName}/>
         <UserOutput username={props.defaultName}/>
       <button className={btnClass}  onClick={
         props.togglePersonsHandler
       }>toggle
       </button>
       
      </div>
      <button onClick={props.login}>Sign in </button>
    </Aux>
    

  );
};

export default cockpit;