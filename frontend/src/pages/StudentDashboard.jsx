import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/courses", {
      headers: { Authorization: Bearer `${token}` },
    });
    setCourses(res.data.courses);
    setEnrolled(res.data.enrolledCourses); // From backend response
  };

  const handleEnroll = (courseId) => {
    navigate(/payment/`${courseId}`);
  };

  return (
    <div style={styles.container}>
      <h2>Available Courses</h2>
      <div style={styles.courseList}>
        {courses.map((course) => (
          <div key={course._id} style={styles.card}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.duration}</p>
            <p>Fee: ₹{course.fee}</p>
            {enrolled.includes(course._id) ? (
              <button style={{ ...styles.button, backgroundColor: "gray" }} disabled>
                Enrolled
              </button>
            ) : (
              <button style={styles.button} onClick={() => handleEnroll(course._id)}>
                Enroll & Pay
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  courseList: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
  card: { border: "1px solid #ccc", borderRadius: 10, padding: 20, width: 300, textAlign: "left" },
  button: { marginTop: 10, padding: 10, backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" },
};

export default StudentDashboard;