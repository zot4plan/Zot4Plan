import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPlaylist, getPlaylists, updateVirtualCafeVisit } from "../../api/VirtualCafeController";
import { backgrounds, playlists } from "../../pages/virtualCafe/data/data";

const initialState:VirtualCafeSliceType = {
    background: backgrounds[3],
    playlist: playlists[0],
    allPlaylists: [],
    sharePlaylists: [],
    pageLoading: 'idle',
    getPlaylistsStatus: 'idle',
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
        },
    },
    extraReducers: (builder) => { 
        /**
         * HTTP PUT
         * updateVirtualCafeVisit
         */
         builder.addCase(updateVirtualCafeVisit.fulfilled, (state, _) => { 
            state.pageLoading = 'succeeded';
        })

        builder.addCase(updateVirtualCafeVisit.rejected, (state, _) => { 
            state.pageLoading = 'failed';
        })

        /**
         * HTTP POST
         * Add Playlist
         */
        builder.addCase(addPlaylist.fulfilled, (state, action) => { 
            state.sharePlaylists.push(action.payload);
        })

         /**
         * HTTP GET
         * Get Playlists
         */
        builder.addCase(getPlaylists.fulfilled, (state, action) => { 
            state.getPlaylistsStatus = 'succeeded';
            state.allPlaylists = action.payload;
        })

        builder.addCase(getPlaylists.rejected, (state, _) => { 
            state.getPlaylistsStatus = 'failed';
        })
    },
});

export const {
    changeBackground,
    changePlaylist
} = VirtualCafeSlice.actions;

export default VirtualCafeSlice.reducer;