const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv');
const eventHandler = require('./handlers/eventHandler');
dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.BOT_TOKEN);
