import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        {this.props.list.map(n=> {
          return <Todo key = {n.id} todo ={n.name} />
        })}
      </div>
    )
  }
}
