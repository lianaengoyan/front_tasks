import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

type Student = {
  id: number
  name: string
}

interface Subject {
    id: number
    title: string
}

interface Grade {
    id?: number
    studentId: number
    subjectId: number
    value: number
}

interface JournalState {
    students: Student[]
    subjects: Subject[]
    grades: Grade[]
    loading: boolean
}

const initialState: JournalState = {
    students: [],
    subjects: [],
    grades: [],
    loading: false
}

export const getStudents = createAsyncThunk(
    "journasl/fetchStudents",
    async () => {
        const res = await fetch("http://localhost:3001/students")
        return res.json()
    }
)

export const getSubjects = createAsyncThunk(
  "journal/getSubjects",
  async () => {
    const res = await fetch("http://localhost:3001/subjects")
    return res.json()
  }
)

export const getGrades = createAsyncThunk(
    "journal/getGrade",
    async () => {
        const res = await fetch("http://localhost:3001/grades")
        return res.json()
    }
)

export const addGrade = createAsyncThunk(
    "journal/addGrade",
    async(grade: Omit<Grade, "id">) => {
        const res = await fetch("http://localhost:3001/grades", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(grade)
        })
        return res.json()
    }
)

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {},
    
    extraReducers: builder => {
        //FOR STUDENTS
        builder.addCase(getStudents.pending, state => {
            state.loading = true;
        })
        builder.addCase(getStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
            state.loading = false;
            state.students = action.payload;
        })

        //FOR SUBJECTS
        builder.addCase(getSubjects.pending, state => {
            state.loading = true;
        })
        builder.addCase(getSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
            state.loading = false;
            state.subjects = action.payload;
        })

        //FOR GRADES
        builder.addCase(getGrades.pending, state => {
            state.loading = true
        })
        builder.addCase(getGrades.fulfilled, (state, action: PayloadAction<Grade[]>) => {
            state.loading = false;
            state.grades = action.payload;
        })

        //FOR ADDING GRADES
        builder.addCase(addGrade.fulfilled, (state, action: PayloadAction<Grade>) => {
            state.grades.push(action.payload);
        })
    }
})

export default journalSlice.reducer;