
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './Hook/useFetch'
import FilterButton from './components/FilterByKind'
import MovieClick from './components/MovieClick'
import SectionPage from './components/SectionPage'

interface Data {
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
  const [valueInput,setValueInput] = useState("")
  const [movieSelected,setMovieSelected] = useState<Data | null>(null)
  const [currentPage,setCurrentPage] = useState(1)//pagina actual

  //declarar variables normalmente
  const moviePage = 12
  const indexOfLastMovie = currentPage * moviePage //guardamos el ultimo indice de la pelicula de dicha pagina
  const indexOfFirstMovie = indexOfLastMovie - moviePage//guardamos el primer indice de la peli de dicha peli
  const currentMovies = lista?.slice(indexOfFirstMovie,indexOfLastMovie)//agarramos las peliculas para dicha pagina

  const totalPages = Math.ceil((lista?.length || 0) / moviePage)

  
  useEffect(()=>{

    setLista(data)
    
  },[data])


  const filterMovies = () =>{

    if(data && valueInput !=""){
      
      setLista(data?.filter(movie => movie.Type == "movie" && movie.Title.toLocaleLowerCase().startsWith(valueInput.toLocaleLowerCase())))
      setCurrentPage(1)
      
    }else{

      if(data){
        setLista(data?.filter(movie => movie.Type == "movie"))
        setCurrentPage(1)
      }
      
      
    }

  }

  const filterSeries = () =>{

    if(data && valueInput != ""){

      
      setLista(data?.filter(movie =>movie.Type == "series" && movie.Title.toLocaleLowerCase().startsWith(valueInput.toLocaleLowerCase())))
      setCurrentPage(1)
      
    }else{

      if(data){setLista(data?.filter(movie => movie.Type == "series"))}
      setCurrentPage(1)
      
    }
  }

  const filterAll = () =>{

    setLista(data)
    setValueInput("")
    setCurrentPage(1)
    
  }

  //Esta función manejará el evento de cambio (onChange) en un <input>,es decir,actualiza el valor del input
  // argumento event, que es el objeto de evento del navegador.
  //indicamos que el evento proviene de un input
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) =>{

    setValueInput(event.target.value)//el event.target representa el elemento html que disparo el objeto

    updatingByInput(event.target.value)

  }

  const updatingByInput = (value: string) =>{

    

    if( data && data?.length > 0 && value.length > 0){

      setLista(data?.filter(movie => movie.Title.toLocaleLowerCase().startsWith(value.toLowerCase())))
      setCurrentPage(1)
      
    }else{

      if(value == ""){
          setLista(data)
          setCurrentPage(1)
      }
      
    }
    
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
      <header>

        <h1>🎬 MY App of movies</h1>

        <nav className='nav-search'>

          <FilterButton parenMethod={filterSeries}>Series</FilterButton>
          <FilterButton parenMethod={filterMovies}>Movies</FilterButton>
          <FilterButton parenMethod={filterAll}>All</FilterButton>
      
          <input type="text" value={valueInput} onChange={handleInputChange} placeholder='search here' />
          
        </nav>
        
      </header>

      <section>
        <ul>
          {currentMovies?.map((movie)=>(
            <li key={movie.imdbID} onClick={() => handleButtonMovie(movie)} ><img  src={movie.Poster}  /></li>
          ))}
        </ul>
      </section>

      {movieSelected && <MovieClick movieSelected={movieSelected} parenMethod={() => handleButtonMovie(null)}></MovieClick>}

      {lista?.length === 0 && <div>No results</div>}

      {(lista?.length || 0) > 0 && <SectionPage currentPage={currentPage} prevPage={prevPage} totalPages={totalPages} nextPage={nextPage}></SectionPage>}
        
    </>
  )
}

export default App
