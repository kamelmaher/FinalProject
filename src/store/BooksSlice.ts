import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BookType } from "../App"

type BookState = {
    book: BookType | null
}
const initialState:BookState = {
    book: null
}


export const BookSlice = createSlice({
    name: "book",
    initialState,
    reducers :{
        setBook: (state , action: PayloadAction<BookType | null>) => {
            state.book = action.payload
        }
    }
}) 

export default BookSlice.reducer;
export const {setBook} = BookSlice.actions; 