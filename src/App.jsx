import {useState, useEffect} from 'react'

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const OPTIONS = {
  method:"GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, OPTIONS);

      if(!response.ok) {
        throw new Error('Something went wrong while fetching the movies');
      }

      const data = await response.json();
      console.log(data);

    } catch(err) {
      setErrorMessage(`Error in fetching the movies : ${err.message}`)
    }
  }



  useEffect(() =>{
    fetchMovies();
  },[]);



  return (

    <>
    <div className='pattern'/>
     <div>
      <header> 
      <h1>Find Movies You Will Enjoy Without The Hussle.</h1>

      {/* <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> */}
      </header>
     </div>
    </>
  )
}

export default App
