import { configureStore } from "@reduxjs/toolkit";
import ScheduleReducer from "../features/ScheduleSlice";
import RequirementReducer from "../features/RequirementSlice";

export const store = configureStore ({
    reducer: {
       requirement: RequirementReducer,
       shedule: ScheduleReducer,
    },
})

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;