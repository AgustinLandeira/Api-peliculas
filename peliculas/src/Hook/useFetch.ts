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

    

    useEffect(()=>{

        const fetchData = async() =>{

            setLoading(true)

            for(const movie of arrayMovies){


                try{

                    const response = await fetch(`${url}${movie}`)

                    if(!response.ok){
                        throw new Error("hubo un error al realizar la peticion")
                    }

                    const search  = await response.json()
                    const fetchData : T[] = search.Search

                    
                    setData((prevData)=>{

                        if(prevData){
                            return [...(prevData || []),...fetchData]
                        }else{
                            return fetchData
                        }
                    })
                    setError(null)
                    

                }catch(err)
                {
                    setError(err as Error)
                    

                }finally{
                    setLoading(false)
                }

            }

            

        }

        fetchData()

    },[])

    return {data,loading,error}
}

export default useFetch