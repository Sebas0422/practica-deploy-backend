import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'Music',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mp3FilePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'albums',
          key: 'id',
        },
      },
    },
    {
      tableName: 'musics',
      timestamps: false,
    },
  );
};
