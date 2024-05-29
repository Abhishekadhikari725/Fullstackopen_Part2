import React from 'react'


const Filter =({text,newFilter,onChange}) =>{
    return(
      <>
      <div>
        {text}
        <input value={newFilter} onChange={onChange} />
        <br/>
      </div>
      </>
    )
  }

  export default Filter;
  