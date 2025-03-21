import { Data } from "../App"

interface PropsMovie{

    currentMovies : Data[] | undefined,
    methodMovie : (movie:Data) => void
}
export const SectionMovie = ({currentMovies,methodMovie}:PropsMovie) =>{

    
    return (
        <>
        
        <section>
            <ul>
            {currentMovies?.map((movie)=>(
                <li key={movie.imdbID} onClick={() => methodMovie(movie)} ><img  src={movie.Poster}  /></li>
            ))}
            </ul>
        </section>
        
        </>
    )


}