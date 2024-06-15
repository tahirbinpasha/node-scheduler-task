const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const constants = require("../../../constants/constants.json");
const { models } = require("../../../sequelize/sequelize");
const sequelize = require("../../../sequelize/sequelize");


const signInUser = async function (req, res, next) {
    try
    {  
        let {email, password} = req.body
        
        let instance = new sequelize.db(sequelize.models.users);
        let [user, error] = await instance.findOne({where: {email: email}})

        if (user)
        {
            if (!user.validatePassword(password))
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
                        user: user
                    }, constants.jwtAuth, {
                        expiresIn: time,
                    });
                    
                    return next({
                        status: "success",
                        statusCode: 200,
                        data: {user: user, token: token},
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



const addUser = async function (req, res, next) {
    try
    {   

        let [user_updated, error]  = await createUser(req, new models.users({}), next)
        
        if (user_updated)
        {
            
            return next({
                status: "success",
                statusCode: 200,
                user: user_updated,
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

    signInUser,
    addUser

};


const createUser = async (req, user, next) => {
    
    let {name, email, password} = req.body
    
    let instance = new sequelize.db(sequelize.models.users);
    let [userFound, error] = await instance.findOne({where: {email: email}})
    if (userFound)
    {
        return next({
            status: "error",
            statusCode: 422,
            message: "EMAIL_ALREADY_EXIST"
        });
    }

    let passwordHash =  crypto.createHash("sha1").update(password).digest("hex");
    
    user.name = name;
    user.email = email;
    user.password = passwordHash;
    
    return  await instance.create(user.toJSONincludingPassword())
    
}
