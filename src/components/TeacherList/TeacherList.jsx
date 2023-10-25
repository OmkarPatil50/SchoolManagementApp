import { useNavigate } from "react-router-dom";

export const TeacherList = ({ teacher }) => {
  const { _id, name, subject } = teacher;
  const navigate = useNavigate();

  return (
    <li key={teacher._id} className="list-item">
      <header>
        <h3 className="list-name">{name}</h3>
        <button
          className="btn-secondary"
          onClick={() => {
            navigate(`/teachers/${_id}`);
          }}
        >
          View{" "}
        </button>
      </header>
      <p className="list-details">Subject: {subject}</p>
    </li>
  );
};
