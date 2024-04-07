import { get } from "../utils/httpCliente.js"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Spinner } from "../components/Spinner.jsx"
import { Videos } from "../components/Videos.jsx"
import "bootstrap/dist/css/bootstrap.css"
import "./DetallePelicula.css"

export const DetallePelicula = () => {

    const [pelicula, setPelicula] = useState(null)

    const [cargando, setCargando] = useState(true)

    const { peliculaId } = useParams()

    useEffect(() => {
        // la pelicula esta cargando antes de la consulta a la api
        setCargando(true)
        // llamo a la funcion que conecta con la api, guardo el json que devuelve en la variable data y actualizo el estado de peliculas
        get(`movie/${peliculaId}`).then((data) => {
            /* console.log(data) */
            setPelicula(data)
            // la pelicula deja de cargar cuando se actualiza su estado con setPelicula
            setCargando(false)
        })
    }, [peliculaId])

    if (cargando) {
        return <Spinner />
    }

    const imgUrl = `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`

    const genericFilm = `/src/img/generic_film.png`

    return (
        <>
            <div className="container">
                {pelicula.poster_path ? (
                    <img src={imgUrl} alt={pelicula.title} className="movieImage"/>
                ) : (
                    <img src={genericFilm} alt="Generic Film" className="genericFilmImage"/>
                )}
                <div className="detallePelicula">
                    <p className="item"><strong>Titulo:</strong> {pelicula.title}</p>
                    <p className="item"><strong>Descripcion:</strong> {pelicula.overview}</p>
                    <p className="item"><strong>Generos:</strong> {pelicula.genres.map((genre) => genre.name).join(" - ")}</p>
                    <p className="item"><strong>Fecha de lanzamiento:</strong> {pelicula.release_date}</p>
                    <p className="item"><strong>Companias productoras: </strong>
                        {pelicula.production_companies.map((company) => company.name).join(" - ")}</p>
                </div>
            </div>
            <Videos />
        </>
    )
}