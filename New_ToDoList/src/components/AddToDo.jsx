import { useContext, useState } from "react";
import { ToDoContext } from "../context/todo-context";

export const AddToDo = () => {
    const [text, setText] = useState("")
    const {addTodo} = useContext(ToDoContext);
    const [error, setError] = useState("");

    const handleAdd = () => {
        if(!text.trim()) {
            setError("Enter the text")
            return;
        }

        addTodo(text);
        setText("");
        setError("");
    }

    
    return (
        <div className="add-todo">
            {error && <p className="error"> {error} </p>}
            <input  
                className="input"
                type="text" 
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter todo" 

                onKeyDown={e => {
                    if(e.key === "Enter") handleAdd();
                }}
            />
            <button onClick={handleAdd}> Add </button>
        </div>
    )
}