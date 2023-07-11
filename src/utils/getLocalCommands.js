/**

Retrieves local command objects from the specified directory and its subdirectories, excluding any exceptions.
@param {Array} exceptions - Optional parameter containing names of commands to exclude from the result.
@returns {Array} - An array of local command objects.
*/

const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
  let localCommands = [];

  // Get all the categories (subdirectories) in the 'commands' directory.
  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);
    // Iterate over each command file.
    for (const commandFile of commandFiles) {
      // Require the command file and retrieve the command object.
      const commandObject = require(commandFile);

      // Exclude the command if it is in the exceptions array.
      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
