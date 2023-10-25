import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./slices/studentSlice";
import { schoolSlice } from "./slices/schoolSlice";
import { teacherSlice } from "./slices/teacherSlice";

export default configureStore({
  reducer: {
    students: studentSlice.reducer,
    school: schoolSlice.reducer,
    teachers: teacherSlice.reducer
  }
});
