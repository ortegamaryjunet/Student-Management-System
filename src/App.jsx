import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "", course: "", age: ""
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {

    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleChange=(event)=> {

    const {name, value} = event.target;

    setForm((prev)=> ({
      ...prev,[name]:value,
    }));
  }

  const addStudent=(evemt)=> {
    event.preventDefault();

    const newStudent={
      id: Date.now(),
      name: form.studentName,
      course: form.studentCourse,
      age: form.studentAge
    };

    setStudents(newStudent);
    setForm({name: "", course: "", age: ""});

  }

  return (
    <>
      <div>
        <h1>Student Management System</h1>

          <form onSubmit={addStudent}>
            <h2>Student Form</h2>
            <br></br>

            <label>Enter Student Name</label>
            <br></br>
            <input type="text" minLength={5} placeholder="Name" name="name" value={form.studentName} onChange={handleChange} required/>
            <br></br><br></br>
            
            <label>Enter Student Course</label>
            <br></br>
            <input type="text" minLength={1} placeholder="Course" name="course" value={form.studentCourse} onChange={handleChange} required/>
            <br></br><br></br>
            
            <label>Enter Student Age</label>
            <br></br>
            <input type="number" maxLength={2} placeholder="Age" name="age" value={form.studentAge} onChange={handleChange} required/>
            <br></br>

            <br></br>
            <button type="submit" >Submit</button>
          </form>
        
      </div>

      <div>

        <hr></hr>
        <h2> All Students</h2>

        {students.map((student) => (

          <div key = {student.id}>
            <p>Name: {student.studentName}</p>
            <p>Course: {student.studentCourse}</p>
            <p>Age: {student.studentAge}</p>
          </div>
        ))}

      </div>

    </>
  );
}

export default App;