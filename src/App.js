import { useSelector } from "react-redux";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { StudentView } from "./Pages/StudentView/StudentView";
import { StudentForm } from "./components/StudentForm/StudentForm";
import { StudentDetail } from "./components/StudentDetail/StudentDetail";
import { ClassView } from "./Pages/ClassView/ClassView";
import { SchoolView } from "./Pages/SchoolView/SchoolView";
import { TeacherView } from "./Pages/TeacherView/TeacherView";
import { TeacherForm } from "./components/TeacherForm/TeacherForm";
import { TeacherDetail } from "./components/TeacherDetail/TeacherDetail";
import { Navbar } from "./components/Navbar/Navbar";
import { Loader } from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";

export default function App() {
  const studentsState = useSelector((state) => state.students);
  const teachersState = useSelector((state) => state.teachers);

  return (
    <div className="App">
      {studentsState.status === "loading" ||
      teachersState.status === "loading" ? (
        <Loader />
      ) : (
        ""
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<SchoolView />} />
        <Route path="/classes" element={<ClassView />} />
        <Route path="/students" element={<StudentView />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/students/:studentId" element={<StudentDetail />} />
        <Route path="/students/edit/:studentId" element={<StudentForm />} />
        <Route path="/teachers" element={<TeacherView />} />
        <Route path="/add-teacher" element={<TeacherForm />} />
        <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
        <Route path="/teachers/edit/:teacherId" element={<TeacherForm />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff"
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          }
        }}
      />
    </div>
  );
}
