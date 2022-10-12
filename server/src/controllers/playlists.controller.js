const db = require("../models");
const Playlists = db.playlists;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: playlists } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, playlists, totalPages, currentPage };
};

exports.getAllPlayLists = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Playlists.findAndCountAll({ limit, offset })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playlists."
        });
    });
};

exports.addPlayList = (req, res) => {
    const playlist = req.body.playlist;
    if(validatePlaylistUrl(playlist.url)) {
        
    }
    Playlists.create({
        playlist_id: playlist.playlist_id,
        name: playlist.name,
        url: playlist.url
    })
}

function validatePlaylistUrl(url) {
    if(typeOf(url) === "string") {
        if(url.length > 1024) {
            return "Url is too long";
        }
        else if(!url.startWith("https://www.youtube.com/embed/")) {
            return "Invalid Url";
        }
        else {
            return "";
        }
    }
    else
        return "Invalid Playlist";
}

function validatePlaylistName(name) {
    if(typeOf(name) === "string") {
        if(name.length > 64) 
            return "Name is too long";
        else
            return "";
    }
    else
        return "Invalid Name";
}