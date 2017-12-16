module.exports = (sequelize, DataTypes) => {
  const driver_detail = sequelize.define('driver_detail', {
		product_id: {	
			type: DataTypes.INTEGER
		},
		driver_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: DataTypes.INTEGER
		},
		password: {
			type: DataTypes.STRING
		},
		driver_name: {
			type: DataTypes.STRING
		}
	});

	driver_detail.associate = (models) => {
			// associations can be defined here
	};

  	return driver_detail;

};