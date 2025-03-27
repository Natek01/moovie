import {useState, useEffect} from "react";
import { useDebounce } from "react-use";

import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import SearchMovie from "./components/SearchMovie";


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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  },500,[searchTerm])  // using useDebounce hook to debounce the search term.

// using useEffect hook to fetch data from the API.

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)
      
      if(!response.ok) {
        throw new Error ("Error fetching movies");
      }

      const data = await response.json();
      console.log(data);
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
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])


  return (
   <main>
    <div  className="pattern"/>

    <div className="wrapper">
      <header>
        <img src="/hero.png" alt="hero background" />
        <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without The Hussle.</h1>
        <SearchMovie  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>



      <section className="all-movies">
        <h2 className='mt-[40px]'>All Movies</h2>
        
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
         <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
            
          ))}
         </ul>
        )}
      </section>
    </div>
   </main>
  )
}

export default App

