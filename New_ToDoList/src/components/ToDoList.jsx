import { List } from "./List";
import { AddToDo } from "./AddToDo";
import { ToDoFilter } from "./ToDoFilter";

export const ToDoList = () => {
    return (
      <div>
        <AddToDo />
        <ToDoFilter />
        <List />
      </div>
    );
  };
  