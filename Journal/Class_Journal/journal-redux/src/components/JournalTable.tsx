import React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import GradeCell from "./GradeCell"
import "./journalTable.css"

export const JournalTable: React.FC = () => {
  const students = useSelector((state: RootState) => state.journal.students)
  const subjects = useSelector((state: RootState) => state.journal.subjects)
  const grades = useSelector((state: RootState) => state.journal.grades)

  const findGrade = (studentId: number, subjectId: number) =>
    grades.find(g => g.studentId === studentId && g.subjectId === subjectId)

  return (
    <div className="all">
        <p className="classJournal">Class Journal</p>
        <div className="table-wrapper">
            <table className="journal-table">
                <thead>
                <tr>
                    <th className="name-column">Name</th>
                    {subjects.map(s => (
                    <th key={s.id}>{s.title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                    <td className="name-column">{student.name}</td>
                    {subjects.map(subject => (
                        <GradeCell
                        key={subject.id}
                        studentId={student.id}
                        subjectId={subject.id}
                        existingGrade={findGrade(student.id, subject.id)?.value}
                        />
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
