import { useLocation } from "react-router-dom"; // 10 - importar useLocation

// 11 - Función que utiliza el hook useLocation para obtener los parámetros de búsqueda de la URL actual.
export const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

