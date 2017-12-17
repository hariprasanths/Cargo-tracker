module.exports = (sequelize, DataTypes) => {
  const package_detail = sequelize.define('package_detail', {
		product_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: DataTypes.INTEGER
		},
		user_id: {
			references: {model: 'user_details', key: 'user_id'},	
			type: DataTypes.INTEGER
		},
		destination: {
			type: DataTypes.STRING
		},
		clat: {
			type: DataTypes.FLOAT
		},
		clong: {
			type: DataTypes.FLOAT
		},		
		dlat: {
			type: DataTypes.FLOAT
		},
		dlong: {
			type: DataTypes.FLOAT
		},
		startTime: {
			type: DataTypes.DATE
		},
		product: {
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	});

	package_detail.associate = (models) => {
			// associations can be defined here
	};

  	return package_detail;

};