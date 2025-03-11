
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './Hook/useFetch'
import FilterButton from './components/FilterByKind'

interface Data {
  title:string,
  Poster:string,
  Year : string,
  Type: string
  imdbID : string
  
}
function App() {

  const apiKey = "8642e0eb"
  const movies = ["Frozen","Superman","Flash","Justice League"]
  
  const {data,loading,error} = useFetch<Data>(`https://www.omdbapi.com/?apikey=${apiKey}&s=`,movies)

  const [lista,setLista] = useState(data)
  console.log(JSON.stringify(data))
  
  useEffect(()=>{

    setLista(data)
    
  },[data])


  const filtrarPeliculas = () =>{

    if(data){
      setLista(data?.filter(movie => movie.Type == "movie"))
    }

  }

  const filtrarSeries = () =>{

    if(data){
      setLista(data?.filter(movie =>movie.Type == "series"))
    }
  }

  const filtrarTodo = () =>{

    setLista(data)
  }
  

  if(loading){
    return <div>cargando...</div>
  }
  if(error){
    return <div>ups, hay un error:{error.message}</div>
  }

  
  return (
    <>
      <header>

        <h1>🎬 MY App of movies</h1>

        <nav className='nav-search'>

          <FilterButton parenMethod={filtrarSeries}>Series</FilterButton>
          <FilterButton parenMethod={filtrarPeliculas}>Movies</FilterButton>
          <FilterButton parenMethod={filtrarTodo}>Todo</FilterButton>
      
          <input type="text" placeholder='Search your movie here' />
        </nav>
        
      </header>
        <ul>
          {lista?.map((movie)=>(
            <li key={movie.imdbID}><img  src={movie.Poster}  /></li>
          ))}
        </ul>
        
    </>
  )
}

export default App
