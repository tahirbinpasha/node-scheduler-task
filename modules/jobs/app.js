const express = require("express");
//--//
let routes = function(){
    const router = express();


    //--//
    router.use("/", require("../jobs/routes/jobs")());
    //--//

    return router;
};
module.exports = routes;
