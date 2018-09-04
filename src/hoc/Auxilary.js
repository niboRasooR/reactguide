import React from 'react';

//Kannattaa käyttää tällaista
// wrapperiä, koska välttämättä div ei ole paras, ja voi 
// jopa haitata tyyliä flexboxia käytettäessä.

// React 16 sisältää tämän saman tyhjänä <> 
const aux = (props) => 
  props.children;

export default aux;
