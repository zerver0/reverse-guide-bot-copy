# How to set up

1. Download this repository and extract
2. Install [Node.js](https://nodejs.org/en)
3. Run `npm install` on the root folder
4. Key in the bot token and test server ID into file called `.env`
5. Key in the bot ID into file called `config.json`
6. Key in individual character information into `commands/character-guides/template.json` and name it the chracter's name(all small letters and no space allowed). Color field is for color of the side bar of the embed in `[r, g, b]`
7. Duplicate it for other characters and their corresponding information

# How to run

1. Run `node deploy-commands.js`
2. Run `node bot.js`
3. Run `/loadcharacterguides` in the test server
4. Restart your discord

Now all the character and their corresponding information should be loaded

# How to update for new character

1. Create the corresponding json file for the character and key in the information
2. Run `/loadcharacterguides` in the test server

The new character information is now loaded(but everyone needs to (re)start their discord to see it)

# How to update for change in information

1. Change the information of the chracter
2. Run `/loadcharacterguides` in the test server

Now the corresponding character's information is updated