import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudentList } from "../../components/StudentList/StudentList";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../../slices/studentSlice";

export const StudentView = () => {
  const { status, students } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch]);

  return (
    <div className="main-page">
      <header>
        <h1 className="page-heading">All Students</h1>
      </header>
      <button
        className="btn-primary"
        onClick={() => {
          navigate("/add-student");
        }}
      >
        Add New Student
      </button>
      <ul className="items-list">
        {students.map((student) => {
          return <StudentList student={student} />;
        })}
      </ul>
    </div>
  );
};
