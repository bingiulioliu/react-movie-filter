import styles from "./MoviesDb.module.css";
import movies from "../data/movies.js";

function MoviesDb() {
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <h1 className={`${styles.title} text-primary`}>React Movie Filter</h1>
        </div>
    );
}
export default MoviesDb;
