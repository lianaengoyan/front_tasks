import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getStudents, getSubjects, getGrades } from "./features/journal/journalSlice"
import type { AppDispatch } from "./store/store"
import './App.css'
import {JournalTable} from "./components/JournalTable"

function App() {
    const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getStudents())
    dispatch(getSubjects())
    dispatch(getGrades())
  }, [dispatch])


  return (
    <div>
        <JournalTable />
    </div>
  )
}

export default App
