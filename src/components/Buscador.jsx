import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../utils/httpCliente.js"

export const Buscador = () => {
  const navigate = useNavigate();
  const [txtBuscador, setTextBuscador] = useState("");
  const [tipoBusqueda, setTipoBusqueda] = useState("pelicula");
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [tipoBusquedaSeleccionado, setTipoBusquedaSeleccionado] = useState("pelicula");
  const [generos, setGeneros] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")

  const handleTipoBusquedaChange = (nuevoTipo) => {
    setTipoBusqueda(nuevoTipo);
    setTipoBusquedaSeleccionado(nuevoTipo); // Agregar esta línea para actualizar el tipo de búsqueda seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    let type = tipoBusquedaSeleccionado;
    let genreQueryParam = "";

    if (tipoBusquedaSeleccionado === "genero") {
      genreQueryParam = `&genreId=${selectedGenre}`;
    }

    try {
      const data = await get();
      setResultados(data.results);
      navigate(`/?search=${txtBuscador}&type=${type}${genreQueryParam}`); // Actualiza la URL con el tipo de búsqueda seleccionado
      setTextBuscador("")
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      setResultados([]);
    } finally {
      setCargando(false);
    }
  };

  // Acceder al listado de generos de la DB
  const getGenres = async () => {
    const dataGenres = await get(`genre/movie/list`)
    return dataGenres.genres
  }

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      setGeneros(genres);

      // Reinicia selectedGenre si el tipo de búsqueda no es "genero"
      if (tipoBusquedaSeleccionado !== "genero") {
        setSelectedGenre("");
      }
    };
    fetchGenres();
  }, [tipoBusquedaSeleccionado === "genero"]);


  return (
    <div className="d-flex flex-column align-items-center">
      <div>
        {/* Selector de tipo de búsqueda */}
        <div>
          <label className="m-2">
            <input
              type="radio"
              value="pelicula"
              checked={tipoBusqueda === "pelicula"}
              onChange={() => handleTipoBusquedaChange("pelicula")}
              className="m-1"
            />
            Película
          </label>

          <label className="m-2">
            <input
              type="radio"
              value="actor"
              checked={tipoBusqueda === "actor"}
              onChange={() => handleTipoBusquedaChange("actor")}
              className="m-1"
            />
            Actor
          </label>

          <label className="m-2">
            <input
              type="radio"
              value="genero"
              checked={tipoBusqueda === "genero"}
              onChange={() => handleTipoBusquedaChange("genero")}
              className="m-1"
            />
            Género
          </label>
        </div>

        {tipoBusquedaSeleccionado === "genero" && (

          <form onSubmit={handleSubmit} className="d-flex">
            <select
              name="genre"
              id="genre"
              value={selectedGenre}
              onChange={
                (e) => setSelectedGenre(e.target.value)}
              className="form-select"
              style={{ width: '300px' }}
            >
              {generos.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-outline-success">
              <FaSearch />
            </button>
          </form>

        )}



        {tipoBusquedaSeleccionado != "genero" && (
          <form onSubmit={handleSubmit} role="search" className="d-flex">

            <input
              type="search"
              value={txtBuscador}
              onChange={(e) => setTextBuscador(e.target.value.toUpperCase())}
              placeholder={`Buscar por ${tipoBusqueda}`}
              className="form-control"
              style={{ width: '300px' }}
            />

            <button type="submit" className="btn btn-outline-success">
              <FaSearch />
            </button>

          </form>
        )}
      </div>
    </div>
  )
};