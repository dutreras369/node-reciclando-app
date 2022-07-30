import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Point = db.define('points', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    title: {
       type: DataTypes.STRING(100),
       allowNull: false
    }, 
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    region: {
        type: DataTypes.STRING(100),
        allowNull: false
     }, 
    province: {
        type: DataTypes.STRING(100),
        allowNull: false
    }, 
    commune: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    
})

export default Point;