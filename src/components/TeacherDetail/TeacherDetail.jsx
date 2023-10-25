import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTeacher } from "../../slices/teacherSlice";
import "../details.css";

export const TeacherDetail = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.teachers);

  const [teacher, setTeacher] = useState({ name: "", subject: "", contact: 0 });

  const handleDelete = (id) => {
    dispatch(deleteTeacher(id));
    navigate("/");
  };

  useEffect(() => {
    const getTeacher = teachers.find(({ _id }) => _id === teacherId);
    setTeacher(getTeacher);
  }, [teacherId, teachers, dispatch]);

  return (
    <div className="main-page">
      <div className="sub-page flex-column">
        <header>
          <h1>Teacher's Details</h1>
        </header>
        <section className="details-box">
          <div>
            <h3>
              Name: <span>{teacher.name}</span>
            </h3>
            <h3>
              Subject: <span>{teacher.subject}</span>
            </h3>
          </div>
          <h3>
            Contact No: <span>{teacher.contact}</span>
          </h3>
        </section>
        <section className="btn-section-details">
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/teachers/edit/${teacher._id}`, {
                state: teacher
              });
            }}
          >
            Edit Details
          </button>
          <button
            className="btn-discard"
            onClick={() => handleDelete(teacher._id)}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};
