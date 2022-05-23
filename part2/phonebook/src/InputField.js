import React from "react";

const InputField = ({newValue, handleNewValue, text}) => {
    return (
        <div>
            {text}
            <input value={newValue} onChange={handleNewValue} />
        </div>
    )
    
}

export default InputField