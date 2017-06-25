import React, { Component } from 'react';
import './App.css';

import classnames from 'classnames';
import * as firebase from 'firebase';

import Todo from './Todo';

class App extends Component {

  constructor() {
    super();
    this.state = {counter: 10, todos: [], inputValue: ''};

    this.addCounter = this.addCounter.bind(this);
    this.subtractCounter = this.subtractCounter.bind(this);

    this.rootRef = firebase.database().ref();
    this.counterRef = this.rootRef.child('counter');
    this.todosRef = this.rootRef.child('todos')
  }

  componentDidMount() {
    this.rootRef.on('value', snap => {
      this.setState({counter: snap.child('counter').val()});
      this.setState({todos: snap.child('todos').val() || []});
    });
  }

  // these methods are messy, but you can refactor everything into subcomponents

  addCounter() {
    this.counterRef.set(this.state.counter + 1);
  }

  subtractCounter() {
    this.counterRef.set(this.state.counter - 1);
  }

  addTodo(val) {
    const todo = {text: val, checked: false}
    this.state.todos.push(todo);
    this.rootRef.set({todos: this.state.todos, counter: this.state.counter});
    this.setState({inputValue: ''});
  }

  checkTodo(text, checked, i) {
    this.todosRef.child(i).set({text: text, checked: !checked});
    this.state.todos.map((todo) => {
      if(i !== this.state.todos.indexOf(todo)) return todo.checked = true;
    });
  }

  removeTodo(i) {
    const remainder = this.state.todos.filter((todo) => {
      if(i !== this.state.todos.indexOf(todo)) return todo;
    });
    this.rootRef.set({todos: remainder, counter: this.state.counter});
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleKeyPress(e) {
    if(e.key == 'Enter'){
      this.addTodo(this.state.inputValue);
    }
  }

  render() {
    const todoList = this.state.todos.map((todo, i) => (
      <Todo key={i} index={i} text={todo.text} checked={todo.checked} checkTodo={this.checkTodo.bind(this)} removeTodo={this.removeTodo.bind(this)} />
    ))

    return (
      <div className="App container">
        <div className="row well">
          <h1>Something</h1>
        </div>
        <div className="row jumbotron counter">
          <div className="col-md-3">
            <p className="lead">{this.state.counter}</p>
          </div>
          <div className="col-md-3">
            <div className="btn-group">
              <button className="btn btn-danger" onClick={this.subtractCounter}>-</button>
              <button className="btn btn-success" onClick={this.addCounter}>+</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-inline todoInput">
            <input
              className='form-control'
              value={this.state.inputValue}
              onKeyPress={e => this.handleKeyPress(e)}
              onChange={evt => this.updateInputValue(evt)}/>
            <button
              className={classnames('btn', `btn-${this.state.inputValue ? 'success' : 'default'}`)}
              onClick={() => this.addTodo(this.state.inputValue)}
              disabled={!this.state.inputValue}>
              Add
            </button>
          </div>
        </div>
        <div>
          {todoList}
        </div>
      </div>
    );
  }
}

export default App;
