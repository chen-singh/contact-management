import React from 'react'

export const Header = ({toogleModel,nbOfcontacts}) => {
  return (
   <header className='header'>
   <div className='container'>
     
     <h3>Contacts({nbOfcontacts})</h3>
     <button onClick={()=>{toogleModel(true)}} className='btn'>
        <i className='bi bi-plus-quare'></i>Add Contact
        </button>
     
   </div>

   </header>
  )
}
