import { useState } from "react";
import { ToDoContext } from "./todo-context";

export const ToDoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const filterTodos = todos.filter(todo => {
    if(filter === "active") return !todo.completed;
    if(filter === "completed") return todo.completed;
    return true;
  })

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const delToDo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));  
  }

  const toggleTodo = (id) => {
    setTodos(prev => 
        prev.map(todo => todo.id === id ? 
        {...todo, completed: !todo.completed} : todo)
    )
  }

  return (
    <ToDoContext.Provider value={{ todos: filterTodos, setFilter, filter, addTodo, delToDo, toggleTodo }}>
      {children}
    </ToDoContext.Provider>
  );
};
