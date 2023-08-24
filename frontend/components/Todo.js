import React from 'react';

export default class Todo extends React.Component {
  render() {
    return (
      <div onClick={(e) => this.props.toggle(e,this.props.id)}>
        {this.props.todo}
      </div>
    )
  }
}
