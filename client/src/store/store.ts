import { configureStore } from "@reduxjs/toolkit";
import ProgramsReducer from "./slices/ProgramsSlice";
import GEReducer from "./slices/GESlice";
import StoreReducer from "./slices/StoreSlice";

export const store = configureStore ({
    reducer: {
       store: StoreReducer,
       programs: ProgramsReducer,
       ge: GEReducer,
    },
})

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;