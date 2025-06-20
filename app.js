import fs from 'fs'
import cron from 'node-cron'

// Function to log time to file
function logTime() {
    const log = `Time logged: ${new Date().toLocaleString()}\n`;
    fs.appendFileSync('log.txt', log);
    console.log("Logged to file.");
}

// Schedule cron job to run every 1 minute
cron.schedule('* * * * *', () => {
    logTime();
});
