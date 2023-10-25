import { useNavigate } from "react-router-dom";
import "./StudentList.css";

export const StudentList = ({ student }) => {
  const { _id, name } = student;
  const navigate = useNavigate();

  return (
    <li key={student._id} className="list-item">
      <header>
        <h3 className="list-name">{name}</h3>
        <button
          className="btn-secondary"
          onClick={() => {
            navigate(`/students/${_id}`);
          }}
        >
          View
        </button>
      </header>
      <p className="list-details">Class: {student.class}</p>
    </li>
  );
};
