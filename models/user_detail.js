module.exports = (sequelize, DataTypes) => {
  const user_detail = sequelize.define('user_detail', {
  		user_id: {
			primaryKey: true,
			autoIncrement: true,	
			type: DataTypes.INTEGER
		},
		user_name: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	});

	user_detail.associate = (models) => {
			// associations can be defined here
	};

  	return user_detail;

};