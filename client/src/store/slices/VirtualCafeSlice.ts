import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateVirtualCafeVisit } from "../../api/VirtualCafeController";
import { backgrounds, playlists } from "../../pages/virtualCafe/data/data";

const initialState:VirtualCafeSliceType = {
    background: backgrounds[3],
    playlist: playlists[0],
    sharePlaylists: [],
    pageLoading: 'idle'
}

export const VirtualCafeSlice = createSlice ({
    name: "store",
    initialState,
    reducers: {
        changeBackground: (state, action: PayloadAction<BackgroundType>) => {
            state.background = action.payload;
        },

        changePlaylist: (state, action: PayloadAction<PlaylistType>) => {
            state.playlist = action.payload;
        }
    },
    extraReducers: (builder) => { 
        /**
         * HTPP PUT
         * updateHomeVisit
         */
        builder.addCase(updateVirtualCafeVisit.fulfilled, (state, _) => { 
            state.pageLoading = 'succeeded';
        })

        builder.addCase(updateVirtualCafeVisit.rejected, (state, _) => { 
            state.pageLoading = 'failed';
        })

    },
});

export const {
    changeBackground,
    changePlaylist
} = VirtualCafeSlice.actions;

export default VirtualCafeSlice.reducer;