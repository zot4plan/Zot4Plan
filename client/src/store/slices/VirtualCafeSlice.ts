import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPlaylist, getPlaylists, updateVirtualCafeVisit } from "../../controllers/VirtualCafeController";
import { backgrounds } from "../../pages/virtualCafe/data/data";

const initialPlaylist = () => {
    const playlist = localStorage.getItem('currentPlaylist');
    return playlist 
        ? JSON.parse(playlist) as PlaylistType
        : {
            playlist_id: "PLSbcvcMOgs9EvNjev3R4LhcmubNH4Redk",
            thumbnail: "FN7ALfpGxiI",
            name: "Simple Love (Vietnamese)",
            author: null,
            shared_by: 'LK',
            original_url: 'https://youtube.com/playlist?list=PLSbcvcMOgs9EvNjev3R4LhcmubNH4Redk',
            embed_url: "https://www.youtube.com/embed/videoseries?list=PLSbcvcMOgs9EvNjev3R4LhcmubNH4Redk",
            language: "Vietnamese",
            genre: [],
            like: 0,
            view: 0
          }
}
const initialState:VirtualCafeSliceType = {
    background: backgrounds[0],
    playlist: initialPlaylist(),
    allPlaylists: [],
    sharePlaylists: [],
    pageLoading: 'idle',
    getPlaylistsStatus: 'idle',
    time: { workTime: 45, breakTime: 15 }
}

export const VirtualCafeSlice = createSlice ({
    name: "store",
    initialState,
    reducers: {
        changeBackground: (state, action: PayloadAction<BackgroundType>) => {
            state.background = action.payload;
        },

        changePlaylist: (state, action: PayloadAction<PlaylistType>) => {
            localStorage.setItem('currentPlaylist', JSON.stringify(action.payload));
            state.playlist = action.payload;
        },

        editTime: (state, action: PayloadAction<VCTimeType>) => {
            state.time = action.payload;
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
    changePlaylist,
    editTime
} = VirtualCafeSlice.actions;

export default VirtualCafeSlice.reducer;