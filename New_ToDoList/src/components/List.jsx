import { useContext } from "react"
import { ToDoContext } from "../context/todo-context"

export const List = () => {
    const {todos, delToDo, toggleTodo} = useContext(ToDoContext);

    if(todos.length === 0) return <p> No todos yet</p>;

    return (
        <div>
            <h3> Todos: {todos.length} </h3>
            {todos.map(todo => (
                <div className={`todo-item ${todo.completed ? "completed" : ""}`} key={todo.id}>
                    <div className="todo-text"> {todo.text} </div>

                    <div className="todo-buttons">
                        <button onClick={() => delToDo(todo.id)}> Delete </button>

                        <button onClick={() => toggleTodo(todo.id)}>
                            {todo.completed ? "Cancel" : "Complete"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}