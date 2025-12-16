import { useContext } from "react"
import { ToDoContext } from "../context/todo-context"

export const ToDoFilter = () => {
    const {filter, setFilter} = useContext(ToDoContext);

    return (
        <div className="filters">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}> All </button>
            <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}> Active </button>
            <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}> Completed </button>
        </div>
    )
}