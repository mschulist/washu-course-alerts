// TODO: Add a cron job to run this every 5 minutes
// Get data from firestore
// For each course, check if there are open seats
// If there are open seats, send a text to the user

import { getSectionSeats } from "./parse";

(async () => {
    console.log(await getSectionSeats("FL2023", "L", "L24", "132", "F"));
})();
