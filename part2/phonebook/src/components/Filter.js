import React from "react";

const Filter = ({newFilter, handleFilter}) => {
    return (
        <div>
            Filter: <input value={newFilter} onChange={handleFilter} />
        </div>
    )
}


export default Filter