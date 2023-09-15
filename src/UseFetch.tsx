import axios from "axios"
import { useEffect, useState } from "react"

const UseFetch = <T,>(url: string , initialState:T) => {
    const [Books , setBooks] = useState<T>(initialState);
    const [isLoading , setIsLoading] = useState(true)
        useEffect(()=> {
            setIsLoading(true)
            axios.get("http://wfatairreact-001-site1.ctempurl.com/api" + url).then(({data})=> {
                setBooks(data)
                setIsLoading(false)
            })
        },[])
    return {Books , isLoading}
}

export default UseFetch
