const { getLocationData } = require("../util/getLocation");

exports.getTrainLocation = async (req, res) => {
  try {
    const locationData = getLocationData();

    return res.status(200).send({
      status: true,
      data: locationData,
      message: "Trains location fetched successfully.",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.getTrainLocationById = async (req, res) => {
  try {
    const { trainId } = req.query;
    if (!trainId) {
      return res.status(400).send({
        status: false,
        message: "TrainId is required.",
      });
    }

    const locationData = getLocationData().filter(
      (train) => train.trainId === trainId
    );

    return res.status(200).send({
      status: true,
      data: locationData,
      message: "Train fetched successfully.",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.getTrainsList = async (req, res) => {
  try {
    const locationData = getLocationData().map((train) => ({
      trainId: train.trainId,
      trainName: train.trainName,
    }));

    return res.status(200).send({
      status: true,
      data: locationData,
      message: "Trains list fetched successfully.",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
