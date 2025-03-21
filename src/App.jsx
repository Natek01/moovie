import {useState, useEffect} from "react";
import Search from "./components/Search"


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method:"GET",
  headers: {
    accept:"application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

// using useEffect to fetch data from the API.

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)
      alert(response);

    } catch(err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  }

  useEffect(() => {
    fetchMovies();
  },[])

  return (
   <main>
    <div  className="pattern"/>

    <div className="wrapper">
      <header>
        <img src="/hero.png" alt="hero background" />
        <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without The Hussle.</h1>
        <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

      <section className="all-movies">
        <h1>All Movies</h1>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </section>


     

      <h1>{searchTerm}</h1>
    </div>
   </main>
  )
}

export default App
