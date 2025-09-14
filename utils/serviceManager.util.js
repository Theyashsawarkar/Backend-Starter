import { idleTransactionsWatcher } from "../config/connection.js";
import { updatePropertyListing } from "./cron/propertyListing.js";
import { syncModels } from "./dbSync.js";
import { startBulkMailService } from "./sendBulkMail.js";

// Map of service keys to their corresponding functions
const serviceMap = {
  bulkMailService: startBulkMailService,
  updatePropertyListingService: updatePropertyListing,
  syncModelsService: syncModels,
  idleTransactionWatcherService: idleTransactionsWatcher,
};

// Start services asynchronously with optional parameters
export const startServices = async ({ options = {}, delay = 0 }) => {
  // Optional delay before starting services
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));

  // Iterate over all defined services
  for (const [key, serviceFn] of Object.entries(serviceMap)) {
    const param = options[key]; // get value from options

    // Only start service if enabled (param not false/undefined)
    if (param !== undefined && typeof serviceFn === "function") {
      console.log(`🚀 Starting ${key}...`);

      try {
        // If param === true, call without args, else pass param directly
        await serviceFn(param === true ? undefined : param);
      } catch (err) {
        console.error(`❌ Error starting ${key}:`, err); // log errors
      }
    }
  }
};
