const express = require('express');
const bodyParser = require("body-parser");
const cron = require('node-cron');

const jobs = require("./modules/jobs/controllers/jobs.js")

const app = express();

cron.schedule('* * * * *', () =>  {
    console.log('Checking for jobs every minute');
    jobs.runCronJob();
  });


app.get('/', (req, res) => { 
    res.send('Node Scheduler Task App is running on this server') 
    res.end() 
})

app.use(express.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use("/api/v1/admin", require("./modules/admin/app.js")());
app.use("/api/v1/jobs", require("./modules/jobs/app.js")());
app.use("/api/v1/users", require("./modules/users/app.js")());
 
app.use(require("./middleware/not_found"));
app.use(require("./middleware/response_handler"));


const PORT = 1993;

 const db = require("./config/db")

const sequelize = require("./sequelize/sequelize")
sequelize.connection.authenticate().then(function(){
    console.log("DB Connection Successful");


    app.listen(PORT, async function(error){
        if(error){console.log("Server is not listening...", error);}
        else{
            console.log("Server is listening on HOST", db.host, "on PORT", PORT);
        }
    });
}).catch(function(error){console.log("Unable to connect to database", error);});




