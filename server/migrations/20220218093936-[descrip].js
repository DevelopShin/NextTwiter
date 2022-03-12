'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'Users', // name of Target model
        'descrip', // name of the key we're adding
        {
          type: Sequelize.STRING,
          // allowNull: true,
          // setting foreign key relationship
          // references: {
          //   model: 'Users', // name of Source model
          //   key: 'id',
          // },
          // setting when primary key is updated or deleted
          // onUpdate: 'CASCADE',
          // onDelete: 'CASCADE',
        }
      )
      // .then(() =>
      //   queryInterface.addColumn(
      //     'Users', // name of Target model
      //     'img', // name of the key we're adding
      //     {
      //       type: Sequelize.STRING,
      //       defaultValue: 'https://placeimg.com/140/140/any',
      //     }
      //   )
      // );
  },


  async down (queryInterface, Sequelize) {
    return queryInterface
    .removeColumn(
      'Users', // name of the Target model
      'descrip' // key we want to remove
    )
  }
};
