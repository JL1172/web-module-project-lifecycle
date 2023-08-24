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
      visible2 : false,
      selection : "",
      disable : false,
      messageTodo : "",
      patchValue : "",
    }
  }
  //!methods
  //!change handlers
  change = e => {
    if (this.state.disable) return;
    this.setState({...this.state, addedTodo : e.target.value})
  }
  changeSelect = e => {
    this.setState({...this.state, selection : e.target.value})
  }
  patchChange = e => {
    this.setState({...this.state, patchValue : e.target.value})
  }
  //!change handlers
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
    if (this.state.disable) {
      return;
    } else {
    e.target.classList.toggle("completed")
    this.setState({...this.state, list : this.state.list.map(n=> {
      if (n.id === idOfItem) {
        return {...n, completed : !n.completed}
      } return n;
    })})}
  /*
  //!this is one method
   patchData(`http://localhost:9000/api/todos/${idOfItem}`)
     .then(res=> {
       console.log(res.data)
     })
     .catch(err=> {
       console.log(err + " patch did not work");
     })
   }
    //!this is one method
    */
  }
  clear = e => {
    const filter = this.state.list.filter(n=> !n.completed);
    this.setState({...this.state, list : filter})
  }
  edit = e => {
    this.setState({visible : !this.state.visible, disable : !this.state.disable})
    }
  
  edit2 = e => {
    if (e.target.value) {
      const name = this.state.list.filter(n => n.id === e.target.value)
      this.setState({visible2 : true, messageTodo : name[0].name})
    }
  }
  //*most importantone
  finishEdit = () => {
    const newObject =  {
      name : this.state.patchValue,
      id : this.state.selection,
      completed : false,
    }
    postData(URL,newObject).then(res=> { 
      this.setState({...this.state, list : this.state.list.map(n=> {
          if (n.id === newObject.id) {
            return {...n, name : newObject.name, completed : newObject.completed}
          }
          return n;
        }),addedTodo : "", visible2 : false})})}
    //*most importantone
  //!methods
  componentDidMount() {
    fetchData().then(res=> {
      this.setState({...this.state, message : res.message, list: res.data.map(n=> {
        return {...n, completed : false}
      })})
    })
  }
  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <TodoList toggle = {this.toggle} list = {this.state.list}/>
        <Form list = {this.state.list} edit = {this.edit} clear = {this.clear}
         addedTodo = {this.state.addedTodo} visible = {this.state.visible}
         visible2 = {this.state.visible2} edit2 = {this.edit2} patchChange = {this.patchChange} patchValue = {this.state.patchValue}
         selection = {this.state.selection} changeSelect = {this.changeSelect} messageTodo = {this.state.messageTodo}
        submit = {this.submit} change = {this.change} disable = {this.state.disable}
        finishEdit = {this.finishEdit} />
      </div>
    )
  }
}
