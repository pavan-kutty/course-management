import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    fee: "",
    duration: "",
    startDate: "",
    endDate: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/courses", {
      headers: { Authorization: Bearer `${token}` }
    });
    setCourses(res.data.courses);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/courses", newCourse, {
      headers: { Authorization: Bearer `${token}` }
    });
    alert("Course added!");
    setNewCourse({ title: "", description: "", fee: "", duration: "", startDate: "", endDate: "" });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:5000/courses"/`${id}`, {
      headers: { Authorization: Bearer `${token}` }
    });
    alert("Course deleted");
    fetchCourses();
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleAddCourse} style={styles.form}>
        <h3>Add New Course</h3>
        <input style={styles.input} type="text" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
        <input style={styles.input} type="text" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
        <input style={styles.input} type="number" placeholder="Fee" value={newCourse.fee} onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })} />
        <input style={styles.input} type="text" placeholder="Duration" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} />
        <input style={styles.input} type="date" placeholder="Start Date" value={newCourse.startDate} onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })} />
        <input style={styles.input} type="date" placeholder="End Date" value={newCourse.endDate} onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })} />
        <button style={styles.button}>Add Course</button>
      </form>

      <h3>Existing Courses</h3>
      <div style={styles.courseList}>
        {courses.map((course) => (
          <div key={course._id} style={styles.card}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>Fee: ₹{course.fee}</p>
            <p>Duration: {course.duration}</p>
            <p>Start: {course.startDate?.split("T")[0]}</p>
            <p>End: {course.endDate?.split("T")[0]}</p>
            <button style={styles.deleteBtn} onClick={() => handleDelete(course._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  form: { maxWidth: 400, marginBottom: 40 },
  input: { width: "100%", marginBottom: 10, padding: 8, fontSize: 16 },
  button: { padding: 10, backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" },
  courseList: { display: "flex", flexWrap: "wrap", gap: 20 },
  card: { border: "1px solid #ccc", padding: 15, width: 300, borderRadius: 10 },
  deleteBtn: { padding: 8, backgroundColor: "#dc3545", color: "#fff", border: "none", cursor: "pointer", marginTop: 10 }
};

export default AdminDashboard;
