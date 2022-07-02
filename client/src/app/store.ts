import { configureStore } from "@reduxjs/toolkit";
import ProgramsReducer from "../features/ProgramsSlice";
import GEReducer from "../features/GESlice";
import StoreReducer from "../features/StoreSlice";

export const store = configureStore ({
    reducer: {
       store: StoreReducer,
       programs: ProgramsReducer,
       ge: GEReducer,
    },
})

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;