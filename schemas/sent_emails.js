module.exports = function (sequelize, DataTypes) {
    let Model = sequelize.define("sent_emails", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        user_email: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        job_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        subject: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: "sent_emails"
    });
    Model.prototype.toJSON = function () {
        let attributes = Object.assign({}, this.get());
        return attributes;
    };
    return Model;
};
