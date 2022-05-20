import React from "react";

const Total = ({course}) => {

    const total = course.parts.reduce((tot, val) => {
        return tot += val.exercises
    }, 0);

    return (
        <p><strong>Total of {total} exercises</strong></p>
    )
}

export default Total