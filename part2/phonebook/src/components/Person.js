import React from "react";

const Person = ({name, number, deleteContact}) => {
    return (
        <p>{name} {number} <button onClick={deleteContact}>delete</button></p>
    )
}

export default Person