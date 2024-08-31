const DummyData = require("../models/train.model");

let locationData = [...DummyData];

const getLocationData = () => locationData;
const setLocationData = (newData) => {
  locationData = newData;
};

module.exports = { getLocationData, setLocationData };
