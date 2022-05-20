import React from "react";

const Part = ({item}) => {
    return (
        <p>{item.name} {item.exercises}</p>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map( item => 
                <Part key={item.id} item={item} />
            )}
        </div>
    )
}

export default Content