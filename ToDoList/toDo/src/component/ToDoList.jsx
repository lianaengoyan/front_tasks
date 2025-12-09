import { useState } from "react"
import { AddToDo } from "./AddToDo";
import { List } from "./List";

export const ToDoList = () => {
    const [todos, setTodos] = useState([
        // {id: 101, text: "go to the gym", completed: false},
        // {id: 102, text: "read a book", completed: false},
        // {id: 103, text: "eat a burger", completed: true},
    ]);

    const removeItem = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const addTask = (task) => {
        const newTodo = {
            id: Date.now(),
            text: task,
            completed: false
        };

        setTodos([...todos, newTodo]);
    }

    const isCompleted = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }

    return (
        <div>
            <AddToDo onAdd={addTask}/>
            <List
                items={todos}
                onRemove={removeItem} 
                isCompleted={isCompleted}
            />
        </div>
    )
}
