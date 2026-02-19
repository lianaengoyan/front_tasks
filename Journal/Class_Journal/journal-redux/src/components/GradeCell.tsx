import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addGrade } from "../features/journal/journalSlice"
import type { AppDispatch } from "../store/store"

interface Props {
  studentId: number
  subjectId: number
  existingGrade?: number
}

const GradeCell: React.FC<Props> = ({ studentId, subjectId, existingGrade }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        const num = Number(value)
        if (num >= 1 && num <= 10) {
            dispatch(
            addGrade({
                studentId,
                subjectId,
                value: num
            })
            )
            setIsEditing(false)
            setValue("")
        } else {
            alert("Enter from 1 to 10")
        }
        }
    }

    if (existingGrade) {
        return (
        <td className="grade-cell filled">{existingGrade}</td>
        )
    }

    return (
        <td
        className="grade-cell"
        onClick={() => setIsEditing(true)}
        >
        {isEditing ? (
            <input
            type="number"
            min="1"
            max="5"
            autoFocus
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            />
        ) : null}
        </td>
    )
}

export default GradeCell
