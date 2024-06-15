const express = require("express");
const admin = require("../controllers/users");
const validator = require("../validation/users");
const filter = require('../../../middleware/filtering_requests');
const auth_admin = require("../../../middleware/auth_admin")


let routes = function(){
    let routes = express.Router({mergeParams: true});

    routes.route("/auth/signIn").post(validator.validate("signIn"), filter, admin.signInUser);
    routes.route("/add/user").post(validator.validate("add-user"), filter, admin.addUser); 
    
    return routes;
};

module.exports = routes;
