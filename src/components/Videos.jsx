import { get } from "../utils/httpCliente.js"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import "./Videos.css"

export const Videos = () => {
    const [trailerSrc, setTrailerSrc] = useState(null);
    const [movieSrc, setMovieSrc] = useState(null);
    const [mostrarTrailer, setMostrarTrailer] = useState(false);
    const [mostrarPelicula, setMostrarPelicula] = useState(false);
    const [pestanaActiva, setPestanaActiva] = useState('trailer');
    const [mensajeError, setMensajeError] = useState(null);

    const { peliculaId } = useParams()

    const getMovieTrailer = async () => {
        try {
            const response = await get(`/movie/${peliculaId}/videos?`);
            const videos = response.results;

            if (videos && videos.length > 0) {
                const key = videos[0].key;
                const trailerSrc = `https://www.youtube.com/embed/${key}`;
                setTrailerSrc(trailerSrc);
                setMostrarTrailer(true);
            } else {
                setMensajeError("Trailer no encontrado.");
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
            setMensajeError("Ocurrió un error al obtener el trailer.");
        }
    };

    const getMovie = () => {
        const movieUrl = `https://moviesapi.club/movie/${peliculaId}&tmdb=1`
        setMovieSrc(movieUrl)
        setMostrarPelicula(true);
    }

    const cambiarPestana = (nuevaPestana) => {
        if (nuevaPestana === 'trailer') {
            getMovieTrailer();
        } else {
            getMovie();
            setMensajeError(null);
        }
        setPestanaActiva(nuevaPestana);
    };

    return (
        <div className="card text-center cardContainer border border-0 mt-4 mb-4">
            <div className="card-header border border-0 bg-white">
                <ul className="nav nav-pills card-header-pills justify-content-center">
                    <li className="nav-item m-1">
                        <button onClick={() => cambiarPestana('trailer')} className={`nav-link ${pestanaActiva === 'trailer' ? 'active' : ''}`}>Ver Trailer</button>
                    </li>
                    <li className="nav-item m-1">
                        <button onClick={() => cambiarPestana('pelicula')} className={`nav-link ${pestanaActiva === 'pelicula' ? 'active' : ''}`}>Ver Pelicula</button>
                    </li>
                </ul>
            </div>

            {mensajeError && (
                <div className="alert alert-danger m-3 mx-auto text-center" role="alert" style={{ maxWidth: '400px' }}>
                    {mensajeError}
                </div>
            )}

            <div className="card-body">
                {pestanaActiva === 'trailer' && (
                    <div className="iframe-container">
                        {trailerSrc && <iframe src={trailerSrc} allowFullScreen className="frame"></iframe>}
                    </div>
                )}
                {pestanaActiva === 'pelicula' && (
                    <div className="iframe-container">
                        {movieSrc && <iframe src={movieSrc} allowFullScreen className="frame"></iframe>}
                    </div>
                )}
            </div>
        </div>
    )
}

