import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import CoursesList from "./CourseList";
import { Link } from "react-router-dom";

function CoursesPage() {
    const [courses, setCoures] = useState([]);
    
    useEffect(() => {
      getCourses().then(_course => setCoures(_course));
    }, [])
    
    return ( 
        <>
            <h2>Courses</h2>
            <Link className="btn btn-primary" to="/course">Add Course</Link>
            <CoursesList courses = { courses }/>
        </>
    )
    
}

export default CoursesPage;