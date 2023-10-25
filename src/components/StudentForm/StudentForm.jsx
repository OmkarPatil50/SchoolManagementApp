import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, updateStudent } from "../../slices/studentSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../forms.css";

export const StudentForm = () => {
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: 0,
    grade: "",
    gender: "",
    attendance: "",
    marks: 0,
    class: 1
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState(false);

  useEffect(() => {
    if (location.state) {
      setIsEditForm(true);
      setNewStudent(location.state);
    }
  }, []);

  const handleStudentFormSubmit = () => {
    if (isEditForm) {
      dispatch(updateStudent(newStudent));
      toast.success("Student Details Updated Successfully");
      navigate(`/students/${location.state._id}`);
    } else {
      dispatch(addStudent(newStudent));
      toast.success("New Student Added Successfully");
      navigate("/students");
    }
    setIsEditForm(false);
    setNewStudent({
      name: "",
      age: 0,
      grade: "",
      gender: "",
      attendance: 0,
      marks: 0,
      class: 1
    });
  };

  return (
    <div className="main-page">
      <h1 className="page-heading">Add New Student</h1>
      <div className="form">
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">
            <input
              className="form-input"
              required
              type="text"
              value={newStudent.name}
              onChange={(event) => {
                setNewStudent(() => ({
                  ...newStudent,
                  name: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Age</legend>
          <label htmlFor="age">
            <input
              className="form-input"
              required
              type="number"
              value={newStudent.age}
              onChange={(event) => {
                setNewStudent(() => ({
                  ...newStudent,
                  age: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Class</legend>
          <label htmlFor="class">
            <select
              className="form-input"
              required
              name="class"
              value={newStudent.class}
              onChange={(event) => {
                setNewStudent(() => ({
                  ...newStudent,
                  class: event.target.value
                }));
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Grade</legend>
          <label htmlFor="grade">
            <input
              className="form-input"
              required
              type="text"
              value={newStudent.grade}
              maxLength={1}
              onChange={(event) => {
                setNewStudent(() => ({
                  ...newStudent,
                  grade: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Gender</legend>
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newStudent.gender === "Male"}
              onChange={(event) => {
                console.log(event);
                setNewStudent(() => ({
                  ...newStudent,
                  gender: "Male"
                }));
              }}
            />{" "}
            Male
          </label>
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newStudent.gender === "Female"}
              onChange={(event) => {
                console.log(event);
                setNewStudent(() => ({
                  ...newStudent,
                  gender: "Female"
                }));
              }}
            />{" "}
            Female
          </label>{" "}
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newStudent.gender === "Other"}
              onChange={(event) => {
                console.log(event);
                setNewStudent(() => ({
                  ...newStudent,
                  gender: "Other"
                }));
              }}
            />{" "}
            Other
          </label>
        </fieldset>
        <fieldset>
          <legend>Attendance</legend>
          <label htmlFor="attendance">
            <input
              className="form-input"
              required
              type="number"
              value={newStudent.attendance}
              onChange={(event) => {
                setNewStudent(() => ({
                  ...newStudent,
                  attendance: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Marks</legend>
          <label htmlFor="marks">
            <input
              className="form-input"
              required
              type="number"
              value={newStudent.marks}
              onChange={(event) => {
                setNewStudent(() => ({
                  ...newStudent,
                  marks: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
      </div>
      <section className="btn-section-form">
        <button
          className="btn-primary"
          onClick={() => {
            if (
              newStudent.name.length &&
              newStudent.age > 0 &&
              newStudent.gender.length &&
              newStudent.grade.length &&
              newStudent.attendance &&
              newStudent.marks &&
              newStudent.class
            ) {
              handleStudentFormSubmit();
            }
          }}
        >
          {isEditForm ? "Update" : "Add"}
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setNewStudent({
              name: "",
              age: 0,
              grade: "",
              gender: "",
              attendance: 0,
              marks: 0,
              class: 1
            });
            setIsEditForm(false);
            navigate("/students");
          }}
        >
          Discard
        </button>
      </section>
    </div>
  );
};
