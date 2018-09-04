import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Person.css';
import withClass from '../../hoc/withClass';
import Aux from '../../hoc/Auxilary';
import {AuthContext} from '../../containers/App';
//import Radium from 'radium'
//   <div className={style.Person}>
class Person extends Component {

  constructor (props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount(){
    //check if first component on list and focus input
    if(this.props.position === 0){
      this.inputElement.current.focus();
    }
  }
  render () {
    // tätä ei käytetä koska käytetään AuthContext
    //  {this.props.authenticated ? <p>I'm logged in</p> : null}
    return (
      <Aux>
        <AuthContext.Consumer>
          {auth => auth ? <p>I'm logged in</p> : null}
        </AuthContext.Consumer>
      
        <h3>Olen onnellinen henkilö-konponentti!</h3>
        <p onClick={this.props.clicked}>Nimeni on {this.props.name} olen {this.props.age} vuotta.</p>
        <p>{this.props.children}</p>
        <input 
            ref={this.inputElement}
            type="text"
            onChange={this.props.changed} 
             />
      
      </Aux>
  
    );

    // Voi myös palauttaa taulukkona mutta silloin divi puuttuu
    /*return [
      <p  key="1" onClick={this.props.clicked}>Nimeni on {this.props.name} olen {this.props.age} vuotta.</p>,
      <p key="2" >{this.props.children}</p>,
      <input key="3" type="text" onChange={this.props.changed}  />

    ]*/
  }
   
  foucs(){
    this.inputElement.current.focus();
  }
 }

 Person.propTypes = {
  clicked: PropTypes.func, 
  name: PropTypes.string,
  age:  PropTypes.number,
  changed: PropTypes.func, 
  key: PropTypes.string
};
 
//export default Radium(person);
 export default withClass(Person, style.Person);