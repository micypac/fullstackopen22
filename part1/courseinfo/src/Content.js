import React from "react";

const Part = (props) => {
    return (
        <div>
            {props.parts.map((item) => {
                return <p>{item.name} {item.exercises}</p>
            })
            }
        </div>
    )
}

const Content = (props) => {
    return (
        <Part parts={props.course.parts} />
    )
}

export default Content