module.exports = (sequelize, DataTypes) => {
  const package_detail = sequelize.define('package_detail', {
		product_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: DataTypes.INTEGER
		},
		buyer_name: {
			type: DataTypes.STRING
		},
		destination: {
			type: DataTypes.STRING
		},
		product: {
			type: DataTypes.STRING
		}
	});

	package_detail.associate = (models) => {
			// associations can be defined here
	};

  	return package_detail;

};