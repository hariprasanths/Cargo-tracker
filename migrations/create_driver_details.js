module.exports = {
	up: (queryInterface, Sequelize) =>
	queryInterface.createTable('driver_details', {
		product_id: {
			references: {model: 'package_details', key: 'product_id'},	
			type: Sequelize.INTEGER
		},
		driver_token: {
			type: Sequelize.STRING
		},
		driver_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: Sequelize.INTEGER
		},
		password: {
			type: Sequelize.STRING
		},
		driver_name: {
			type: Sequelize.STRING
		},
		createdAt: {
			type: Sequelize.DATE
		},
		updatedAt: { 
			type: Sequelize.DATE
		}
	}),

	down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('driver_details'),
};