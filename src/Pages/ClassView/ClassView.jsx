import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  setFilterByClass,
  setFilterByGender,
  setSortBy
} from "../../slices/studentSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import "../pages.css";

export const ClassView = () => {
  const { students, filterByGender, filterByClass, sortBy } = useSelector(
    (state) => state.students
  );

  const dispatch = useDispatch();

  const filterStudentsByGender = students.filter(({ gender }) => {
    if (filterByGender === "all") {
      return true;
    }
    return gender === filterByGender;
  });

  const filterStudentsByClass = filterStudentsByGender.filter((student) => {
    if (filterByClass === "all") return true;
    return student.class === parseFloat(filterByClass);
  });

  const sortStudents = [...filterStudentsByClass].sort((a, b) => {
    if (sortBy === "all") return true;
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "age") {
      return b.age - a.age;
    }
    if (sortBy === "marks") {
      return b.marks - a.marks;
    }
    if (sortBy === "attendance") {
      return b.attendance - a.attendance;
    }
  });

  const handleFilterByGenderChange = (value) => {
    dispatch(setFilterByGender(value));
  };

  const handleFilterByClassChange = (value) => {
    dispatch(setFilterByClass(value));
  };
  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="main-page">
      <header>
        <h1 className="page-heading">Class View</h1>
      </header>
      <div className="class-view-page">
        <section className="filters-section">
          <label htmlFor="filterByGender">
            Filter by Class:
            <select
              id="filterByClass"
              onChange={(event) => {
                handleFilterByClassChange(event.target.value);
                toast.success("Filtered By Class");
              }}
              value={filterByClass}
            >
              <option value="all">All</option>
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

          <label htmlFor="filterByGender">
            Filter by Gender:
            <select
              id="filterByGender"
              onChange={(event) => {
                handleFilterByGenderChange(event.target.value);
                toast.success("Filtered By Gender");
              }}
              value={filterByGender}
            >
              <option value="all">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label htmlFor="sortBy">
            Sort by:
            <select
              id="sortBy"
              onChange={(event) => {
                handleSortChange(event.target.value);
                toast.success(`Sorted by ${event.target.value}`);
              }}
              value={sortBy}
            >
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="marks">Marks</option>
              <option value="attendance">Attendance</option>
            </select>
          </label>
          <button
            className="btn-primary"
            onClick={() => {
              handleFilterByClassChange("all");
              handleFilterByGenderChange("all");
              handleSortChange("all");
              toast.success("Filters Cleared");
            }}
          >
            Clear Filters
          </button>
        </section>
        <section className="students-list-section">
          {sortStudents.length ? (
            <table className="student-table">
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Marks</th>
                <th>Attendance</th>
              </tr>

              {sortStudents.map((student) => (
                <tr key={student.id}>
                  <td>{sortStudents.indexOf(student) + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.marks}</td>
                  <td>{student.attendance}</td>
                </tr>
              ))}
            </table>
          ) : (
            <h3 className="empty-tag">No Students Found</h3>
          )}
        </section>
      </div>
    </div>
  );
};
