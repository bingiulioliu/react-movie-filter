import styles from "./MoviesDb.module.css";
import movies from "../data/movies.js";
import { useEffect } from "react";
import { useState } from "react";

function MoviesDb() {

    const allGenres = movies.map(movie => movie.genre);
    // rimuovo i doppioni
    const generiSet = new Set(allGenres);
    // trasformo in un array
    const moviesGenres = Array.from(generiSet);
    console.log(moviesGenres);



    return <>
        <div className="d-flex justify-content-center align-items-center">
            <h1 className={`${styles.title} text-primary`}>React Movie Filter</h1>
        </div>
        <div className="container d-flex justify-content-center align-items-center">
            {/* Form di filtraggio */}
            <div>
                <h2>Filtra Film</h2>
                {/*
                <input type="text" value={search} onChange={changeInputHandler} name="search" />
                <select name="search" onChange={changeInputHandler}>
                    <option value={moviesGenres}></option>
                </select> */}
                <h2>Lista Film</h2>
                <ul>
                    {movies.map(({title, genre}, index) => {
                        return <li key={index}>Titolo: {title} - Genere: {genre}</li>
                    })}
                </ul>

            </div>
        </div>
    </>;
}
export default MoviesDb;
