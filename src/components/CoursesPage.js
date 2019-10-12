import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import CoursesList from "./CourseList";

function CoursesPage() {
    const [courses, setCoures] = useState([]);
    
    useEffect(() => {
      getCourses().then(_course => setCoures(_course));
    }, [])
    
    return ( 
        <>
            <h2>Courses</h2>
            <CoursesList courses = { courses }/>
        </>
    )
    
}

export default CoursesPage;