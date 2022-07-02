import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const User = db.define('users', {
    name: {
       type: DataTypes.STRING,
       allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    token: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

    },
    {
        hooks: {
            beforeCreate: function (user) {
                user.createdAt = new Date();
                user.updatedAt = new Date();
            },
            beforeUpdate: function (user) {
                user.updatedAt = new Date();
            }
        }
})

 export default User;
