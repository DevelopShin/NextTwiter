const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init({
      src: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      modelName:'Image',
      tableName:'images',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    // db.Image.belongsTo(db.User)
    db.Image.belongsTo(db.Post)
  }
}



// module.exports = (sequelize, DataTypes) =>{
//   const Image = sequelize.define('Image', 
//   { //Mysql에는 users 테이블생성
//     src: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     }
//   }, 
//   {
//     charset: 'utf8',
//     collate: 'utf8_general_ci' //use imoticorn
//   })
//   Image.associate = (db)=>{
//     db.Image.belongsTo(db.User)
//     db.Image.belongsTo(db.Post)
//   }
//   return Image
// }