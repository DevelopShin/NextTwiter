'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'Users', // name of Target model
        'testCol', // name of the key we're adding
        {
          type: Sequelize.STRING(50),
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
      'testCol' // key we want to remove
    )
  }
};
