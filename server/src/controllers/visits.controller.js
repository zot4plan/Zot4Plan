const db = require("../models");
const { sequelize } = require("../models");
const Visits = db.visits;

exports.countVisits = () => {
    sequelize.query('INSERT INTO "visits" ("date_visit") VALUES ($1::DATE) ON CONFLICT ("date_visit") DO UPDATE SET "number_of_visits"="visits"."number_of_visits" + 1;', {
        model: Visits,
        bind: [new Date()],
        raw: false,
        returning: false,
    })
}