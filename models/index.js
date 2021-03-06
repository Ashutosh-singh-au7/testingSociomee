const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const { dialect } = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER , dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect : dbConfig.dialect,
    operatorsAliases : false,

    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});

sequelize.authenticate().then(()=>{
    console.log("connection has been established");
}).catch((err)=>{
    console.error("unable to connect database", err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize,Sequelize);
db.role = require("../models/role")(sequelize,Sequelize);

db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignKey : "roleId",
    otherKey:"userId"
});

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});

db.ROLES = ["user", "admin" , "moderator"]

module.exports = db;

