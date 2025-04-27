import React from 'react'
import './style.css'

const SearchBar = ({setSearchQuery}) => {
  const handleChange = (e)=>{
    setSearchQuery(e.target.value)
  }
  return (
    <div className="search-bar">
       <div className='overlay'>
        <h1>Welcome</h1>
        <h4>Your Cinematic Universe, Every Frame Tells a Story</h4>
        <div className='search'>
            <input type="text" onChange={handleChange}/>
            <button>Search</button>
        </div>
        
        </div> 
      
    </div>
  )
}

export default SearchBar
