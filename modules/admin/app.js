const express = require("express");
//--//
let routes = function(){
    const router = express();


    //--//
    router.use("/", require("../admin/routes/admin")());
    //--//

    return router;
};
module.exports = routes;
