import React, { Component } from 'react';
import logo from '../logo.svg';
import classnames from './App.css';
import Person from '../components/Persons/Person';
import UserInput from '../components/UserInput';
import UserOutput from '../components/UserOutput';
import Validation from '../components/Validation';
import CharComponent from '../components/CharComponent';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilary';
import Cockpit from '../components/Cockpit/Cockpit';
//import Radium from 'radium';
import Persons from '../components/Persons/Persons';

//outside class EXPORT it to everyone
export const AuthContext = React.createContext(false);


class App extends Component {

  constructor (props){
    super(props);
    this.state = {
      persons: [
        {id: 0, name: 'Arska', age: '51' },
        {id: 1, name: 'Jack', age: '40'},
        {id: 2, name: 'Jennifer', age: '27' }
      
      ],
      randomPersons: [
        {name: 'Random', age: '33'}
      ],
      users: [
        {id: 0, name: 'user'}
      ],
      visiblePersons: true, 
      enteredText: '',
      toggleClickedTimes: 0,
      usrAuthenticated: false

      }
      
  }

  componentDidMount(){

  }

 componentWillUpdate(nextProps, nextState){
    console.log(" app.js WILLUPDATE");
  }


 static getDerivedStateFromProps(nextProps, prevState){
  console.log(" GETDERIVEDSTATEFROMPROPS() ");

  return prevState;

 }
 
 //snap the dom
 getSnapshotBeforeUpdate(){
  console.log("app.js SNAP!!!!");
  
 }

 shouldComponentUpdate(nextProps, nextState){
    console.log(" app.js shouldComponentUpdate " + nextProps + " - " + nextState)
    return true;
  }

  componentDidUpdate(){
    console.log("app.js did update");
  }

  /* event handleri..*/
  switchNameHandler = () => {
    let i = Math.floor(Math.random()*Math.floor(this.state.persons.length));
    let age = this.state.persons[i].age;
    let name = this.state.persons[i].name;
    this.setState( 
      {
        randomPersons: [
          { name: name, age: age}
        ]
      }
    );
  }

  togglePersonsHandler = () => {
     const v = this.state.visiblePersons;
     this.setState((previousState, props) => 
     {
       return {
        visiblePersons: !v,
        toggleClickedTimes: previousState.toggleClickedTimes +1
       }
       
      });
  }

  changeToName = (newName) => {
    this.setState({
      persons: [
        {name: 'Arska', age: '51' },
        {name: newName, age: '40'},
        {name: 'Jennifer', age: '27' }
      ]
    })
  }

  inputUserHandler = (event) => {
    this.setState(
      {
        users:[
          {id: 0, name: event.target.value}
        ]
      }
    )
  }

  charListChangedHandler = (event) => {
    this.setState({
      enteredText: event.target.value
    })
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( (dude)=>{
      return dude.id === id; //return true or false
    })


    //get all the properies of the chosen object
    //  with the help of spread operator ...
    const chosenperson = {
      ...this.state.persons[personIndex]

    } 
    // Sama toisella tavalla
    //const chosenDude = Object.assign({}, this.state.persons[personIndex]);
    chosenperson.name = event.target.value;

    const personsarraycopy = [...this.state.persons];
    personsarraycopy[personIndex] = chosenperson;

    //Still updating the entire array
    this.setState({
      persons: personsarraycopy
      
      
    })
  }

  deletePersonHandler = (personIndex ) => {
   // const dudes = this.state.persons.slice(); //copy
    const dudes2 = [...this.state.persons]; //spread to list in a new[  ] 
    dudes2.splice(personIndex, 1); //remove one
    this.setState({persons: dudes2});
  }

  deleteCharacterHandler = (character, index) => {
    console.log( ' HERE INDEX ' + index + ': ' + character);
    index.toString();
    if(index.isNaN){
      console.log( " index is NOT a number " + index);
    }
    else console.log(" index a number");

    let number = parseInt(index);
    let text = this.state.enteredText;
    console.log("remove char at " +index);
    let array = text.split('');
    array.splice(number, 1);
    let newStr = array.join('');
    
    this.setState({enteredText: newStr});

  }

  loginHandler = () => {
    this.setState({usrAuthenticated: true})
  }


  render() {
   /* const styleObject = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1 px solid blue',
      padding: '8px',
      cursor: 'pointer' //,

      //Radiumin kanssa
      //':hover': {
      //  backgroundColor: 'lightGreen',
      //  color: 'red'
     // }

    }
*/

    let p1 = this.state.persons[0];
    let p2 = this.state.persons[1];
    let p3 = this.state.persons[2];

    let personsdiv = null;
    let str = this.state.enteredText;
    let array = str.split('');

    let btnClass = '';

    let charListDiv = (
      <div>
       
        {
          array.map( 
              (character, index) => {
                return <CharComponent
                        click={() => this.deleteCharacterHandler( character, index)}
                        char={character}
                        key={index}
                        />
              }
          )

        }
        
      </div>
    );

    btnClass = classnames.Red;

    if (this.state.visiblePersons){
      //tätä propsia ei tarvita koska käytetään contextapia
      // isAuthenticated = {this.state.usrAuthenticated}
      personsdiv = (
        
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
         
        />

      );

     // styleObject.backgroundColor='red';
     /* styleObject[':hover'] = {
        backgroundColor: 'lightRed',
        color: 'yellow'
      };*/
    }
 
      // Radiumin kanssa voisi käyttää className={classnames.join(' ') }
    // <withClass classNames={classnames.App}>
    return (
      <Aux>
        <button onClick={() => {this.setState({visiblePersons: true})}}>Show Persons</button>
        <Cockpit 
              personClicked={this.deletePersonHandler}
              togglePersonsHandler = {this.togglePersonsHandler}
              persons={this.state.persons}
              defaultName={this.state.users[0].name}
              charListChanged = {this.charListChangedHandler}
              enteredText = {this.state.enteredText}
              inputUserChange = {this.inputUserHandler} 
              charListDiv = {charListDiv}
              login={this.loginHandler}
            
        />
        <AuthContext.Provider value={this.state.usrAuthenticated}>
          {personsdiv}
        </AuthContext.Provider>
      </Aux>
         
    );

   
      //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Juhaa nested'), 'Juhan React createelement');
  }
}

export default withClass(App, classnames.App);
//export default Radium(App);
