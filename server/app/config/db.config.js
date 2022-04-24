module.exports = {
    HOST: "HOSTURL",
    USER: "USERNAME",
    PASSWORD: "PASSWORD",
    DB: "database",
    dialect: "mysql",
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    } 
};