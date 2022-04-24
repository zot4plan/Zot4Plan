module.exports = {
    HOST: "DATABASE_URL",
    USER: "USER_NAME",
    PASSWORD: "PASSWORD",
    DB: "DATABASE",
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