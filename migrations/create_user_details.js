module.exports = {
	up: (queryInterface, Sequelize) =>
	queryInterface.createTable('user_details', {
		user_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: Sequelize.INTEGER
		},
		user_token: {
			type: Sequelize.STRING
		},
		user_name: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		createdAt: {
			type: Sequelize.DATE
		},
		updatedAt: {
			type: Sequelize.DATE
		}
	}),

	down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('user_details'),
};