import { configureStore } from "@reduxjs/toolkit";
import ProgramsReducer from "./slices/ProgramsSlice";
import GEReducer from "./slices/GESlice";
import CourseReducer from "./slices/CourseSlice";
import VirtualCafeReducre from "./slices/VirtualCafeSlice";

export const store = configureStore ({
    reducer: {
       course: CourseReducer,
       programs: ProgramsReducer,
       ge: GEReducer,
       virtualCafe: VirtualCafeReducre,
    },
})

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;