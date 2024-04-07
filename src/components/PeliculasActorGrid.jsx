import React, { useState, useEffect } from "react";
import { get } from "../utils/httpCliente.js";
import { useParams } from "react-router-dom"
import { Spinner } from "./Spinner.jsx";
import { PeliculasCard } from "./PeliculasCard.jsx";
import { Pagination } from "./Pagination.jsx";

export const PeliculasActorGrid = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { actorId } = useParams()
    const [nombreActor, setNombreActor] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [resultadosPerPage] = useState(20); // Número de peliculas por página

    useEffect(() => {
        const fetchPeliculasActor = async () => {
            try {
                setCargando(true);

                const urlActor = `/person/${actorId}`;
                const dataActor = await get(urlActor)
                setNombreActor(dataActor.name)

                const url = `/person/${actorId}/movie_credits`;
                const data = await get(url);

                setPeliculas(data.cast);
            } catch (error) {
                console.error("Error al obtener las películas del actor:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchPeliculasActor();
    }, [actorId]);

    if (cargando) {
        return <Spinner />;
    }

    // Calcular índices de peliculas para la página actual
    const indexOfLastResultado = currentPage * resultadosPerPage;
    const indexOfFirstResultado = indexOfLastResultado - resultadosPerPage;
    const currentResultados = peliculas && peliculas.slice(indexOfFirstResultado, indexOfLastResultado);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Página siguiente
    const nextPage = () => {
        if (currentPage < Math.ceil(peliculas.length / resultadosPerPage)) {
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
            {!currentResultados.length && (
                <p className="fs-2 mt-5 text-center">No se encontraron resultados para: {nombreActor}</p>
            )}
            {currentResultados.length > 0 && (
                <>
                    <p className="fs-2 mt-5 text-center">Resultados para la búsqueda: {nombreActor}</p>
                    <ul className="grilla">
                        {currentResultados.map((pelicula) => (
                            <PeliculasCard key={pelicula.id} pelicula={pelicula} />
                        ))}
                    </ul>
                </>
            )}

            {/* Renderizar la paginación solo si hay resultados */}
            {currentResultados.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(peliculas.length / resultadosPerPage)}
                    onPageChange={paginate}
                    onPrevPage={prevPage}
                    onNextPage={nextPage}
                />
            )}

        </>
    );
};
