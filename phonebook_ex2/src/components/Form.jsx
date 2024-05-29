import React from 'react'

const Form =({add,newName,newNumber,name_handler,number_handler}) =>{
    return(
      <form onSubmit={add}>
          <div>
            name: <input value={newName} onChange={name_handler}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={number_handler} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default Form;