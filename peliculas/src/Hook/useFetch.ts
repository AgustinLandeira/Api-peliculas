import { useEffect, useState } from "react"

type Data<T> = T[] | null
type errorState = Error | null

interface Props<T>{

    data : Data<T>
    loading:boolean
    error: errorState

}

const useFetch = <T>(url:string,arrayMovies:string[]):Props<T> =>{

    const [data,setData] = useState<Data<T>>([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState<errorState>(null)

    const urlStatic: string = url

    useEffect(()=>{

        const controller = new AbortController()

        const fetchData = async() =>{
            

            setLoading(true)
            let allMoviesData : T[] = []

            try{

                for(const movie of arrayMovies){

                    const response = await fetch(`${urlStatic}${movie}`,controller)
                    

                    if(!response.ok){

                        throw new Error("Error al conectarse con la api")
                    }

                    const search = await response.json()
                    const fetchData : T[] = search.Search

                    allMoviesData = [...allMoviesData,...fetchData]

                    
                }
                setData(allMoviesData)
                setError(null)

            }catch(err){
                setError(err as Error)
            }finally{
                setLoading(false)
            }

        }

        fetchData()

        return ()=>{
            controller.abort()
        }

    },[url])

    return {data,loading,error}
}

export default useFetch