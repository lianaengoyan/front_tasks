import { ToDoItem } from "./ToDoItem"

export const List = ({items, onRemove, isCompleted}) => {
    return (
        <div>
            <p className="todosLen"> {items.length} todos </p>
            {
                items.map(item => <ToDoItem 
                                    key={item.id}
                                    text={item.text}
                                    id={item.id}
                                    completed={item.completed} 
                                    onRemove={onRemove}
                                    isCompleted={isCompleted}
                />)
            }
        </div>
    )
}