const db = require("../models");
const { sequelize } = require("../models");
const Visits = db.visits;

exports.updateHomeVisits = () => {
    sequelize.query('INSERT INTO "visits" ("date_visit") VALUES ($1::DATE) ON CONFLICT ("date_visit") DO UPDATE SET "home"="visits"."home" + 1;', {
        model: Visits,
        bind: [new Date()],
        raw: false,
        returning: false,
    })
}

exports.updateVirtualCafeVisits = () => {
    sequelize.query('INSERT INTO "visits" ("date_visit") VALUES ($1::DATE) ON CONFLICT ("date_visit") DO UPDATE SET "virtual_cafe"="visits"."virtual_cafe" + 1;', {
        model: Visits,
        bind: [new Date()],
        raw: false,
        returning: false,
    })
}