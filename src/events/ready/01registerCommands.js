/**

Updates application commands on the test server based on local commands.
@param {object} client - The client object for interacting with the Discord API.
*/

const { testServer } = require('../../../config.json'); // Configuration file.
const areCommandsDifferent = require('../../utils/areCommandsDifferent'); // Custom utility function to check if commands are different.
const getApplicationCommands = require('../../utils/getApplicationCommands'); // Custom utility function to retrieve application commands.
const getLocalCommands = require('../../utils/getLocalCommands'); // Custom utility function to retrieve local commands.

module.exports = async client => {
  try {
    // Retrieve local commands.
    const localCommands = getLocalCommands();
    // Retrieve application commands for the test server.
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      // Find the existing command in the application commands cache.
      const existingCommand = applicationCommands.cache.find(
        command => command.name === name
      );

      if (existingCommand) {
        // Check if the local command is marked as deleted.
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command ${name}.`);
          continue;
        }

        // Check if the existing command is different from the local command.
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name,
            description,
            options,
          });
          console.log(`Edited command ${name}`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `Skipping registering command ${name} as it's set to delete`
          );
          continue;
        }

        // Create a new application command with the local command details.
        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
