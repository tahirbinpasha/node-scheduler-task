const express = require("express");
const admin = require("../controllers/admin");
const validator = require("../validation/admin");
const filter = require('../../../middleware/filtering_requests');
const auth_admin = require("../../../middleware/auth_admin")


let routes = function(){
    let routes = express.Router({mergeParams: true});

    routes.route("/auth/signIn").post(validator.validate("signIn"), filter, admin.signInAdmin);
    //routes.route("/add/admin").post(validator.validate("add-admin"), filter, admin.addAdmin); //only created to add an admin through api 
22
    return routes;
};

module.exports = routes;
