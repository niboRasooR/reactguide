import React from 'react';

const validation = (props) => {
  if(props.text.length < 5){
    return (<p> Too short! </p>);
  }
  else return (<p> ENOUGH!</p>);
}

export default validation;