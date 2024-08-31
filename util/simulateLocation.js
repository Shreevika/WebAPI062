const getRandomOffset = () => (Math.random() - 0.5) * 0.01;

const getLocationName = (latitude, longitude) => {
  const locations = [
    { name: "Kandy", latitude: 7.2906, longitude: 80.6337 },
    { name: "Jaffna", latitude: 9.6615, longitude: 80.0255 },
    { name: "Colombo", latitude: 6.9271, longitude: 79.8612 },
    { name: "Anuradhapura", latitude: 8.3114, longitude: 80.4037 },
    { name: "Kurunegala", latitude: 7.8731, longitude: 80.7718 },
    { name: "Matara", latitude: 6.0535, longitude: 80.221 },
    { name: "Batticaloa", latitude: 7.3021, longitude: 81.6745 },
    { name: "Polonnaruwa", latitude: 8.3445, longitude: 81.0545 },
    { name: "Kankesanthurai", latitude: 9.8167, longitude: 80.0325 },
    { name: "Mannar", latitude: 8.9783, longitude: 79.9044 },
    { name: "Trincomalee", latitude: 8.5874, longitude: 81.2152 },
    { name: "Vavuniya", latitude: 8.7514, longitude: 80.4976 },
    { name: "Badulla", latitude: 6.9896, longitude: 81.055 },
    { name: "Galle", latitude: 6.0535, longitude: 80.221 },
    { name: "Panadura", latitude: 6.7136, longitude: 79.9071 },
  ];

  let closestLocation = locations[0];
  let minDistance = Number.MAX_VALUE;

  locations.forEach((location) => {
    const distance = Math.sqrt(
      Math.pow(location.latitude - latitude, 2) +
        Math.pow(location.longitude - longitude, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  });

  return closestLocation.name;
};

const simulateLocationUpdates = (data) => {
  return data.map((train) => {
    const newLatitude = train.latitude + getRandomOffset();
    const newLongitude = train.longitude + getRandomOffset();
    return {
      ...train,
      latitude: newLatitude,
      longitude: newLongitude,
      locationName: getLocationName(newLatitude, newLongitude),
      timestamp: new Date(),
    };
  });
};

module.exports = simulateLocationUpdates;
