
import './App.css'
import useFetch from './Hook/useFetch'

interface Data {
  title:string,
  Poster:string,
  Year : string,
  Type: string
  imdbID : string
  
}
function App() {

  const apiKey = "8642e0eb"
  const movies = ["Frozen","Superman"]
  //https://www.omdbapi.com/?apikey=&s=Superman
  
  const {data,loading,error} = useFetch<Data>(`https://www.omdbapi.com/?apikey=${apiKey}&s=`,movies)

  
  

  if(loading){
    return <div>cargando...</div>
  }
  if(error){
    return <div>ups, hay un error:{error.message}</div>
  }

  
  return (
    <>
      

        <ul>
          {data?.map((character)=>(
            <li><img key={character.imdbID} src={character.Poster}  /></li>
          ))}
        </ul>
        
    </>
  )
}

export default App
