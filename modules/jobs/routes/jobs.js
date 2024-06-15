const express = require("express");
const job = require("../controllers/jobs");
const validator = require("../validation/jobs");
const filter = require('../../../middleware/filtering_requests');
const auth_admin = require("../../../middleware/auth_admin")


let routes = function(){
    let routes = express.Router({mergeParams: true});

    routes.route("/create").post(auth_admin, validator.validate("create-job"), filter, job.addCronJob)    
    
    routes.route("/sent_emails").get(auth_admin, job.getSentEmails)    



    return routes;
};

module.exports = routes;
