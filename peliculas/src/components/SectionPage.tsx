
interface PropsPage{

    currentPage : number,
    prevPage : () => void,
    totalPages: number,
    nextPage : () => void,

}
const SectionPage = ({currentPage,prevPage,totalPages,nextPage}:PropsPage) =>{

    return(
        <>
        
        <div className="page-section">

          <button disabled={currentPage === 1} onClick={prevPage}> Prev </button>
          <span>Page: {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={nextPage}>Next</button>

        </div>
        
        </>
    )

}

export default SectionPage