import { ToDoProvider } from "./context/Todo-provider";
import { ToDoList} from "./components/ToDoList";
import "./StyleApp.css"

export default function App() {
  return (
    <div className="container">
      <ToDoProvider>
        <ToDoList />
      </ToDoProvider>
    </div>
  )
}

