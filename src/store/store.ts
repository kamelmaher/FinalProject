import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "./authSlice";
import  BookSlice  from "./BooksSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    Book: BookSlice
  },
  
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
