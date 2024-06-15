module.exports = function (sequelize, DataTypes) {
    let Model = sequelize.define("jobs", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        user_ids: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        day_of_week: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        job_done: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0
        },
    }, {
        tableName: "jobs"
    });
    Model.prototype.toJSON = function () {
        let attributes = Object.assign({}, this.get());
        return attributes;
    };
    return Model;
};
