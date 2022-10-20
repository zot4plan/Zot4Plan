const db = require("../models");
const Playlists = db.playlists;

// const getPagination = (page, size) => {
//     const limit = size ? +size : 10;
//     const offset = page ? page * limit : 0;
  
//     return { limit, offset };
// };

// const getPagingData = (data, page, limit) => {
//     const { count: totalItems, rows: playlists } = data;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalItems / limit);
  
//     return { totalItems, playlists, totalPages, currentPage };
// };

// exports.getAllPlaylists = (req, res) => {
//     const { page, size } = req.query;
//     const { limit, offset } = getPagination(page, size);

//     Playlists.findAndCountAll({ limit, offset })
//     .then(data => {
//         const response = getPagingData(data, page, limit);
//         res.send(response);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving playlists."
//         });
//     });
// };

exports.getPlaylists = (_req, res) => {
    Playlists
    .findAll({ 
        attributes: { exclude: ['created_date', 'is_verified'] },
        where: { is_verified: true }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    });
}

exports.updateView = (_req, res) => {
    Playlists.increment('view', 
    { 
        by: 1,
        where: { playlist_id: res.body.id },
        returning: false
    })
    .then(() => {
        res.status(200).send('OK');
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    });
}

/*
    <http> HttpPost <http/>
    <action> addPlaylist <action/>
*/
const prefixes = new Set([
    'https://www.youtube.com/playlist?list=',
    'https://www.youtube.com/watch?v=',
    'https://youtu.be/'
]);

exports.addPlaylist = (req, res) => {
    const playlist = req.body;
    console.log(playlist);
    const err = validatePlaylist(playlist);
    console.log(err);
    if(err)
        return res.status(400).send({message: err})
    else {
        const playlistData = {
            playlist_id: playlist.id,
            thumbnail: playlist.id,
            name: playlist.name,
            original_url: playlist.prefix + playlist.id,
            embed_url: 
                (playlist.prefix === 'https://youtube.com/playlist?list=' 
                ? 'https://www.youtube.com/embed/videoseries?list=' 
                : 'https://www.youtube.com/embed/') + playlist.id,
            share_by: playlist.shareBy ? playlist.shareBy : null,
        };

        Playlists
        .create(playlistData)
        .then(()=> {
            res.status(200).send(playlistData);
        })
        .catch( err => {
            res.status(500).send({message: err.message || "Some error occurred while creating playlist."})
        })
    }
}

function validatePlaylist(playlist) {
    if(playlist.id.length > 64 || playlist.id.length < 10 || !prefixes.has(playlist.prefix)) {
        return "Invalid url";
    }
    else if(playlist.name.length > 128 || playlist.name.length < 1) {
        return "Invalid playlist name";
    }
    else if(playlist.shareBy.length > 128 || playlist.name.length < 1) {
        return "Invalid sharer's name";
    }
    else {
        return '';
    }
}