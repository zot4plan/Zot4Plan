const db = require("../models");
const { sequelize } = require("../models");
const Visits = db.visits;

exports.updateHomeVisit = (_, res) => {
    sequelize.query('INSERT INTO "visits" ("date_visit") VALUES ($1::DATE) ON CONFLICT ("date_visit") DO UPDATE SET "home"="visits"."home" + 1;', {
        model: Visits,
        bind: [new Date()],
        raw: false,
        returning: false,
    }).then(()=> {
        res.status(200).send('OK');  
    })
    .catch(() => {
        res.status(500).send("Something is wrong");
    });
}

exports.updateVirtualCafeVisit = (_, res) => {
    sequelize.query('INSERT INTO "visits" ("date_visit") VALUES ($1::DATE) ON CONFLICT ("date_visit") DO UPDATE SET "virtual_cafe"="visits"."virtual_cafe" + 1;', {
        model: Visits,
        bind: [new Date()],
        raw: false,
        returning: false,
    }).then(()=> {
        res.status(200).send('OK');  
    })
    .catch(() => {
        res.status(500).send("Something is wrong");
    });
}