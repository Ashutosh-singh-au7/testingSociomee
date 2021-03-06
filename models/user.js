module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("user",{
        username:{
            type:Sequelize.TEXT
        },
        email:{
            type:Sequelize.STRING,
            validate:{
                isEmail: true
            }
        },
        password:{
            type:Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
};