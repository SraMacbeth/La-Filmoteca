import { Link } from "react-router-dom"
import "./PeliculasCard.css"

export const PeliculasCard = ({ pelicula }) => {

    const imgUrl = `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`

    const genericFilm = `/src/img/generic_film.png`

    return (
        <li className="moviesCard">
            <Link to={`/pelicula/${pelicula.id}`}>
                {pelicula.poster_path ? (
                    <div className="movieImageContainer">
                        <img src={imgUrl} alt={pelicula.title} className="movieImage" />
                    </div>
                ) : (
                    <div className="genericFilmContainer">
                        <img src={genericFilm} alt="Generic Film" className="genericFilmImage" />
                    </div>
                )}
                <div className="peliculaTitle">
                    {pelicula.title}
                </div>
            </Link>
        </li>
    )
}   