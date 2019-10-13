import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import * as authorApi from "../api/authorApi";
import CoursesList from "./CourseList";
import { Link } from "react-router-dom";

function CoursesPage() {
    const [courses, setCoures] = useState([]);

    useEffect(() => {
        getCourses().then(_courses => {
          var results = [];
          _courses.forEach(_course => {
                    authorApi.getAuthorById(_course.authorId).then( data => {
										_course.author = data.name;
										results.push(_courses);
                });
            });          
            setCoures(_courses);
        });
      }, [])
    
    // useEffect(() => {
    //   getCourses().then(_courses => {
    //         courses.forEach(_course => {
    //             authorApi.getAuthorById(_course.authorId).then( data => {
    //             _course.author = data;
    //         });
    //     });
    //     setCoures(_courses);

    //   });
    // }, [courses])

    // courses.map( _course => {
    //     authorApi.getAuthorById(_course.authorId).then( data => {
    //         courses.author = data;
    //     });
    // })

    // courses.forEach(_course => {
    //     authorApi.getAuthorById(_course.authorId).then( data => {
    //         _course.author = data;
    //     });
    // });
    
    return ( 
        <>
            <h2>Courses</h2>
            <Link className="btn btn-primary" to="/course">Add Course</Link>
            <CoursesList courses = { courses }/>
        </>
    )
    
}

export default CoursesPage;