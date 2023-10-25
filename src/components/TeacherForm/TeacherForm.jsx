import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { addTeacher, updateTeacher } from "../../slices/teacherSlice";
import toast from "react-hot-toast";

export const TeacherForm = () => {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subject: "",
    contact: 0
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState(false);

  useEffect(() => {
    if (location.state) {
      setIsEditForm(true);
      setNewTeacher(location.state);
    }
  }, []);

  const handleTeacherFormSubmit = () => {
    if (isEditForm) {
      dispatch(updateTeacher(newTeacher));
      toast.success("Teacher Details Updated Successfully");
      navigate(`/teachers/${location.state._id}`);
    } else {
      if (
        newTeacher.name.length &&
        newTeacher.subject.length &&
        newTeacher.contact.length
      ) {
        dispatch(addTeacher(newTeacher));
        toast.success("New Student Added Successfully");
        navigate("/");
      }
    }
    setIsEditForm(false);
    setNewTeacher({
      name: "",
      subject: "",
      contact: 0
    });
  };

  return (
    <div className="main-page">
      <h1 className="page-heading">Add New Teacher</h1>
      <div className="form">
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">
            <input
              className="form-input"
              required
              type="text"
              value={newTeacher.name}
              onChange={(event) => {
                setNewTeacher(() => ({
                  ...newTeacher,
                  name: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Subject</legend>
          <label htmlFor="subject">
            <input
              className="form-input"
              required
              type="text"
              value={newTeacher.subject}
              onChange={(event) => {
                setNewTeacher(() => ({
                  ...newTeacher,
                  subject: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Contact Number:</legend>
          <label htmlFor="contact">
            <input
              className="form-input"
              required
              type="number"
              value={newTeacher.contact}
              onChange={(event) => {
                setNewTeacher(() => ({
                  ...newTeacher,
                  contact: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
      </div>
      <section className="btn-section-form">
        <button className="btn-primary" onClick={handleTeacherFormSubmit}>
          {isEditForm ? "Update" : "Add"}
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setNewTeacher({
              name: "",
              subject: "",
              contact: 0
            });
            setIsEditForm(false);
            navigate("/teachers");
          }}
        >
          Discard
        </button>
      </section>
    </div>
  );
};
