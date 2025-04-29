const SearchBar = ({setSearchQuery}) => {
  const handleChange = (e)=>{
    setSearchQuery(e.target.value)
  }
  return (
    <div className="search-bar">
            <input 
            type="text"
            placeholder='search...'
            className='input-box'
            onChange={handleChange}/>
      
    </div>
  )
}

export default SearchBar
