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
async function patchData(URL,obj) {
  const res = await axios.patch(URL,obj)
  try {
    return res.data;
  } catch {
    return console.log(new Error)
  }
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message : "",
      list : [],
      addedTodo : "",
      visible : false,
      selection : "",
    }
  }
  //!methods
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
      this.setState({...this.state, list : [...this.state.list, res.data],addedTodo : ""})
    })
  }
  toggle = (e,idOfItem) => {
    e.target.classList.toggle("completed")
    this.setState({...this.state, list : this.state.list.map(n=> {
      if (n.id === idOfItem) {
        return {...n, completed : !n.completed}
      } return n;
    })})
  }
  clear = e => {
    const filter = this.state.list.filter(n=> !n.completed);
    this.setState({...this.state, list : filter})
  }
  edit = e => {

  }
  //!methods
  componentDidMount() {
    fetchData().then(res=> {
      this.setState({...this.state, message : res.message, list : [...this.state.list, ...res.data]})
    })
  }
  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <TodoList toggle = {this.toggle} list = {this.state.list}/>
        <Form list = {this.state.list} edit = {this.edit} clear = {this.clear}
         addedTodo = {this.state.addedTodo} visible = {this.state.visible}
         selection = {this.state.selection}
        submit = {this.submit} change = {this.change} />
      </div>
    )
  }
}
