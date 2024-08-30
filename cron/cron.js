const cron = require("node-cron");
const { exec } = require("child_process");
const path = require("path");

const scriptPath = path.join(__dirname, "deleteOldFile.js");

// Schedule the job to run daily at midnight
cron.schedule("0 0 * * *", () => {
  exec(`node ${scriptPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${err.message}`);
      return;
    }

    if (stderr) {
      console.error(`Script error: ${stderr}`);
      return;
    }

    console.log(`Script output: ${stdout}`);
  });
});

console.log("Cron job scheduled to run daily at midnight.");
