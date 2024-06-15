const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const constants = require("../../../constants/constants.json");
const { models } = require("../../../sequelize/sequelize");
const sequelize = require("../../../sequelize/sequelize");


const signInAdmin = async function (req, res, next) {
    try
    {  
        let {email, password} = req.body
        
        let instance = new sequelize.db(sequelize.models.admins);
        let [admin, error] = await instance.findOne({where: {email: email}})

        console.log("admin == ", admin);

        if (admin)
        {
            if (!admin.validatePassword(password))
            {
                return next({
                    status: "warning",
                    statusCode: 401,
                    message: "AUTHORIZATION_FAILED"
                }); 
            }
            else
            {

                    time = "365d";
                    const token = await jwt.sign({   
                        admin: admin
                    }, constants.jwtAuth, {
                        expiresIn: time,
                    });
                    
                    return next({
                        status: "success",
                        statusCode: 200,
                        data: {admin: admin, token: token},
                        message: "LOGGED_IN"
                    });                
                
            }
        }
        else
        {
            return next({
                status: "error",
                statusCode: 208,
                message: "INVALID_CREDENTIALS"
            });
        }
        
    }
    catch(error)
    {
        return next(error)
    } 
}

//------------ created only to add admin user in database -------------//

const addAdmin = async function (req, res, next) {
    try
    {   

        let [admin, error]  = await createAdmin(req, new models.admins({}), next)
        
        if (admin)
        {
            
            return next({
                status: "success",
                statusCode: 200,
                admin: admin_updated,
                message: "DATA_CREATED"
            });
            
            
        }
        else
        {
            return next(error);
        }
    }
    catch(error)
    {
        return next(error)
    } 
}






module.exports = {

    signInAdmin,
    addAdmin

};


const createAdmin = async (req, admin, next) => {
    
    let {name, email, password} = req.body
    
    let instance = new sequelize.db(sequelize.models.admins);
    let [adminFound, error] = await instance.findOne({where: {email: email}})
    if (adminFound)
    {
        return next({
            status: "error",
            statusCode: 422,
            message: "EMAIL_ALREADY_EXIST"
        });
    }

    let passwordHash =  crypto.createHash("sha1").update(password).digest("hex");
    
    admin.name = name;
    admin.email = email;
    admin.password = passwordHash;
    
    return  await instance.create(admin.toJSONincludingPassword())
    
}
