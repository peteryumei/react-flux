import React from 'react';
import PropTypes from 'prop-types';

function CourseList(props) {
  return (
    <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author ID</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {props.courses.map(course => {
                        return (
                            <tr>
                                <td>{course.title}</td> 
                                <td>{course.authorId}</td>
                                <td>{course.category}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired
}

CourseList.defaultProps = {
  courses: []
}

export default CourseList;