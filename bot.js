// Require the necessary discord.js classes
const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const ENV = process.env;

// Create a new client instance
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
	  Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.DirectMessages,
  ],
  allowedMentions: {
    parse: [],
  }
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/*
function stringifyDate(date){
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds()
}
*/

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Discord.Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//Code to be run when there's an interaction

client.on('interactionCreate', interaction => {
  if(interaction.isCommand()){
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: `Error while evaluating expression: ${error.toString()}`, ephemeral: true });
    }
  }
})

client.on("messageCreate", message =>{
  if(message.author.bot){
    return;
  };
})

// Log in to Discord with your client's token
client.login(ENV.TOKEN);