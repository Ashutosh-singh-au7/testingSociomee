module.exports = {
    HOST:"localhost",
    USER :"root",
    PASSWORD:"ashutosh8920391596",
    DB:"sequelize_jwt",
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:10000
    }
};