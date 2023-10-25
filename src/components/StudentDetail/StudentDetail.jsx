import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteStudent } from "../../slices/studentSlice";
import toast from "react-hot-toast";

import "../details.css";

export const StudentDetail = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const [student, setStudent] = useState({
    name: "",
    age: 0,
    grade: "",
    gender: "",
    attendance: "",
    marks: 0,
    class: 1
  });

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    navigate("/");
  };

  useEffect(() => {
    const getStudent = students.find(({ _id }) => _id === studentId);
    setStudent(getStudent);
  }, [studentId, students, dispatch]);

  return (
    <div className="main-page">
      <div className="sub-page flex-column">
        <header>
          <h1 className="page-heading">Student's Details</h1>
        </header>
        <section className="details-box">
          <div>
            <h3>
              Name: <span>{student.name}</span>
            </h3>
            <h3>
              Class: <span></span>
              {student.class}
            </h3>
            <h3>
              Gender: <span>{student.gender}</span>
            </h3>
            <h3>
              Age:
              <span>{student.age}</span>
            </h3>
          </div>
          <div>
            {" "}
            <h3>
              Grade:
              <span>{student.grade}</span>
            </h3>
            <h3>
              Attendance:{" "}
              <span>
                {student.attendance
                  ? `${student.attendance}%`
                  : "Data unavailable"}
              </span>
            </h3>
            <h3>
              Marks:{" "}
              <span>
                {student.marks ? `${student.marks}/100` : "Data unavailable"}
              </span>
            </h3>
          </div>
        </section>
        <section className="btn-section-details">
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/students/edit/${student._id}`, {
                state: student
              });
            }}
          >
            Edit Details
          </button>
          <button
            className="btn-discard"
            onClick={() => {
              handleDelete(student._id);
              toast.success("Student Deleted Successfully");
            }}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};
