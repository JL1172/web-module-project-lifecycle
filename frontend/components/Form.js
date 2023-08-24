import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.submit}>
          <input type = "text" id = "add" name = "add"
          placeholder="add to list" onChange={this.props.change}
          value={this.props.addedTodo} />
          <input disabled = {this.props.disable} type="submit" value = "Add"/>
        </form>
        <button disabled = {this.props.disable} onClick={this.props.clear}>Clear Completed</button>
        <button onClick={this.props.edit}>{this.props.visible ? "Click to exit edit mode" : "Edit"}</button>
        {this.props.visible && <select onClick={(e)=>this.props.edit2(e)} id = "select" value = {this.props.selection} onChange={this.props.changeSelect} >
          <option value = "">--Select--</option>
            {this.props.list.map(n => {
              return <option  key = {n.id} value = {n.id}>{n.name}</option>
            })}
          </select>}
          {this.props.visible2 && <label>What are you replacing {this.props.messageTodo} with</label>}
          {this.props.visible2 && <input type = "text" value = {this.props.patchValue} onChange={this.props.patchChange} />}
          {this.props.visible2 && <button onClick={this.props.finishEdit}>Finish Edit</button>}
      </div>
    )
  }
}
