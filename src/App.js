import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './components/Person';
import UserInput from './components/UserInput';
import UserOutput from './components/UserOutput';
import Validation from './components/Validation';
import CharComponent from './components/CharComponent';
//import Radium from 'radium';

class App extends Component {

  state = {
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
    enteredText: ''
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
     this.setState({visiblePersons: !v});
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

  render() {
    const styleObject = {
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


    let p1 = this.state.persons[0];
    let p2 = this.state.persons[1];
    let p3 = this.state.persons[2];

    let personsdiv = null;
    let str = this.state.enteredText;
    let array = str.split('');

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

    if (this.state.visiblePersons){
      personsdiv = (
        <div>
         { this.state.persons.map( (item, index) => {
           return <Person 
              click={this.deletePersonHandler.bind(this, index)}
              name={item.name} 
              age={item.age} 
              key={item.id}
              changed={ (event) => {
                this.nameChangedHandler(event, item.id)
              }}
            />
         })}
      
      </div>
      );

      styleObject.backgroundColor='red';
      styleObject[':hover'] = {
        backgroundColor: 'lightRed',
        color: 'yellow'
      };
    }
     
    let classnames = [];
    if(this.state.persons.length <= 2){
      classnames.push('red');
    }
    if(this.state.persons.length <=1){
      classnames.push('bold');
    }
      // Radiumin kanssa voisi käyttää className={classnames.join(' ') }
    return (
       <div className="App">
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        <div className={)}> Input sandbox!!! </div>
          <UserInput changed={this.charListChangedHandler} currentName={this.state.enteredText} />
          <p>{this.state.enteredText}</p>
          <Validation text={this.state.enteredText} />
          {charListDiv}
          <UserInput changed={this.inputUserHandler} currentName={this.state.users[0].name}/>
          <UserOutput username={this.state.users[0].name}/>

          <button onClick={
            this.switchNameHandler
          }>Switch name</button>
          Up next is: <br />
         <Person name={this.state.randomPersons[0].name} age={this.state.randomPersons[0].age} />
         <br />

        <button style={styleObject} onClick={
          this.togglePersonsHandler
        }>toggle</button>

        { 
         /* this.state.showPersons === true ?*/
            /* : null*/
            personsdiv
        }
        
       
        </div>
      </div>
    );

   
      //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Juhaa nested'), 'Juhan React createelement');
  }
}

export default App;
//export default Radium(App);
