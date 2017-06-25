import React, { Component } from 'react';
import classnames from 'classnames';

import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false
    }
  }

  render(){
    const {text, index, removeTodo, checkTodo, checked} = this.props;
    return(
      <div className="">
        <div className="row">
          <label
            className={classnames("btn", `btn-${checked ? 'info' : 'default'}`)}
            onClick={() => checkTodo(text, checked, index)}>
            {text}
          </label>
          <button
            className="btn btn-danger"
            key={`button-${index}`}
            onClick={() => removeTodo(index)}>-</button>
        </div>
      </div>
    )
  }

}

export default Todo;
