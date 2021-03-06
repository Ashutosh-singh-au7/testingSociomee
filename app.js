const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const db = require("./models");
const Role = db.role;
const exphbs = require("express-handlebars");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret:"my authenticate", resave:true,saveUninitialized:true}));

//routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);


//for handlebars
app.set("views","./views");
app.engine("hbs",exphbs({
    extname: ".hbs",
    defaultLayout:false,
    layoutsDir: "views/"
}));



app.set("view engine", ".hbs");

//Sync Database
db.sequelize.sync({force:true}).then(()=>{
    console.log("drop and resync db");
    intial();
}).catch((err)=>{
    console.log(err, "Something went wrong with database");
});

function intial(){
    Role.create({
        id:1,
        name:"user"
    });

    Role.create({
        id:2,
        name:"moderator"
    });

    Role.create({
        id:3,
        name:"admin"
    })
};


app.get("/",(req,res)=>{
    console.log("welcome to authentication page");
    res.send("hello welcomee to authentication page")
});

module.exports = app;