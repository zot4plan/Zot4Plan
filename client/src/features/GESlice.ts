import {createSlice, nanoid } from "@reduxjs/toolkit";
import {fetchAllGE, fetchGE} from '../api/FetchData'

export const SECTION_ID_LEN = 4; // to differentiate course in major (which cannot be remove)

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
            console.log(action.meta);
            state.byIds[action.meta.arg].status = "loading";
        });

        builder.addCase(fetchGE.fulfilled,(state, action) => {    
            const geId = action.meta.arg;
            state.byIds[geId].status = "succeeded";

            // group courses by dept
            let dept = "";
            let sectionId = ""

            action.payload.courses.forEach((course) => {
                if(course.department !== dept) {
                    sectionId = nanoid(SECTION_ID_LEN);
                    dept = course.department;
                    state.byIds[geId].sectionIds.push({sectionId: sectionId, nameChild: dept});
                    state.sections[sectionId] = [];
                }
                state.sections[sectionId].push(course.id);
            })
        });

        builder.addCase(fetchGE.rejected,(state, action) => {
            state.byIds[action.meta.arg].status = "failed";
        }); 
    },
});

export default geSlice.reducer;