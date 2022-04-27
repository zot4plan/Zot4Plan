module.exports = {
    HOST: "localhost",
    USER: "mytestuser",
    PASSWORD: "My6$Password",
    DB: "zot4plandb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    } 
};