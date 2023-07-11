const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a user from the server.',
  // devOnly: Boolean,
  // testOnly: Boolean,
  options: [
    {
      name: 'target-user',
      description: 'The user to ban.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for ban.',
      type: ApplicationCommandOptionType.String,
    },
  ],

  callback: (client, interaction) => {
    interaction.reply(`ban...`);
  },
};
