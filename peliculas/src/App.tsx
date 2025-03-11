
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './Hook/useFetch'
import FilterButton from './components/FilterByKind'

interface Data {
  Title:string,
  Poster:string,
  Year : string,
  Type: string
  imdbID : string
  
}
function App() {

  const apiKey = "8642e0eb"
  const movies = ["Frozen","Superman","Flash","Justice League"]
  
  const {data,loading,error} = useFetch<Data>(`https://www.omdbapi.com/?apikey=${apiKey}&s=`,movies)

  //estados
  const [lista,setLista] = useState(data)
  const [valueInput,setValueInput] = useState("")

  console.log(JSON.stringify(data))
  
  useEffect(()=>{

    setLista(data)
    
  },[data])


  const filterMovies = () =>{

    if(data && valueInput !=""){
      
      setLista(data?.filter(movie => movie.Type == "movie" && movie.Title.startsWith(valueInput)))
    }else{

      if(data){setLista(data?.filter(movie => movie.Type == "movie"))}
    }

  }

  const filterSeries = () =>{

    if(data && valueInput != ""){
      console.log(valueInput)
      setLista(data?.filter(movie =>movie.Type == "series" && movie.Title.startsWith(valueInput)))
    }else{
      if(data){setLista(data?.filter(movie => movie.Type == "series"))}
    }
  }

  const filterAll = () =>{

    setLista(data)
    setValueInput("")
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

      setLista(data?.filter(movie => movie.Title.startsWith(value)))
      
    }else{

      if(value == ""){
          setLista(data)
      }
      
    }
    

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
        <ul>
          {lista?.map((movie)=>(
            <li key={movie.imdbID}><img  src={movie.Poster}  /></li>
          ))}
        </ul>
        
    </>
  )
}

export default App
