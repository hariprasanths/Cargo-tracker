module.exports = {
	up: (queryInterface, Sequelize) =>
	queryInterface.createTable('package_details', {
		product_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: Sequelize.INTEGER
		},
		buyer_name: {
			type: Sequelize.STRING
		},
		destination: {
			type: Sequelize.STRING
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