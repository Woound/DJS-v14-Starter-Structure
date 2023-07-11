/**

Registers event handlers for all files in the specified directory and its subdirectories.
@param {object} client - The client object for handling events.
*/

const path = require('path'); // Path module for working with directories and file paths.
const getAllFiles = require('../utils/getAllFiles'); // Custom utility function to retrieve all files in a directory.

module.exports = client => {
  // Get all the folders in the 'events' directory.
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    // Extract the event name from the folder path.
    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    // Register an event listener for the current event name.
    client.on(eventName, async arg => {
      // Execute each event file's function with the client and argument.
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
};
