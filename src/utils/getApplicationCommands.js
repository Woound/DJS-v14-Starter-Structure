/**

Retrieves application commands for a specific guild or globally for the client.
@param {object} client - The client object for interacting with the Discord API.
@param {string} guildId - Optional parameter specifying the guild ID. If provided, retrieves guild-specific commands.
@returns {Promise} - A promise that resolves to the fetched application commands.
*/

module.exports = async (client, guildId) => {
  let applicationCommands;
  if (guildId) {
    // Fetch the guild object using the provided guildId.
    const guild = await client.guilds.fetch(guildId);
    // Retrieve the guild-specific commands.
    applicationCommands = guild.commands;
  } else {
    // Retrieve the global application commands.
    applicationCommands = await client.application.commands;
  }

  // Fetch the commands from the Discord API.
  await applicationCommands.fetch();

  return applicationCommands;
};
