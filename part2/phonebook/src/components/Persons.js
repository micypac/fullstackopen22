import React from "react";
import Person from "./Person";

const Persons = ({persons, deleteContact}) => {
 return (
     <div>
         {persons.map(person => 
            <Person key={person.id} name={person.name} number={person.number} deleteContact={() => deleteContact(person.id)}/>
        )}
     </div>
 )
}

export default Persons

