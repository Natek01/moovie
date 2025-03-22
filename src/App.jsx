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
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

// using useEffect hook to fetch data from the API.

  const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)
      
      if(!response.ok) {
        throw new Error ("Error fetching movies");
      }

      const data = await response.json();
      
      if(data.Response === "False") {
        setErrorMessage(data.Error || "Error fetching movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      setIsLoading(false);

    } catch(err) {
      console.log(err);
      setErrorMessage("Error fetching movies");
    } finally {
      setIsLoading(false);
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
        
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
         <ul>
          {movieList.map((movie) => (
            <p className="text-white">{movie.title}</p>
          ))}
         </ul>
        )}
      </section>


     

      <h1>{searchTerm}</h1>
    </div>
   </main>
  )
}

export default App

