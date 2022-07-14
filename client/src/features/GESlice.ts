import {createSlice, nanoid } from "@reduxjs/toolkit";
import {fetchAllGE, fetchGE} from '../api/FetchData'

const SECTION_ID_LEN = 5; // to differentiate course in major (which cannot be remove)

const initialState:GESliceType = {
    byIds: {},
    allIds: [],
    status:"idle",
    sections: {},
}

export const geSlice = createSlice ({
    name: "store",
    initialState,
    reducers: {},
/********************************** ExtraReducers ********************************/ 
    extraReducers: (builder) => {
    /********************** FetchAllGE ************************/
        builder.addCase(fetchAllGE.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(fetchAllGE.fulfilled,(state, action) => {    
            state.status = "succeeded";

            action.payload.forEach((category) => {
                state.byIds[category.id] = {
                    id: category.id,
                    sectionIds: [],
                    name: category.name,
                    nameChild: category.note,
                    status: 'idle'
                }
                state.allIds.push(category.id);
            })
        });

        builder.addCase(fetchAllGE.rejected,(state) => {
            state.status = "failed";
        }); 

    /************************** FetchGE ************************/
        builder.addCase(fetchGE.pending,(state, action) => {
            state.byIds[action.meta.arg].status = "loading";
        });

        builder.addCase(fetchGE.fulfilled,(state, action) => {    
            const geId = action.meta.arg;
            state.byIds[geId].status = action.payload.status;

            if(state.byIds[geId].status === "succeeded") {
                action.payload.departments.forEach((dept) => {
                    let sectionId = nanoid(SECTION_ID_LEN);
                    state.byIds[geId].sectionIds.push({sectionId: sectionId, nameChild: dept});
                    state.sections[sectionId] = action.payload.courses_in_depts[dept];
                })
            }
        });

        builder.addCase(fetchGE.rejected,(state, action) => {
            state.byIds[action.meta.arg].status = "failed";
        }); 
    },
});

export default geSlice.reducer;