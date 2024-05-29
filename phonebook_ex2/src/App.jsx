import React,{ useState, useEffect } from 'react'

import person_service from './services/persons'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification  from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [message , setMessage] =useState(null)

  useEffect(()=>{
    person_service
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
      .catch(error =>
        console.error(error))
  },[])

  const NameChangerhandler =(event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const NumberChangerhandler =(event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const FilterChangerhandler =(event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const FilteredPersons = 
    newFilter ==='' ? persons :persons.filter(person =>person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const add_new_person=(event)=>{
    event.preventDefault()
    const person_object={
      name:newName ,
      number:newNumber 
    }
    const checkPerson = persons.find(person=> person.name.toLowerCase() === person_object.name.toLowerCase())
    const checkNumber = persons.find(person=> person.number === person_object.number)
    if (newName==='' || newNumber===''){
      alert(`Fill both name and number for entry in phonebook`)
    }
    else if (checkPerson && checkNumber){
      alert('This detail is already available in phonebook.')
    }
    else if (!checkPerson){
      person_service
        .create(person_object)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setMessage(`Note: Added ${returnedPerson.name} in the phonebook sucessfully.`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
        })
        .catch(error=>{
          console.log(error.response.data.error)
          setMessage(`Error: ${error.response.data.error}`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
        })
      setNewName('')
      setNewNumber('')
    }
    else{
      if(window.confirm(`${newName} is already added to the phonebook,do you want to the replace the old number with the new one?`))
      {
        const person_update={ ...checkPerson, number: newNumber}
        person_service
          .updatePerson(checkPerson.id , person_update)
          .then(returnedPerson =>{
            setPersons(persons.map(person =>(person.id !== checkPerson.id ? person : returnedPerson )))
            setMessage(`Update: ${returnedPerson.name} has been sucessfully updated in server.`)
          })
          .catch(error=>{
            setPersons(persons.filter(person=>person.name !== newName))
            setMessage(`Error: ${newName} has already been deleted from server.`)
            setTimeout(()=>{
              setMessage(null)
            },5000)
          })
      }
    }
  }

  const deletePerson =(id) =>{
    const person = persons.find(per => per.id === id)
    const confirmation = window.confirm(`Are you sure you want to delete ${person.name} .`)

    if (confirmation){
      person_service
        .removePerson(id)
        .then(returnedPerson => {person.id !==id ? person : returnedPerson})
      setPersons(persons.filter(person=> person.id !== id))
      setMessage(`Note: ${person.name} is deleted from the phonebook.`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <div>
        <Filter text='filter shown with' newFilter={newFilter} onChange={FilterChangerhandler} />
      </div>
      <h3>add a new</h3>
      <Form add={add_new_person} newName={newName} newNumber={newNumber} name_handler={NameChangerhandler} number_handler={NumberChangerhandler} />
      <h2>Numbers</h2>
      <Persons FilteredPersons={FilteredPersons} deletePerson={deletePerson}/>
    </div>

  )
}

export default App