const crypto = require("crypto");
module.exports = function(sequelize, DataTypes){
    let isUnique = function(field){
        return function(value, next){
            let Model = sequelize.models.admins;
            let query = {};
            query[field] = value;
            Model.findOne({
                where: query,
                attributes: ["email"]
            }).then(function(obj){
                if(obj && obj.id){ next(field + ": '" + value + "' is already taken"); }
                else{ next(); }
            });
        };
    };
    let Model = sequelize.define("admins", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
             allowNull: true,
             defaultValue: null,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                isEmail: true,
                isUnique: isUnique("email")
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: true
            }
        },       
        
    }, {
        tableName: "admins",

    });

    Model.prototype.toJSON = function(options){
        let attributes = Object.assign({}, this.get());
        delete attributes.password;
        return attributes;
    };

    Model.prototype.toJSONincludingPassword = function(options){
        let attributes = Object.assign({}, this.get());
        return attributes;
    };

    Model.prototype.validatePassword = function(password){
        password = String(password).trim();
        let passwordHash = crypto.createHash("sha1").update(password).digest("hex");
        let hashedPassword = String(this.password).trim();
        return (passwordHash === hashedPassword);
    };
    return Model;

    return Model;
};
