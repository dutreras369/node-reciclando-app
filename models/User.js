import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'
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
            beforeCreate: async function (user) {
                user.createdAt = new Date();
                user.updatedAt = new Date();

                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            },
            beforeUpdate: function (user) {
                user.updatedAt = new Date();
            }
        }
})

User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)    
}

 export default User;
