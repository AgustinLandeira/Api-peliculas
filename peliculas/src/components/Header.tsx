import { useState } from "react"
import { Data } from "../App"
import FilterButton from "./FilterByKind"



interface PropsHeader{

    updateList : (list: Data[] | null) => void,
    data : Data[] | null
}
export const HeaderMovie = ({updateList,data}:PropsHeader) =>{

    const [valueInput,setValueInput] = useState("")

  //Esta función manejará el evento de cambio (onChange) en un <input>,es decir,actualiza el valor del input
  // argumento event, que es el objeto de evento del navegador.
  //indicamos que el evento proviene de un input

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) =>{

        setValueInput(event.target.value)//el event.target representa el elemento html que disparo el objeto

        updatingByInput(event.target.value)

    }

    const filterMovies = () =>{

        //si data tiene un array con un o mas elementos y si el buscador tiene mas de un caracter entrara al primer bloque
        // de lo contrario se le mostrara al usuario todos las peliculas de tipo movie sin tener en cuenta que dice el mostrador
        if(data && valueInput !=""){
            //esto devolvera un array con aquellos elemento que cumplan con la condicion(si el el tipo de pelicula es movie y si el titulo coincide con las palabras del input) 
            //setLista(data?.filter(movie => movie.Type == "movie" && movie.Title.toLocaleLowerCase().startsWith(valueInput.toLocaleLowerCase())))
            const newList : Data[] | null = data?.filter(movie => movie.Type == "movie" && movie.Title.toLocaleLowerCase().startsWith(valueInput.toLocaleLowerCase()))
            updateList(newList)
            
        }else{
    
            if(data){
                const newList = data?.filter(movie => movie.Type == "movie")
                updateList(newList)
                
            }
        }
    
    }

    //lo mismo que con la funcion filterMovies pero en vez de movies es series
    const filterSeries = () =>{

        if(data && valueInput != ""){

        
            const newList = data?.filter(movie =>movie.Type == "series" && movie.Title.toLocaleLowerCase().startsWith(valueInput.toLocaleLowerCase()))
            updateList(newList)
        
        }else{

            if(data){
                const newList = data?.filter(movie => movie.Type == "series")
                updateList(newList)
            }
        }
    }

    //muestra todas las peliculas tanto de movies como de series
    const filterAll = () =>{

        updateList(data)
        //reiniciamos eñ valor del input
        
        setValueInput("")
        
        
    }

    const updatingByInput = (value: string) =>{


        if( data && data?.length > 0 && value.length > 0){
    
            const list = data?.filter(movie => movie.Title.toLocaleLowerCase().startsWith(value.toLowerCase()))
            updateList(list)
          
        }else{
    
            if(value == ""){

                updateList(data)
                
            }

        }
        
      }

    return (
        <>
        
        <header>

        <h1>🎬 MY App of movies</h1>

        <nav className='nav-search'>

            <FilterButton parenMethod={filterSeries} >Series</FilterButton>
            <FilterButton parenMethod={filterMovies}>Movies</FilterButton>
            <FilterButton parenMethod={filterAll} >All</FilterButton>
      
            <input type="text" value={valueInput} onChange={handleInputChange} placeholder='search here' />
        </nav>
        
      </header>
        
        </>
    )

}