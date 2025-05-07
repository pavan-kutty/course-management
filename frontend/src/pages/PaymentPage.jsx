import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const res = await axios.get("http://localhost:5000/courses"/`${courseId}`);
    setCourse(res.data);
  };

  const handleFakePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/payments",
        { courseId },
        { headers: { Authorization: Bearer `${token}` } }
      );
      alert("Payment successful! Course enrolled.");
      navigate("/student");
    } catch (err) {
      alert("Payment failed.");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Payment for: {course.title}</h2>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Fee:</strong> ₹{course.fee}</p>

      <div style={styles.card}>
        <p>This is a test payment simulation.</p>
        <button onClick={handleFakePayment} style={styles.button}>Pay Now</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 },
  card: { marginTop: 30, padding: 20, backgroundColor: "#f1f1f1", borderRadius: 10, textAlign: "center" },
  button: { padding: 10, fontSize: 16, backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" },
};

export default PaymentPage;
