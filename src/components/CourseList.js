import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import * as authorApi from "../api/authorApi";

function CourseList(props) {

  async function getAuthor(id) {
    return await authorApi.getAuthorById(id).then();
  }

  return (
    <table className="table">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Title</th>
                        <th>Author ID</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {props.courses.map(course => {
                        return (
                            <tr key={course.id}>
                                <td>
                                  <button className="btn btn-outline-danger" 
                                  onClick={ () => props.deleteCourse(course.id)} >
                                    Delete</button>
                                </td>
                                <td>
                                <Link to={"/course/" + course.slug} >{course.title}</Link>
                                </td> 
                                <td>{course.author}</td>
                                <td>{course.category}</td>
                            </tr> 
                        );
                    })}
                </tbody>
            </table>
  );
}

CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired
}

CourseList.defaultProps = {
  courses: []
}

export default CourseList;