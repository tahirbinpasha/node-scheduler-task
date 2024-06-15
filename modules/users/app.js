const express = require("express");
//--//
let routes = function(){
    const router = express();


    //--//
    router.use("/", require("../users/routes/users")());
    //--//

    return router;
};
module.exports = routes;
