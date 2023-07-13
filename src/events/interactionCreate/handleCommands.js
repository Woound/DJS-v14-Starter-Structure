/**

Handles a chat input command interaction.
@param {object} client - The client object for interacting with the Discord API.
@param {object} interaction - The interaction object representing the chat input command interaction.
*/
const { devs, testServer } = require('../../../config.json'); // Configuration file containing developer IDs and test server ID.
const getLocalCommands = require('../../utils/getLocalCommands'); // Custom utility function to retrieve local commands.

module.exports = async (client, interaction) => {
  // Return early if the interaction is not a chat input command.
  if (!interaction.isChatInputCommand()) return;

  // Get the local commands.
  const localCommands = getLocalCommands();

  try {
    // Find the command object matching the interaction's command name.
    const commandObject = localCommands.find(
      cmd => cmd.name === interaction.commandName
    );
    // Return if the command object is not found.
    if (!commandObject) return;

    // Check if the command is devOnly and the interaction member is not a developer.
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    // Check if the command is testOnly and the interaction is not in the test server.
    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: 'This command cannot be run here.',
          ephemeral: true,
        });
        return;
      }
    }

    // Check if the command requires specific permissions for the interaction member.
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Check if the command requires specific permissions for the bot.
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Execute the command's callback function.
    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
