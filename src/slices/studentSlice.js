import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await axios.get(
        "https://student-management-app.omkarpatil20.repl.co/students"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    try {
      const response = await axios.post(
        "https://student-management-app.omkarpatil20.repl.co/students",
        newStudent
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (updatedStudentData) => {
    try {
      const response = await axios.put(
        `https://student-management-app.omkarpatil20.repl.co/students/${updatedStudentData._id}`,
        updatedStudentData
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    try {
      const response = await axios.delete(
        `https://student-management-app.omkarpatil20.repl.co/students/${id}`
      );
      return response.data.student;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: "hell",
  filterByGender: "all",
  filterByClass: "all",
  sortBy: "all"
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFilterByGender: (state, action) => {
      state.filterByGender = action.payload;
    },
    setFilterByClass: (state, action) => {
      state.filterByClass = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "idle";
        state.students = action.payload;
        state.error = null;
      }),
      builder.addCase(fetchStudents.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
    builder.addCase(addStudent.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.status = "idle";
      state.students.push(action.payload);
      state.error = null;
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
    builder.addCase(updateStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.status = "idle";
      const studentIndex = state.students.findIndex(
        ({ _id }) => _id === action.payload._id
      );
      state.students[studentIndex] = action.payload;
      state.error = null;
    });
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
    builder.addCase(deleteStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.status = "idle";
      state.students = state.students.filterByGender(
        ({ _id }) => _id !== action.payload._id
      );
      state.error = null;
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
  }
});

export const {
  setFilterByGender,
  setFilterByClass,
  setSortBy
} = studentSlice.actions;
