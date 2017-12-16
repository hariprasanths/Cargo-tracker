module.exports = {
	up: (queryInterface, Sequelize) =>
	queryInterface.createTable('package_details', {
		product_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: Sequelize.INTEGER
		},
		user_id: {
			references: {model: 'user_details', key: 'user_id'},	
			type: Sequelize.INTEGER
		},
		destination: {
			type: Sequelize.STRING
		},
		latitude: {
			type: Sequelize.FLOAT
		},
		longitude: {
			type: Sequelize.FLOAT
		},
		product: {
			type: Sequelize.STRING
		},
		createdAt: {
			type: Sequelize.DATE
		},
		updatedAt: {
			type: Sequelize.DATE
		}
	}),

	down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('package_details'),
};