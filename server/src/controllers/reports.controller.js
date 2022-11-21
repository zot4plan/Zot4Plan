const db = require("../models");
const Reports = db.reports;

exports.addReport = (req, res) => {
    const playlistId = req.body.playlistId;
    const reason = req.body.reason;

    if(playlistId && reason) {
        Reports
        .create({
            playlist_id: playlistId,
            reason: reason
        }, {
            return: false
        })
        .then(()=> {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send({message: err.message || "Some error occurred while creating playlist."})
        })
    }
    else {
        res.status(400).send({message: "Something is wrong"})
    }
}

