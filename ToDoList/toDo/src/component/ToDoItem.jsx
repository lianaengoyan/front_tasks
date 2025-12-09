import "./ToDoItem.css";

export const ToDoItem = ({text, id, completed, onRemove, isCompleted}) => {
    return (
        <div className={`todoItem ${completed ? "completed" : ""}`}> 
            <h3 style={{textAlign:"center", textDecoration: completed ? "line-through" : "none"}}> {text} </h3>
            <div className="btn">
                <button onClick={() => onRemove(id)}> delete </button>
                <button onClick={() => isCompleted(id)}> {completed ? "cancel" : "complete"} </button>
            </div>
        </div>
    )
}
