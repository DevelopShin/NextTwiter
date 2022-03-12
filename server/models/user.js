const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수,
        unique: true

      },
      mailId: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수,
        unique: false
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false //필수
      },
      
      descrip:{
        type: DataTypes.STRING,
        allowNull: true //필수아님
      }
    }, {
      modelName:'User',
      tableName:'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
    // db.User.belongsToMany(db.Hashtag)
    db.User.hasMany(db.Image)
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, {
      through: "Follow", as: "Followers", foreignKey: 'FollowingId'
    })
    db.User.belongsToMany(db.User, {
      through: "Follow", as: "Followings", foreignKey: 'FollowerId'
    })
  }
}



// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User',
//     { //Mysql에는 users 테이블생성
//       email: {
//         type: DataTypes.STRING(30),
//         allowNull: false, //필수,
//         unique: true

//       },
//       mailId: {
//         type: DataTypes.STRING(30),
//         allowNull: false, //필수,
//         unique: false
//       },
//       nickname: {
//         type: DataTypes.STRING(30),
//         allowNull: false //필수
//       },
//       password: {
//         type: DataTypes.STRING(100),
//         allowNull: false //필수
//       },
      
//       descrip:{
//         type: DataTypes.STRING,
//         allowNull: true //필수아님
//       }

//     },
//     {
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//       // timestamps: true,
//       // paranoid: true, // 삭제일 (복구용)
//     })
//   User.associate = (db) => {
//     db.User.hasMany(db.Post)
//     db.User.hasMany(db.Comment)
//     // db.User.belongsToMany(db.Hashtag)
//     db.User.hasMany(db.Image)
//     db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })

//     db.User.belongsToMany(db.User, {
//       through: "Follow", as: "Followers", foreignKey: 'FollowingId'
//     })
//     db.User.belongsToMany(db.User, {
//       through: "Follow", as: "Followings", foreignKey: 'FollowerId'
//     })

//   }
//   return User
// }