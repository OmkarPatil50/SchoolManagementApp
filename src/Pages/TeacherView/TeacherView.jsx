import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTeachers } from "../../slices/teacherSlice";
import { TeacherList } from "../../components/TeacherList/TeacherList";

export const TeacherView = () => {
  const { status, teachers } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch]);

  return (
    <div className="main-page">
      <header>
        <h1 className="page-heading">All Teachers</h1>
      </header>
      <button
        className="btn-primary"
        onClick={() => {
          navigate("/add-teacher");
        }}
      >
        Add New Teacher
      </button>
      <ul className="items-list">
        {teachers.map((teacher) => {
          return <TeacherList teacher={teacher} />;
        })}
      </ul>
    </div>
  );
};
