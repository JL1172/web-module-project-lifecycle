import React from 'react';
import TodoList from './TodoList';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

async function fetchData() {
  const res = await axios.get(URL)
  try {
    return res.data;
  } catch {
    console.log(new Error)
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message : "",
      list : [],
      addedTodo : "",
    }
  }
  componentDidMount() {
    fetchData().then(res=> {
      this.setState({...this.state, message : res.message, list : [...this.state.list, ...res.data]})
    })
  }
  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <TodoList list = {this.state.list}/>
      </div>
    )
  }
}
