import MovieCard from "../components/MovieCard";
import { searchMovies,getPopularMovies } from "../services/api";
import {useState,useEffect} from 'react';
import '../css/Home.css';
function Home(){
    const [searchQuery , setSearchQuery]= useState("");
    const [movies,setMovies] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] =useState(true);

    // getting popular movies and rendering only once using useEffect 

    useEffect(()=>{
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()     // ''getPopularMovies()'' function from api.js 
                setMovies(popularMovies)
            }
            catch(err){
                console.log(err)
                setError("Failed to load movies...")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])


    // const movies = [
    //     {id:1,title:"raavan",release_date:"2000"},
    //     {id:2,title:"sarvan",release_date:"2020"},
    // ];


    // for searching functionality we use 
    const handleSearch= async (e)=>{
        e.preventDefault() //there 'll be prev searched text in input box
        if(!searchQuery.trim()) return
        if(loading) return
        setLoading(true) // loading
        try{
            const searchResults = await searchMovies(searchQuery); // using searchMovies(user_movie) from api.js 
            setMovies(searchResults) // getting the searched movies using [setMovies] setter function
            setError(null);
        } catch(err){
            console.log(err)
            setError("Failed to search movies...")
        } finally{
            setLoading(false)
        }
    }


    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" 
                placeholder="Search for movies..."
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>} {/* printing error message if occurs */}


            {/* MovieCard with conditional rendering */}
            {loading ? <div className="loading">Loading,please wait </div> : 
            // using .map for to render every movie coming from tmdb
            (<div className="movies-grid">
                {movies.map(
                    (movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery) && 
                    <MovieCard movie={movie} key={movie.id} />)
                )}
            </div>)}

        </div>
    )
}
export default Home;