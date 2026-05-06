import styles from "./MoviesDb.module.css";
import movies from "../data/movies.js";
import { useEffect } from "react";
import { useState } from "react";

function MoviesDb() {
    // Definizioni stati
    const [newMovie, setNewMovie] = useState(''); // Stato per nuovo film inserito
    const [movieList, setMovieList] = useState(movies); // DB
    const [search, setSearch] = useState(''); // testo inserito nel input
    const [selectedGenre, setSelectedGenre] = useState('') // genere selezionato
    const [movieListFiltered, setMovieListFiltered] = useState(movieList); // lista filtrata montata

    // Estrazione generi
    const allGenres = movies.map(movie => movie.genre);
    // rimuovo i doppioni
    const generiSet = new Set(allGenres);
    // trasformo in un array
    const moviesGenres = Array.from(generiSet);

    // Filtraggio
    useEffect(() => {
        console.log('setup function: ' + search);
        // Funzione che parte ad ogni modifica delle dipendenze
        const movieFiltered = movieList.filter(movie => {
            // Filtro per Titolo
            const matchesTitle = movie.title.toLowerCase().includes(search.toLowerCase());
            
            // Filtro per Genere (se vuoto mostra tutto, altrimenti confronta)
            const matchesGenre = selectedGenre === "" || movie.genre === selectedGenre;

            return matchesTitle && matchesGenre;
        });
        // Aggiorna la lista visualizzata
        setMovieListFiltered(movieFiltered);

        // Dipendenze: l'effect parte ogni volta che una di queste cambia
    }, [search, movieList, selectedGenre]);

    const changeInputHandler = (event) => {
        const {name, value} = event.target; // destructuring dell'input

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
                <select 
                name="genre" 
                value={selectedGenre}
                onChange={changeInputHandler}>
                    <option value=''>Seleziona il genere</option>
                    {moviesGenres.map((genre) => (
                        <option key={genre} value={genre}>{genre}
                    </option>
                    ))}
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
