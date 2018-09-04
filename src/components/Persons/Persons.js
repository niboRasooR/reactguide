import React, { PureComponent } from 'react';
import Person from './Person';
import ProptTypes from 'prop-types';

class Persons extends PureComponent {

  constructor (props){
    super(props);
    //construct  a ref
    this.lastPersonRef = React.createRef();
  }

 componentWillReceiveProps(nextProps){

 }


 componentWillUpdate(nextProps, nextState){
  console.log(" persons.js WILLUPDATE");

 }
 // nyt PureComponent hoitaa tämän:
 /*shouldComponentUpdate(nextProps, nextState){
    console.log(" Update persons.js shouldComponentUpdate " + nextProps + " - " + nextState)
    //return true;
    return nextProps.persons !== this.props.persons 
    || nextProps.changed !== this.props.changed
    || nextProps.clicked!== this.props.clicked
}*/

  componentDidUpdate(){
    console.log("persons.js did update");
  }



  render(){
    // Tätä propsia ei tarvita, koska 
    // käytetään App.Js:ssä context-apia tähän
   // authenticated={this.props.isAuthenticated}
    return ( this.props.persons.map( (item, index) => {
      return <Person 
         clicked={this.props.clicked}
         name={item.name} 
         age={item.age} 
         ref={this.lastPersonRef} 
         key={item.id}
         changed={ (event) => {
           this.props.changed(event, item.id)
         }}
       />
    }));
  }
  
};


export default Persons;