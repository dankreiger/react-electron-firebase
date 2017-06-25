import React, { Component } from 'react';
import classnames from 'classnames';

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
      <div className="container form-group">
        <div className="row text-center btn-group">
          <label className={classnames("btn", "btn-default", {"active": checked})} onClick={() => checkTodo(text, checked, index)}>
            {text}
          </label>
          <button className="btn btn-danger" key={`button-${index}`} onClick={() => removeTodo(index)}>-</button>
        </div>
      </div>
    )
  }

}

export default Todo;
