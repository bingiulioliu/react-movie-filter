import styles from "./MoviesDb.module.css";
import movies from "../data/movies.js";
import { useEffect } from "react";
import { useState } from "react";

function MoviesDb() {

    const [newMovie, setNewMovie] = useState('');
    const [movieList, setMovieList] = useState(movies);
    const [search, setSearch] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('')
    const [movieListFiltered, setMovieListFiltered] = useState(movieList);

    const allGenres = movies.map(movie => movie.genre);
    // rimuovo i doppioni
    const generiSet = new Set(allGenres);
    // trasformo in un array
    const moviesGenres = Array.from(generiSet);

    useEffect(() => {
        console.log('setup function: ' + search);

        const movieFiltered = movieList.filter(movie => {
            // Filtro per Titolo
            const matchesTitle = movie.title.toLowerCase().includes(search.toLowerCase());
            
            // Filtro per Genere (se vuoto mostra tutto, altrimenti confronta)
            const matchesGenre = selectedGenre === "" || movie.genre === selectedGenre;

            return matchesTitle && matchesGenre;
        });

        setMovieListFiltered(movieFiltered);

    }, [search, movieList, selectedGenre]);

    const changeInputHandler = (event) => {
        const {name, value} = event.target;

        if (name === 'search') {
            setSearch(value);
        } else if (name === 'genre') {
            setSelectedGenre(value);
        }
    };



    return <>
        <div className="d-flex justify-content-center align-items-center">
            <h1 className={`${styles.title} text-primary`}>React Movie Filter</h1>
        </div>
        <div className="container d-flex justify-content-center align-items-center">
            {/* Form di filtraggio */}
            <div>
                <h2>Filtra Film</h2>
                <input 
                type="text" 
                value={search} 
                onChange={changeInputHandler}
                name = "search"/>
                <select name="search" onChange={changeInputHandler}>
                    <option value={moviesGenres}></option>
                </select>
                <h2>Lista Film</h2>
                <ul>
                    {movieListFiltered.map(({ title, genre }, index) => {
                        return <li key={index}>Titolo: {title} - Genere: {genre}</li>
                    })}
                </ul>

            </div>
        </div>
    </>;
}
export default MoviesDb;
