module.exports = (sequelize, DataTypes) => sequelize.define('bet', {
  playerID: {
    type: DataTypes.STRING,
  },
  yearID: {
    type: DataTypes.INTEGER,
  },
  stint: {
    type: DataTypes.INTEGER,
  },
  teamID: {
    type: DataTypes.STRING,
  },
  lgID: {
    type: DataTypes.STRING,
  },
  G: {
    type: DataTypes.INTEGER,
  },
  AB: {
    type: DataTypes.INTEGER,
  },
  R: {
    type: DataTypes.INTEGER,
  },
  H: {
    type: DataTypes.INTEGER,
  },
  '2B': {
    type: DataTypes.INTEGER,
  },
  '3B': {
    type: DataTypes.INTEGER,
  },
  HR: {
    type: DataTypes.INTEGER,
  },
  RBI: {
    type: DataTypes.INTEGER,
  },
  SB: {
    type: DataTypes.INTEGER,
  },
  CS: {
    type: DataTypes.INTEGER,
  },
  BB: {
    type: DataTypes.INTEGER,
  },
  SO: {
    type: DataTypes.INTEGER,
  },
  IBB: {
    type: DataTypes.INTEGER,
  },
  HBP: {
    type: DataTypes.INTEGER,
  },
  SH: {
    type: DataTypes.INTEGER,
  },
  SF: {
    type: DataTypes.INTEGER,
  },
  GIDP: {
    type: DataTypes.INTEGER,
  },
});
