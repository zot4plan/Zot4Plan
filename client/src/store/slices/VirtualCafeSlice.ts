import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { backgrounds, playlists } from "../../pages/virtualCafe/data/data";

const initialState:VirtualCafeSliceType = {
    background: backgrounds[3],
    playlist: playlists[0].playlist[0],
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
});

export const {
    changeBackground,
    changePlaylist
} = VirtualCafeSlice.actions;

export default VirtualCafeSlice.reducer;