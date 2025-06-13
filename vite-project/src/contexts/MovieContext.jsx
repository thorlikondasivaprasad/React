import {createContext, useState, useContext, useEffect} from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => { // children is a default prop
    const [favorites, setFavorites] = useState([])

    // using localStorage
    // parsing favorites as ['movie1','movie2'.....]
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs)) 
    }, [])

    // [...] into strings,adding favs into localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites)) 
    }, [favorites])

    // adding to favs
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    // remove from favs
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    // checking movie is fav or not
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}