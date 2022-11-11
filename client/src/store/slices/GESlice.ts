import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllGE, getGE } from '../../controllers/HomeController'
import { ID_LENGTH } from "../constants/Constants";

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
    extraReducers: (builder) => {
        /**
         * Http Get
         * get all ge
         */
        builder.addCase(getAllGE.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(getAllGE.fulfilled,(state, action) => {    
            state.status = "succeeded";

            action.payload.forEach((category) => {
                state.byIds[category.ge_id] = {
                    ge_id: category.ge_id,
                    sectionIds: [],
                    name: category.name,
                    nameChild: category.note,
                    status: 'idle'
                }
                state.allIds.push(category.ge_id);
            })
        });

        builder.addCase(getAllGE.rejected,(state) => {
            state.status = "failed";
        }); 

        /**
         * Http Get
         * Get Ge
         */
        builder.addCase(getGE.pending,(state, action) => {
            state.byIds[action.meta.arg].status = "loading";
        });

        builder.addCase(getGE.fulfilled,(state, action) => {    
            const geId = action.meta.arg;
            state.byIds[geId].status = "succeeded";

            action.payload.departments.forEach((dept) => {
                let sectionId = nanoid(ID_LENGTH.GE_SECTION);
                state.byIds[geId].sectionIds.push({sectionId: sectionId, nameChild: dept});
                state.sections[sectionId] = action.payload.courses_in_depts[dept];
            })
            
        });

        builder.addCase(getGE.rejected,(state, action) => {
            state.byIds[action.meta.arg].status = "failed";
        }); 
    },
});

export default geSlice.reducer;