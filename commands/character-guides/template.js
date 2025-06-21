const { SlashCommandBuilder, InteractionContextType, EmbedBuilder } = require('discord.js');

module.exports = {
  command(characterName){
    delete require.cache[require.resolve(`./${characterName}.json`)]
    let data = require(`./${characterName}.json`)
    return {
      data: new SlashCommandBuilder()
        .setName(characterName)
        .setDescription(`Brief Info about ${data.name}`)
        .setContexts([InteractionContextType.Guild]),
      async execute(interaction) {
        interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(data.color)
          .setTitle(`\`${data.tags}\``)
          .setDescription(data.text)
          .setThumbnail(data.portrait)
          .setAuthor({ name:`${data.name}\n${data.rarity}`, iconURL: data.element })
          .setImage(data.image)
          .setFooter({ text:data.footer })
        ]})
      },
    }
  }
}