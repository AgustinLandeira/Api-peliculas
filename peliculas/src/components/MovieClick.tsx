interface Props{

    movieSelected : {
        Title: string,
        Poster : string,
        Year: string,
        Type : string
    },
    parenMethod : () => void
}

const MovieClick = ({movieSelected,parenMethod}:Props) =>{

    return (
        <>

        <div className="movie-modal">
            <div className="movie-info">

                <h2>{movieSelected.Title}</h2>
                <img src={movieSelected.Poster} alt={movieSelected.Title} />
                <p><strong>Year:</strong> {movieSelected.Year}</p>
                <p><strong>Type:</strong> {movieSelected.Type}</p>

                <button className="button-movie" onClick={parenMethod}>Cerrar</button>

            </div>
        </div>
        
            
        
        </>
    )

}

export default MovieClick