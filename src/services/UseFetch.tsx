import { useEffect, useState } from "react"
import ApiClicent from "./ApiClicent"

const UseFetch = <T,>(url: string ,initialState:T) => {
    const [Books , setBooks] = useState<T>(initialState)
    const [isLoading , setIsLoading ] = useState(true)
    useEffect(()=> {    
        ApiClicent.get<T>(url).then(({data})=> {
            setIsLoading(true);
            setBooks(data);
            setIsLoading(false);
        } )
    },[])
    return {Books , isLoading}
}

export default UseFetch
