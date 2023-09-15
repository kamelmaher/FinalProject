export type author = { 
    id: number,
    name: string
}
export type category = {
    id:number,
    name: string
}
export type publisher = {
    id:number,
    name: string,
    logo: string
}
export type BookType = {
    id: number,
    name: string,
    about: string,
    price: number,
    publishYear: number,
    discount: number,
    image: FileList,
    author: author,
    category: category,
    publisher: publisher
    pageCount: number
}
