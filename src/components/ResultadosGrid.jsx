// Importacion de componentes y funciones necesarios
import { PeliculasCard } from "./PeliculasCard.jsx"
import { get } from "../utils/httpCliente.js"
import { useState, useEffect } from "react"
import { Spinner } from "./Spinner.jsx"
import { useQuery } from "../hooks/useQuery.jsx"
import { Pagination } from "./Pagination.jsx"
import { ActorCard } from "./ActorCard.jsx"
import "./ResultadosGrid.css"

export const ResultadosGrid = () => {

    // Definicion de estadps
    const [resultados, setResultados] = useState([])
    const [cargando, setCargando] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [resultadosPerPage] = useState(20); // Número de peliculas por página

    // Se utiliza el hook useQuery para obtener los parámetros de la query de la URL actual.
    const query = useQuery()

    // Se extrae el valor del parámetro "search" y se almacena en la variable search.
    const search = query.get("search");

    // Se extrae el valor del parámetro "type" y se almacena en la variable type.
    const type = query.get("type") || "pelicula"

    // Se extrae el valor del parámetro "genreId" y se almacena en la variable genreQuery.
    const genreQuery = query.get("genreId")

    const language = "&language=es-ES"

    // Se define un efecto que se ejecutará cada vez que cambien los valores de search, language, type o genreQuery.
    useEffect(() => {
        // Funcion que se encarga de obtener los resultados de la búsqueda desde la API y actualizar el estado en consecuencia.
        const fetchResultados = async () => {
            setCargando(true);

            // Inicializamos el array vacio para almacenar todas las películas
            let allResultados = [];

            // Definimos el endpoint por defecto
            let endpoint = `/discover/movie?page=`;

            // Solicitud a la API para obtener películas por género
            const getMoviesByGenre = async () => {
                const data = await get(`/discover/movie?with_genres=${genreQuery}&page=1`);
                return data
            }

            // Definimos el endpoint basado en el tipo de búsqueda
            const pageUrl = search
                ? (() => {
                    switch (type) {
                        case "pelicula":
                            return `/search/movie?query=${search}&page=`;

                        case "actor":
                            return `/search/person?query=${search}&page=`;
                        
                        default:
                            endpoint
                    }
                })()
                : endpoint;

            // Utilizamos un bucle for para obtener las primeras 5 páginas
                for (let page = 1; page <= 10; page++) {
                    // Construimos la URL dinámicamente utilizando el endpoint y otros parámetros necesarios
                    const url = `${pageUrl}${page}${language}`;;

                    // Llamamos a la API, guardamos el JSON que devuelve en la variable data y actualizamos el estado de peliculas
                    const data = 
                    type === "genero" ? await getMoviesByGenre() : await get(url);

                    if (data.results.length === 0) {
                        // No hay más resultados, salimos del bucle
                        break;
                    }

                    // Agregamos los resultados al array
                    allResultados = [...allResultados, ...data.results];
                }

            // Actualizamos el estado con todas las películas obtenidas
            setResultados(allResultados);
            setCargando(false);
        };

        // Llamamos a la función
        fetchResultados();

    }, [search, language, type, genreQuery]);

    if (cargando) {
        return <Spinner />
    }

    // Calcular índices de peliculas para la página actual
    const indexOfLastResultado = currentPage * resultadosPerPage;
    const indexOfFirstResultado = indexOfLastResultado - resultadosPerPage;
    const currentResultados = resultados && resultados.slice(indexOfFirstResultado, indexOfLastResultado);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Página siguiente
    const nextPage = () => {
        if (currentPage < Math.ceil(resultados.length / resultadosPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {!resultados.length && (
                <p className="fs-2 mt-5 text-center">No se encontraron resultados para la búsqueda: {search}</p>
            )}

            {search && resultados.length > 0 && (
                <p className="fs-2 mt-5 text-center">Resultados de búsqueda para: {search}</p>
            )}

            {type === "pelicula" && (
                <ul className="grilla">
                    {currentResultados.map((pelicula) => (
                        <PeliculasCard key={pelicula.id} pelicula={pelicula} />
                    ))}
                </ul>
            )}

            {type === "actor" && (
                <ul className="grilla">
                    {currentResultados.map((actor) => (
                        <ActorCard key={actor.id} actor={actor} />
                    ))}
                </ul>
            )}

            {type === "genero" && (
                <ul className="grilla">
                    {currentResultados.map((pelicula) => (
                        <PeliculasCard key={pelicula.id} pelicula={pelicula} />
                    ))}
                </ul>
            )}

            {/* Renderizar la paginación solo si hay resultados */}
            {resultados.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(resultados.length / resultadosPerPage)}
                    onPageChange={paginate}
                    onPrevPage={prevPage}
                    onNextPage={nextPage}
                />
            )}
        </>
    );
}