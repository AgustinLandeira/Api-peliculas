
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './Hook/useFetch'
import MovieClick from './components/MovieClick'
import SectionPage from './components/SectionPage'
import { HeaderMovie } from './components/Header'
import { SectionMovie } from './components'

export interface Data {
  Title:string,
  Poster:string,
  Year : string,
  Type: string
  imdbID : string
  
}
function App() {

  const apiKey = "8642e0eb"
  const movies = ["Frozen","Superman","Flash","Justice League","Arrow","Joker","Supergirl","Star Wars"]
  
  const {data,loading,error} = useFetch<Data>(`https://www.omdbapi.com/?apikey=${apiKey}&s=`,movies)

  //estados
  const [lista,setLista] = useState(data)
  
  const [movieSelected,setMovieSelected] = useState<Data | null>(null)
  const [currentPage,setCurrentPage] = useState(1)//pagina actual

  //declarar variables normalmente
  const moviePage = 12
  const indexOfLastMovie = currentPage * moviePage //guardamos el ultimo indice de la pelicula de dicha pagina
  const indexOfFirstMovie = indexOfLastMovie - moviePage//guardamos el primer indice de la peli de dicha peli
  const currentMovies = lista?.slice(indexOfFirstMovie,indexOfLastMovie)//agarramos las peliculas para dicha pagina

  const totalPages = Math.ceil((lista?.length || 0) / moviePage)//calculamos la cantidad de paginas necesarias para distribuir las peliculas

  //entra la primera vez por defecto y despues entrara cada vez que se modifique data
  useEffect(()=>{

    setLista(data)
    
  },[data])

  const updateListMovies = (list:Data[] | null) =>{

    setLista(list)
    setCurrentPage(1)

  }

  const handleButtonMovie = (movieSelected: Data | null) =>{

    setMovieSelected(movieSelected)
  }

  const nextPage = () => {//avanza de pagina

    if(currentPage < totalPages)setCurrentPage(currentPage + 1)
  }

  const prevPage = () =>{//retrocede de pagina

    if(currentPage > 1 )setCurrentPage(currentPage - 1)
  }


  if(loading){
    return <div>loading...</div>
  }
  if(error){
    return <div>ups,there's a mistake:{error.message}</div>
  }
  
  return (
    <>
      <HeaderMovie updateList={updateListMovies} data={data}></HeaderMovie>

      <SectionMovie currentMovies={currentMovies} methodMovie={handleButtonMovie}></SectionMovie>

      {movieSelected && <MovieClick movieSelected={movieSelected} parenMethod={() => handleButtonMovie(null)}></MovieClick>}

      {lista?.length === 0 && <div>No results</div>}

      {(lista?.length || 0) > 0 && <SectionPage currentPage={currentPage} prevPage={prevPage} totalPages={totalPages} nextPage={nextPage}></SectionPage>}
        
    </>
  )
}

export default App
