const SearchMovie = ({searchTerm, setSearchTerm}) => {
  return (
   <div className="search">
    
    <div>
      <img src="./Search.svg" alt="search icon"/>
      <input 
       type="text"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)} // a setter function for updating the searchTerm.
       placeholder='Search your movies here.'
      
      />
    </div>

   </div>
  )
}

export default SearchMovie;