import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const response = await axios.get(
        "https://student-management-app.omkarpatil20.repl.co/teachers"
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (newTeacher) => {
    try {
      const response = await axios.post(
        "https://student-management-app.omkarpatil20.repl.co/teachers",
        newTeacher
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (updatedTeacherData) => {
    try {
      const response = await axios.put(
        `https://student-management-app.omkarpatil20.repl.co/teachers/${updatedTeacherData._id}`,
        updatedTeacherData
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    try {
      const response = await axios.delete(
        `https://student-management-app.omkarpatil20.repl.co/teachers/${id}`
      );
      return response.data.teacher;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  teachers: [],
  status: "idle",
  error: null
};
export const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = "idle";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
    builder.addCase(addTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.status = "idle";
      state.teachers.push(action.payload);
      state.error = null;
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
    builder.addCase(updateTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      state.status = "idle";
      const teacherIndex = state.teachers.findIndex(
        ({ _id }) => _id === action.payload._id
      );
      state.teachers[teacherIndex] = action.payload;
      state.error = null;
    });
    builder.addCase(updateTeacher.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
    builder.addCase(deleteTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.status = "idle";
      state.teachers = state.teachers.filter(
        ({ _id }) => _id !== action.payload._id
      );
      state.error = null;
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
  }
});
