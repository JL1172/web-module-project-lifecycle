import React from 'react';
import TodoList from './TodoList';
import axios from 'axios';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos'

async function fetchData() {
  const res = await axios.get(URL)
  try {
    return res.data;
  } catch {
    console.log(new Error)
  }
}
async function postData(URL,obj) {
  const res = await axios.post(URL,obj)
  try {
    return res.data;
  } catch {
    return console.log(new Error); 
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
  change = e => {
    this.setState({...this.state, addedTodo : e.target.value})
  }
  submit = e => {
    e.preventDefault();
    const newObject = {
      id : Date.now(),
      name : this.state.addedTodo,
      completed : false,
    }
    postData(URL,newObject).then(res=> {
      console.log(res)
    })
    
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
        <Form addedTodo = {this.state.addedTodo} />
      </div>
    )
  }
}
