import { useState } from "react";
import { ToDoList } from "./ToDoList";

export const AddToDo = ({onAdd}) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!text.trim()) {
            return setError("You need to write something")
        }

        onAdd(text);
        setText("");
        setError("");
    }

    return (
        <div>
            {error && <p className="errStyle" style={{color: "red"}} > {error}</p>}
            <form onSubmit={handleSubmit}>
                <input className="inputBtn" type="text"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        placeholder="Add a task to do" />
                <button className="addBtn" type="submit">add</button>
            </form>
        </div>
    )
}