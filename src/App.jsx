import { LandingPage } from "./pages/LandingPage"
import { DetallePelicula } from "./pages/DetallePelicula"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { PeliculasActorGrid } from "./components/PeliculasActorGrid.jsx"
import { Footer } from "../src/components/Footer.jsx"
import "./App.css"

export const App = () => {
  return (
    <>
    <BrowserRouter>
      <header> 
        <Link to="/">
          <h1 className="title mt-3">LA FILMOTECA</h1>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pelicula/:peliculaId" element={<DetallePelicula />} />
        <Route path="/peliculasActor/:actorId" element={<PeliculasActorGrid />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  )
}