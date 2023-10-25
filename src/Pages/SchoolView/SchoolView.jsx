import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../slices/studentSlice";
import { setTopStudent, updateSchoolStats } from "../../slices/schoolSlice";
import { Link } from "react-router-dom";
import { ReactComponent as Image } from "../../Data/hero.svg";
import "../pages.css";

export const SchoolView = () => {
  const { students } = useSelector((state) => state.students);
  const schoolStats = useSelector((state) => state.school);

  const dispatch = useDispatch();

  const totalStudents = students.length;
  const averageAttendance =
    students.reduce((acc, curr) => {
      return acc + curr.attendance;
    }, 0) / totalStudents;

  const averageMarks =
    students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;
  const topStudent = students.reduce((acc, curr) => {
    return acc.marks < curr.marks ? (acc = curr) : acc;
  }, students[0]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent
      })
    );
    dispatch(setTopStudent(topStudent));
  }, [dispatch, totalStudents]);

  return (
    <div className="main-page">
      <header>
        <h1 className="page-heading">School Dashboard</h1>
      </header>
      <div className="sub-page">
        <section>
          <Image className="hero-img" />
        </section>
        <section className="dashboard-data">
          <p>
            {" "}
            <span>📚 Total Students: </span> {schoolStats.totalStudents}
          </p>
          <p>
            {" "}
            <span>📚 Average Attendance: </span>{" "}
            {schoolStats.averageAttendance.toFixed(2) === "NaN"
              ? "Data Insufficint"
              : schoolStats.averageAttendance.toFixed(2)}
          </p>
          <p>
            <span>📚 Average Marks: </span>
            {schoolStats.averageMarks.toFixed(2) === "NaN"
              ? "Data Insufficint"
              : schoolStats.averageMarks.toFixed(2)}
          </p>
          <p>
            <span>📚 Top Student: </span>
            {schoolStats.topStudent ? schoolStats.topStudent.name : "-"}
            <Link
              to={`/students/${schoolStats.topStudent?._id}`}
              className="link dashboard-top-student-details-link"
            >
              View Details
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};
