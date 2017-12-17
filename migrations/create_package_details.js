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
		distance:{
			type: Sequelize.STRING
		},
		time_left: {
			type: Sequelize.STRING
		},
		clat: {
			type: Sequelize.FLOAT
		},
		clong: {
			type: Sequelize.FLOAT
		},		
		dlat: {
			type: Sequelize.FLOAT
		},
		dlong: {
			type: Sequelize.FLOAT
		},
		startTime: {
			type: Sequelize.DATE
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