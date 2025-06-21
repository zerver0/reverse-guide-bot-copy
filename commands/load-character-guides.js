const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const template = require('./character-guides/template.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const ENV = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loadcharacterguides')
    .setDescription('(re)loads all character guides')
    .setContexts([InteractionContextType.Guild]),
  async execute(interaction) {
    const characterFiles = fs.readdirSync('./commands/character-guides').filter(file => file.endsWith('.json'));
    const characters = [];
    const commands = [];
    for(const file of characterFiles){
      const character = template.command(file.substring(0, file.length-5))
      characters.push(character);
      commands.push(character.data.toJSON());
    }
    const rest = new REST({ version: '9' }).setToken(ENV.TOKEN);
    try {
      interaction.reply('(re)loading all character guide commands')
      await rest.put(
        Routes.applicationCommands(interaction.client.user.id),
        { body: commands },
      );
      interaction.channel.send('successfully (re)loaded all character guide commands')
    } catch (error) {
      console.error(error);
    }
    interaction.channel.send('(re)loading all character guides')
    for(const character of characters){
      try {
        interaction.client.commands.set(character.data.name, character)
      } catch (error) {
        console.error(error);
      }
    }
    interaction.channel.send('successfully (re)loaded all character guides')
  },
};