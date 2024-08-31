const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "simulateLocation.js");
const ninetyDaysInMilliseconds = 90 * 24 * 60 * 60 * 1000;

const deleteOldFile = () => {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`Error getting file stats: ${err.message}`);
      return;
    }

    const now = Date.now();
    const fileAge = now - new Date(stats.mtime).getTime();

    if (fileAge > ninetyDaysInMilliseconds) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
        } else {
          console.log(`File ${filePath} deleted successfully.`);
        }
      });
    } else {
      console.log(`File ${filePath} is not old enough to be deleted.`);
    }
  });
};

deleteOldFile();
