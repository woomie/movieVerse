import React from 'react'
import './style.css'

const SearchBar = ({setSearchQuery}) => {
  const handleChange = (e)=>{
    setSearchQuery(e.target.value)
  }
  return (
    <div className="search-bar">
       <div className='overlay'>
        <div className='search'>
            <input 
            type="text"
            placeholder='search...'
            className='input-box'
            onChange={handleChange}/>
            
            
        </div>
        
        </div> 
      
    </div>
  )
}

export default SearchBar
