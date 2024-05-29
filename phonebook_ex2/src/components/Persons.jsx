import React from 'react'
import DisplayPerson from './Person'

const Persons =({FilteredPersons,deletePerson})=>{
    return(
      FilteredPersons.map((person)=>(<DisplayPerson key={person.id} person={person} deletePerson={deletePerson} />))
    )
  }

export default Persons