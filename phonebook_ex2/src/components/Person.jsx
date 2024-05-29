import React from 'react'

const DisplayPerson =({person, deletePerson}) =>{
    return(
      <>
        {person.name}  {person.number}
        <button onClick={()=>deletePerson(person.id)}>Delete</button>
        <br />
      </>
    )
  }

export default DisplayPerson 