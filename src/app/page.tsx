'use client'
import { useState } from "react";


const App = () => {
  const [color, setColor] = useState("#ffffff");
  const [count, setCount] = useState(0);

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    setColor(randomColor);
    setCount(count + 1);
  };

  // const generateCounter = () => {
  

  return (
    <div>
    <div style={{ backgroundColor: color }}>
      <h1 style={styles.title}>Generator Warna Acak</h1>
      <p style={styles.colorCode}>Kode Warna: {color}</p>
      <p style={styles.colorCode}>Time Clicked : {count}</p>
      <button style={styles.button} onClick={generateRandomColor}>
        Hasilkan Warna
      </button>
    </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    transition: "background-color 0.5s ease",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  colorCode: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default App;

