import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listTodos } from './graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from './graphql/mutations';

import './App.css';

const initialFormState = { name: '', completed: false }

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    setTodos(apiData.data.listTodos.items);
  }

  async function createTodo() {
    if (!formData.name) return;
    await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    setTodos([ ...todos, formData ]);
    setFormData(initialFormState);
  }

  async function deleteTodo({ id }) {
    const newTodosArray = todos.filter(todo => todo.id !== id);
    setTodos(newTodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1 className="todo-heading">Todos</h1>
      <input
        className="todo-input"
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Todo name"
        value={formData.name}
      />
      <button className="todo-button" onClick={createTodo}>Create Todo</button>

      <div style={{marginBottom: 30}}>
        {
          todos.map(todo => (
            <div key={todo.id || todo.name}>
              <h2 className="todo-item">
                <span>{todo.name}</span>
                <button onClick={() => deleteTodo(todo)} className="todo-button">Delete</button>
              </h2>
              
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
