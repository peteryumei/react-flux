import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import * as authorApi from "../api/authorApi";
import courseStore from "../stores/courseStore";
import CoursesList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from '../actions/courseActions';

function CoursesPage() {
		const [courses, setCoures] = useState(courseStore.getCourses());
		
		async function asyncGetCourses() {
			let _courses = await getCourses();
			let results = [];

			await Promise.all(_courses.map(
				async (_course) => {
					let author = await authorApi.getAuthorById(_course.authorId);
					_course.author = author.name;
					results.push(_course);
				}
			))
			setCoures(results);
		}

		async function asyncGetCoursesParallel() {
			let _courses = await getCourses();
			let results = [];
			for (const _course of _courses) {
				let author = await authorApi.getAuthorById(_course.authorId);
				_course.author = author.name;
				results.push(_course);
			}
			setCoures(results);
		}

		async function asyncGetCoursesES2018() {
			let _courses = courseStore.getCourses();
			let results = [];

			for await (const _course of _courses) {
				let author = await authorApi.getAuthorById(_course.authorId);
				_course.author = author.name;
				results.push(_course);
			}
			setCoures(results);
		}

    useEffect(() => {
				courseStore.addChangeListener(onChange);
				if (courseStore.getCourses().length === 0) loadCourses();
				return () => courseStore.removeChangeListener(onChange);  //cleanup on unmount
				//asyncGetCoursesES2018();
				//setCoures(courseStore.getCourses()); 
			}, [courses.length])
			
			function onChange() {
				setCoures(courseStore.getCourses()); 
			}
    
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
            <CoursesList courses = { courses } deleteCourse = {deleteCourse} />
        </>
    )
    
}

export default CoursesPage;