import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.submit}>
          <input type = "text" id = "add" name = "add"
          placeholder="add to list" onChange={this.props.change}
          value={this.props.addedTodo} />
          <input type="submit" value = "Add"/>
        </form>
        <button onClick={this.props.clear}>Clear Completed</button>
        <button onClick={this.props.edit}>Edit</button>
        {<select id = "select" value = {this.props.selected}>

          </select>}
      </div>
    )
  }
}
